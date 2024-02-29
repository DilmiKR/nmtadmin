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
//import { dataProduct } from './data/index.js';

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

    {/*** STOCKS ***/}

    // get products
    app.get("/products", async (req, res) => {
      try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    //INSERT PRODUCTS
    app.post("/addproduct", (req,res)=> {
      Product.create(req.body)
      .then(Product => res.json(Product))
      .catch(err=>res.json(err))
    });

    //UPDATE PRODUCT
    app.put('/products/:id', async (req, res) => {
      try {
        const productId = req.params.id;
        const updatedData = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
            if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
            res.json(updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    //DELETE PRODUCT
    app.delete("/products/:id", (req, res) => {
      const { id } = req.params;
      Product.findByIdAndDelete(id)
        .then((deletedProduct) => {
          if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
          }
          res.status(200).json({ message: "Product deleted successfully", deletedProduct });
        })
        .catch((error) => {
          console.error("Error deleting Product:", error);
          res.status(500).json({ message: "Internal server error" });
        });
    });


    //INSERT CUSTOMERS
    app.post("/addcustomer", (req, res) => {
      const { customerName, totalDebt, comment } = req.body;
      Customer.create({ customerName, totalDebt, comment })
        .then((customer) => res.json(customer))
        .catch((err) => res.json(err));
    });    
    
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

    // Get all Suppliers
app.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Supplier by ID
app.get('/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Supplier
app.put('/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(updatedSupplier);
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
    app.delete("/suppliers/:id", (req, res) => {
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

    app.get("/Product", async (req, res) => {
      try {
        const Product = await Product.find();
        res.json(Product);
      } catch (error) {
        console.error("Error fetching Supplier Payment:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

     //INSERT supplier payments
     app.post("/addsupplierpayment", async (req, res) => {
      try {
        // Assuming req.body contains the necessary data for creating or updating a supplier payment
        const { supplier, orderId, invoiceValue } = req.body;
    
        // Find an existing supplier payment with the provided orderId and supplier
        const existingSupplierPayment = await SupplierPayment.findOne({ supplier, orderId });
    
        if (existingSupplierPayment) {
          // If an existing supplier payment is found, sum the existing invoice value with the new one
          existingSupplierPayment.invoiceValue += parseFloat(invoiceValue);
          await existingSupplierPayment.save();
    
          // Respond with the updated supplier payment
          res.status(200).json(existingSupplierPayment);
        } else {
          // If no existing supplier payment is found, create a new one with the provided data
          const newSupplierPayment = await SupplierPayment.create({
            supplier,
            orderId,
            invoiceValue: parseFloat(invoiceValue) // Parse the invoiceValue to a float before saving
          });
    
          // Respond with the newly created supplier payment
          res.status(200).json(newSupplierPayment);
        }
      } catch (error) {
        // If an error occurs during the process, send an error response
        console.error("Error adding or updating supplier payment:", error);
        res.status(500).json({ error: "Failed to add or update supplier payment" });
      }
    });
    
    
    //INSERT payment method++ INTO Product TABLE
    app.put('/Product/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(updatedProduct);
      } catch (error) {
        console.error('Error updating Product:', error);
        res.status(500).json({ error: 'Internal server error' });
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
   //Customer.insertMany(dataCustomer);
   // Product.insertMany(dataProduct);
  })
  .catch((error) => console.log(`${error} did not connect`));


    

   {/*  app.post("/addsupplierpayment", async (req, res) => {
      const { supplier, orderId, lineValue } = req.body;
    
      try {
        // Check if there are existing products with the same Supplier and OrderID
        const existingProducts = await Product.find({ Supplier, OrderID });
        let totalPurchasedPrice = 0;
    
        // Calculate the sum of purchasedPrice values
        existingProducts.forEach((product) => {
          totalPurchasedPrice += product.purchasedPrice;
        });
    
        // If there are existing products, update the corresponding Product
        if (existingProducts.length > 0) {
          const Product = await Product.findOneAndUpdate(
            { supplier: Supplier, orderId: OrderID },
            { $inc: { invoiceValue: purchasedPrice } }, // Increment invoiceValue by purchasedPrice
            { new: true }
          );
    
          if (!Product) {
            // Handle case where Product doesn't exist
            console.error("Supplier payment not found for updating");
            res.status(404).json({ message: "Supplier payment not found for updating" });
            return;
          }
    
          // Respond with the updated Product
          res.status(200).json({ message: "Supplier payment updated successfully", Product });
        } else {
          // Check if there is an existing Product entry with the same Supplier and OrderID
          const existingProduct = await Product.findOne({ supplier: Supplier, orderId: OrderID });
    
          if (existingProduct) {
            // If Product exists, update its invoiceValue
            existingProduct.invoiceValue += purchasedPrice;
            await existingProduct.save();
    
            // Respond with the updated Product
            res.status(200).json({ message: "Supplier payment updated successfully", Product: existingProduct });
          } else {
            // If no existing products or Product, proceed with adding the new product and creating a new Product
            const product = await Product.create(req.body);
    
            // Create a new Product with the purchasedPrice as invoiceValue
            const newProduct = await Product.create({
              supplier: Supplier,
              orderId: OrderID,
              invoiceValue: purchasedPrice
            });
    
            // Respond with the newly added product and Product
            res.status(201).json({ message: "Product added successfully", product, newProduct });
          }
        }
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    
    
    
    

   
   
   
   
   
   router.post('/updateProduct', async (req, res) => {
      try {
        const { supplier, orderId } = req.body;
    
        const existingEntry = await Product.findOne({ supplier, orderId });
    
        if (existingEntry) {
          existingEntry.supplier = supplier;
          existingEntry.orderId = orderId;
          await existingEntry.save();
          res.status(200).send("Product entry updated successfully!");
        } else {
          const newProduct = new Product({ supplier, orderId });
          await newProduct.save();
          res.status(201).send("New Product entry created!");
        }
      } catch (error) {
        console.error("Error updating Product:", error);
        res.status(500).send("Internal Server Error");
      }
    });   
    

    app.post('/updateProduct', async (req, res) => {
      try {
        const updatedData = req.body;
    
        for (const row of updatedData) {
          await Product.findByIdAndUpdate(id, {
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

  {/*}  router.put('/Product/:id/status', async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
    
      try {
        const updatedPayment = await Product.findByIdAndUpdate(id, { status }, { new: true });
    
        if (!updatedPayment) {
          return res.status(404).json({ message: 'Payment not found' });
        }
    
        res.json(updatedPayment);
      } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  //Update invoiceValue
    app.put('/Productinvoice/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const { invoiceValue } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { invoiceValue },
          { new: true } 
        );
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Supplier payment not found' });
        }
        return res.status(200).json({ message: 'Supplier payment updated successfully', updatedProduct });
      } catch (error) {
        console.error('Error updating supplier payment:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
    */}
