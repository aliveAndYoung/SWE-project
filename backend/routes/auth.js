const express = require("express");
const {
    register,
    login,
    getMe,
    updateDetails,
    updatePassword,
    logout
} = require("../controllers/authenticationController.js");
const { authenticate } = require("../middlewares/authentication.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.put("/updatedetails", authenticate, updateDetails);
router.put("/updatepassword", authenticate, updatePassword);
router.get("/logout", authenticate, logout);

module.exports = router;
