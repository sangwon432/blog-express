import express from 'express';
const router = express.Router();

import {createProduct, deleteProduct, getAllProducts, getProductById, updateProduct} from "../controllers/product.js";

router.get("/", getAllProducts)

router.get("/:productId", getProductById)

router.post("/create", createProduct)

router.put("/:productId", updateProduct)

router.delete("/:productId", deleteProduct)

export default router;