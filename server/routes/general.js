import express from "express";
import { getProduct} from "../controllers/general.js";

const router = express.Router();

router.get("/Product/:id", getProduct);

export default router;
