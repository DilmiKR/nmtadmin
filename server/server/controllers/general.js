import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import Sales from "../models/Sales.js";
import Category from "../models/Categories.js";
import SupplierPayment from "../models/SupplierPayment.js";
import NotAvailable from "../models/NotAvailable.js";

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

  export const getSales = async (req, res) => {
    try {
      const { id } = req.params;
      const sales = await Sales.findById(id);
      res.status(200).json(sales);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const getCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const categories = await Category.findById(id);
      res.status(200).json(categories);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const getSupplierPayment = async (req, res) => {
    try {
      const { id } = req.params;
      const supplierpayment = await SupplierPayment.findById(id);
      res.status(200).json(supplierpayment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const getNotAvailable = async (req, res) => {
    try {
      const { id } = req.params;
      const notAvailable = await NotAvailable.findById(id);
      res.status(200).json(notAvailable);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };