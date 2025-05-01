const express = require("express");
const router = express.Router();
const idChecker = require("../middlewares/idChecker");
const {
    getAllUsers,
    createUser,
    getUserById,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.get("/:id", idChecker, getUserById);
router.post("/", createUser);

module.exports = router;
