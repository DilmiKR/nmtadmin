import express from "express";
import { getProduct} from "../controllers/general.js";
import { getCustomer } from "../controllers/details.js";
import { getSupplier } from "../controllers/details.js";
import { getSales } from "../controllers/details.js";
const router = express.Router();

router.get("/Product/:id", getProduct);
router.get("/Customer/:id", getCustomer);
router.get("/Supplier/:id", getSupplier);
router.get("/Sales/:id", getSales);

export default router;
