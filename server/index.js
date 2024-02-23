import express from 'express';
const router = express.Router();
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
import Category from './models/Categories.js';
import SupplierPayment from './models/SupplierPayment.js';
//import { dataCustomer } from './data/index.js';
//import {dataProduct} from './data/index.js'
//import { dataSupplierPayment } from './data/index.js';

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

    app.get("/products", async (req, res) => {
      try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.post("/addproduct", (req,res)=> {
      Product.create(req.body)
      .then(Product => res.json(Product))
      .catch(err=>res.json(err))
    });
    
    app.put("/product/:id", async (req, res) => {
      const productId = req.params.id;
      const { quantity } = req.body;

      try {
        const product = await Product.findByIdAndUpdate(productId, { quantity }, { new: true });
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product quantity updated successfully", product });
      } catch (error) {
        console.error("Error updating product quantity:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

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

    app.get("/suppliers/:id", async (req, res) => {
      try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.delete("/suppliers/:ContactPerson", (req, res) => {
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

    app.get("/supplierpayment", async (req, res) => {
      try {
        const supplierpayment = await SupplierPayment.find();
        res.json(supplierpayment);
      } catch (error) {
        console.error("Error fetching Supplier Payment:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.post("/updatesupplierpayment", async (req, res) => {
      try {
        const updatedData = req.body;
    
        for (const row of updatedData) {
          await SupplierPayment.findOneAndUpdate({ _id: row._id }, row, { upsert: true });
        }
        res.status(200).json({ message: "Data saved successfully!" });
      } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

   {/* router.post('/updatesupplierpayment', async (req, res) => {
      try {
        const { supplier, orderId } = req.body;
    
        const existingEntry = await SupplierPayment.findOne({ supplier, orderId });
    
        if (existingEntry) {
          existingEntry.supplier = supplier;
          existingEntry.orderId = orderId;
          await existingEntry.save();
          res.status(200).send("SupplierPayment entry updated successfully!");
        } else {
          const newSupplierPayment = new SupplierPayment({ supplier, orderId });
          await newSupplierPayment.save();
          res.status(201).send("New SupplierPayment entry created!");
        }
      } catch (error) {
        console.error("Error updating SupplierPayment:", error);
        res.status(500).send("Internal Server Error");
      }
    });   
    

    app.post('/updatesupplierpayment', async (req, res) => {
      try {
        const updatedData = req.body;
    
        for (const row of updatedData) {
          await SupplierPayment.findByIdAndUpdate(id, {
            orderId: row.orderId,
            supplier: row.supplier,
            invoiceValue: row.invoiceValue,
            paidMethod: row.paidMethod,
            checkDate: row.checkDate,
          });
        }
    
        res.status(200).json({ message: 'Supplier payment data updated successfully' });
      } catch (error) {
        console.error('Error updating supplier payment data:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });*/}

  {/*}  router.put('/supplierpayment/:id/status', async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
    
      try {
        const updatedPayment = await SupplierPayment.findByIdAndUpdate(id, { status }, { new: true });
    
        if (!updatedPayment) {
          return res.status(404).json({ message: 'Payment not found' });
        }
    
        res.json(updatedPayment);
      } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });*/}

    app.put("/supplierpayment/:id/status", async (req, res) => {
      const SupplierPaymentId = req.params.id;
      const { status } = req.body;
    
      try {
        const supplierpayment = await SupplierPayment.findByIdAndUpdate(SupplierPaymentId, { status }, { new: true });
        if (!supplierpayment) {
          return res.status(404).json({ message: "Supplier payment not found" });
        }
        res.status(200).json({ message: "Supplier payment status updated successfully", supplierpayment });
      } catch (error) {
        console.error("Error updating supplier payment status:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    

    app.get("/categories", async (req, res) => {
      try {
        const categories = await Category.find();
        res.json(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.post("/addcategory", (req,res)=> {
      Category.create(req.body)
      .then(Category => res.json(Category))
      .catch(err=>res.json(err))
    });

    app.listen(PORT, () => console.log(`Server is running`));
    //Product.insertMany(dataProduct);
    //customer.insertMany(dataCustomer);
    //SupplierPayment.insertMany(dataSupplierPayment);
  })
  .catch((error) => console.log(`${error} did not connect`));