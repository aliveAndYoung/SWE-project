const express = require("express");
const {
    register,
    login,
    getMe,
} = require("../controllers/authenticationController.js");
const { authenticate } = require("../middlewares/authentication.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);

module.exports = router;
