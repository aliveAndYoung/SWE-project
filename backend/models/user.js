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
});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate JWT token
userSchema.methods.getSignedJwtToken = function () {
    const expireTime = process.env.JWT_EXPIRE || 30 * 24 * 60 * 60; // 30 days in seconds
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: expireTime,
    });
};
// Match user entered password to hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
