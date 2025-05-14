const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    firstName: {
        type: String,
        required: [true, "Please add first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please add last name"],
    },
    role: {
        type: String,
        enum: ['customer', 'staff', 'admin'],
        default: 'customer'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: Date,
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date,
    location: {
        type: String,
        required: false,
    },
    ssn: {
        type: String,
        required: false,
        select: false,
    },
    dob: {
        type: Date,
        required: false,
    },
    visaCardNumber: {
        type: String,
        required: false,
        select: false,
    },
    visaExpiry: {
        type: String,
        required: false,
    },
    visaCW: {
        type: String,
        required: false,
        select: false,
    },
}, {
    timestamps: true
});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate JWT token
userSchema.methods.getSignedJwtToken = function () {
    const expireTime = process.env.JWT_EXPIRE || 30 * 24 * 60 * 60; // 30 days in seconds
    return jwt.sign(
        { 
            id: this._id,
            role: this.role 
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: expireTime,
        }
    );
};

// Match user entered password to hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Check if account is locked
userSchema.methods.isLocked = function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return await this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        });
    }
    // Otherwise we're incrementing
    const updates = { $inc: { loginAttempts: 1 } };
    // Lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= 5 && !this.lockUntil) {
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
    }
    return await this.update(updates);
};

module.exports = mongoose.model("User", userSchema);
