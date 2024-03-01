import express from "express";
import { getProducts } from "../controllers/details.js";
import { getCustomer } from "../controllers/details.js";
import { getSupplier } from "../controllers/details.js";
import { getSupplierPayment } from "../controllers/details.js";
import { getNotAvailabe } from "../controllers/details.js";

const router = express.Router();

router.get("/Products", getProducts);
router.get("/Customer", getCustomer);
router.get("/Supplier", getSupplier);
router.get("/supplierpayment", getSupplierPayment);
router.get("/NotAvailable", getNotAvailabe);

export default router;
