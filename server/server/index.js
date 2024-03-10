import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
const { diskStorage } = multer; 
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
import NotAvailable from './models/NotAvailable.js';
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename here, if needed
    const uniqueFilename = generateUniqueFilename(file);
    cb(null, uniqueFilename); // Use the generated filename for the uploaded file
  }
});

// Function to generate a unique filename
function generateUniqueFilename(file) {
  // Generate a unique filename based on current timestamp and original filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  return `${uniqueSuffix}-${file.originalname}`;
}

// Initialize multer with the defined storage
const upload = multer({ storage: storage });




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

    //get products by nelundeniyaCode
    const nelundeniyaRouter = express.Router();

    nelundeniyaRouter.get("addstock/:nelundeniyaCode", async (req, res) => {
      const { nelundeniyaCode } = req.params;
      try {
        const product = await Product.findOne({ nelundeniyaCode });
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // Mount the router for fetching products by Nelundeniya code
    app.use("/products", nelundeniyaRouter);

    app.get("/addstock/:nelundeniyaCode", async (req, res) => {
      const { nelundeniyaCode } = req.params;
      try {
        const product = await Product.findOne({ nelundeniyaCode });
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    

    //insert stock
    app.post("/addproduct", (req,res)=> {
      Product.create(req.body)
      .then(Product => res.json(Product))
      .catch(err=>res.json(err))
    });

    //update stock
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

   // Available quantity update
    app.put("/products/:id", async (req, res) => {
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

    //delete stocks
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

     {/*** CATEGORIES ***/}

    //get category
    app.get("/categories", async (req, res) => {
      try {
        const categories = await Category.find();
        res.json(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    //add category
    app.post("/addcategory", (req,res)=> {
      Category.create(req.body)
      .then(Category => res.json(Category))
      .catch(err=>res.json(err))
    });



    {/*** CUSTOMERS ***/}

    //insert customers
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

    {/** SUPPLIER PAYMENTS **/}

    
    SupplierPayment.collection.dropIndex("orderId_1_supplier_1", function(err, result) {
      if (err) {
        console.log("Error dropping index:", err);
      } else {
        console.log("Index dropped successfully:", result);
      }
    });
    

     //INSERT supplier payments
     app.post("/addsupplierpayment", async (req, res) => {
      try {
        const { supplier, orderId, invoiceValue, nelundeniyaCode } = req.body;
    
        const existingSupplierPayment = await SupplierPayment.findOne({ supplier, orderId, nelundeniyaCode });
    
        if (existingSupplierPayment) {
          existingSupplierPayment.invoiceValue += parseFloat(invoiceValue);
          await existingSupplierPayment.save();
    
          res.status(200).json(existingSupplierPayment);
        } else {
          const newSupplierPayment = await SupplierPayment.create({
            supplier,
            orderId,
            invoiceValue: parseFloat(invoiceValue),
            nelundeniyaCode
          });
    
          res.status(200).json(newSupplierPayment);
        }
      } catch (error) {
        console.error("Error adding or updating supplier payment:", error);
        res.status(500).json({ error: "Failed to add or update supplier payment" });
      }
    });

    // TEMP
    app.post("/updatesupplierpayment", async (req, res) => {
      try {
        const { supplier, orderId, invoiceValue, nelundeniyaCode } = req.body;
    
        const existingSupplierPayment = await SupplierPayment.findOne({ supplier, orderId, nelundeniyaCode });
    
        if (existingSupplierPayment) {
          existingSupplierPayment.invoiceValue += parseFloat(invoiceValue);
          await existingSupplierPayment.save();
    
          res.status(200).json(existingSupplierPayment);
        } else {
          const newSupplierPayment = await SupplierPayment.create({
            supplier,
            orderId,
            invoiceValue: parseFloat(invoiceValue),
            nelundeniyaCode
          });
    
          res.status(200).json(newSupplierPayment);
        }
      } catch (error) {
        console.error("Error adding or updating supplier payment:", error);
        res.status(500).json({ error: "Failed to add or update supplier payment" });
      }
    });

    //updateinvoiceValue
    app.put("/addsupplierpaymentinvoice", (req, res) => {
      const { supplier, orderId, nelundeniyaCode, invoiceValue } = req.body;
      SupplierPayment.findOneAndUpdate(
          { supplier, orderId, nelundeniyaCode },
          { invoiceValue },
          { new: true } 
      )
      .then((updatedSupplierPayment) => {
          if (!updatedSupplierPayment) {
              return res.status(404).json({ message: "Supplier payment not found" });
          }
          res.status(200).json({ message: "Supplier payment updated successfully", updatedSupplierPayment });
      })
      .catch((error) => {
          console.error("Error updating supplier payment:", error);
          res.status(500).json({ message: "Internal server error" });
      });
  });
  
    
    
    
    //INSERT payment method++ INTO SupploerPayment TABLE
    app.put('/supplierpayment/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const updatedSupplierPayment = await SupplierPayment.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedSupplierPayment) {
          return res.status(404).json({ message: 'Supplier Payment not found' });
        }
        res.json(updatedSupplierPayment);
      } catch (error) {
        console.error('Error updating Supplier Payment:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    

    // DElete Supplier Paymenys
    app.delete("/supplierpayment/:supplier/:orderId/:nelundeniyaCode", (req, res) => {
      const { supplier, orderId, nelundeniyaCode } = req.params;
      SupplierPayment.findOneAndDelete({ supplier, orderId, nelundeniyaCode })
        .then((deletedSupplierPayment) => {
          if (!deletedSupplierPayment) {
            return res.status(404).json({ message: "SupplierPayment not found" });
          }
          res.status(200).json({ message: "SupplierPayment deleted successfully" });
        })
        .catch((error) => {
          console.error("Error deleting SupplierPayment:", error);
          res.status(500).json({ message: "Internal server error" });
        });
    });
    

   
    {/*** NOT AVAILABLE PRODUCTS ***/}

    //insert data into not available
    app.post("/addnotavailableproduct", upload.single('Item_Image'), (req, res) => {
      try {
        // Access req.body for other form fields
        const { Date, Vehicle_Type, Item, Item_Description, Brand, Inventory, comment } = req.body;
        
        let Item_Image = ''; // Initialize Item_Image variable
    
        // Check if req.file exists and contains the uploaded file
        if (req.file) {
          // Access req.file for the uploaded image
          Item_Image = req.file.filename; // Assuming 'filename' contains the filename of the uploaded image
        }
    
        // Create a new instance of NotAvailable model with the received data
        const newNotAvailable = new NotAvailable({
          Date,
          Vehicle_Type,
          Item,
          Item_Description,
          Brand,
          Inventory,
          comment,
          Item_Image // Save the filename of the uploaded image or an empty string if no image is uploaded
        });
    
        // Save the new NotAvailable document to the database
        newNotAvailable.save()
          .then(savedNotAvailable => {
            console.log('NotAvailable saved:', savedNotAvailable);
            res.json(savedNotAvailable); // Send the saved document as response
          })
          .catch(err => {
            console.error('Error saving NotAvailable:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          });
      } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ error: error.message }); // Send a 400 Bad Request response with the error message
      }
    });
    

   

    app.listen(PORT, () => console.log(`Server is running`));
    //Product.insertMany(dataProduct);
   //Customer.insertMany(dataCustomer);
   // SupplierPayment.insertMany(dataSupplierPayment);
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
    
     app.get("/fetch-and-insert", async (req, res) => {
      try {
        const products = await Product.find();
        
        for (const product of products) {
          const { Supplier, OrderID, quantity, purchasedPrice, nelundeniyaCode } = product;
          
          const invoiceValue = quantity * purchasedPrice;
          const supplier = Supplier;
          const orderId = OrderID;
          
          await SupplierPayment.create({
            supplier, 
            orderId,
            nelundeniyaCode,
            invoiceValue,
          });
        }
        res.status(200).json({ message: "Products inserted into Supplier Payments successfully" });
      } catch (error) {
        console.error("Error fetching and inserting products:", error);
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
