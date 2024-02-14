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
import Customer from './models/Customer.js';
import Sales from './models/Sales.js';
import Supplier from './models/Supplier.js';
//import { dataCustomer } from './data/index.js';
//import {dataProduct} from './data/index.js'

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
    app.post("/addproduct", (req,res)=> {
      Product.create(req.body)
      .then(Product => res.json(Product))
      .catch(err=>res.json(err))
    })
    app.post("/addcustomer", (req,res)=> {
      Customer.create(req.body)
      .then(Customer => res.json(Customer))
      .catch(err=>res.json(err))
    })

    app.post("/addsales", (req,res)=> {
      Sales.create(req.body)
      .then(Sales => res.json(Sales))
      .catch(err=>res.json(err))
    })

    app.post("/addsupplier", (req,res)=> {
      Supplier.create(req.body)
      .then(Supplier => res.json(Supplier))
      .catch(err=>res.json(err))
    })

    app.delete("/supplier/:id", (req, res) => {
      const { id } = req.params;
      Supplier.findByIdAndDelete(id)
        .then((deletedSupplier) => {
          if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
          }
          res.status(200).json({ message: "Supplier deleted successfully", deletedSupplier });
        })
        .catch((error) => {
          console.error("Error deleting supplier:", error);
          res.status(500).json({ message: "Internal server error" });
        });
    });
    app.listen(PORT, () => console.log(`Server is running`));
    //Product.insertMany(dataProduct);
    //customer.insertMany(dataCustomer);
  })
  .catch((error) => console.log(`${error} did not connect`));