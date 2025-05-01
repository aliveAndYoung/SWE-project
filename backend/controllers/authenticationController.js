const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const generateResponse = require("../utils/generateResponse");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
    const {
        email,
        password,
        firstName,
        lastName,
        location,
        dob,
        ssn,
        visaCardNumber,
        visaExpiry,
        visaCW,
    } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
        return next(new ErrorResponse("Missing required fields", 400));
    }

    // Create user with all provided fields
    const user = await User.create({
        email,
        password,
        firstName,
        lastName,
        location,
        dob: dob ? new Date(dob) : null,
        ssn,
        visaCardNumber,
        visaExpiry,
        visaCW,
    });

    sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new ErrorResponse("Please provide email and password", 400)
        );
    }

    // Explicitly select password field which is normally hidden
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // Exclude sensitive fields
    const user = await User.findById(req.user.id).select(
        "-password -ssn -visaCardNumber -visaCW"
    );

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json(generateResponse(true, 200, user));
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
const updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        location: req.body.location,
        dob: req.body.dob ? new Date(req.body.dob) : null,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    }).select("-password -ssn -visaCardNumber -visaCW");

    res.status(200).json(generateResponse(true, 200, user));
});

// Helper: Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    res.status(statusCode)
    .json(generateResponse(true, statusCode, { token }));
};

module.exports = {
    register,
    login,
    getMe,
    updateDetails,
};
