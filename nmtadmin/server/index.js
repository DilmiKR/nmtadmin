import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import detailRoutes from "./routes/detail.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//import data
import Product from './models/Product.js';
import {dataProduct} from './data/index.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/details", detailRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const PORT = 5001 || 9000;
mongoose
  .connect("mongodb+srv://nelundeniyamotortraders:nmt1234@cluster0.6vnazjw.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT, () => console.log(`Server is starting`));
    //Product.insertMany(dataProduct);
  })
  .catch((error) => console.log(`${error} did not connect`));
