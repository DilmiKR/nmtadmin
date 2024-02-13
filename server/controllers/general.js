import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";

export const getProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const getCustomer = async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(id);
      res.status(200).json(customer);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const getSupplier = async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findById(id);
      res.status(200).json(supplier);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };