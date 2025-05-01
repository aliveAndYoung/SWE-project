const express = require("express");
const router = express.Router();
const idChecker = require("../middlewares/idChecker");
const {
    getAllProducts,
    createProduct,
    getProductById,
} = require("../controllers/productsController");

router.get("/", getAllProducts);
router.get("/:id", idChecker, getProductById);
router.post("/", createProduct);

module.exports = router;
