const Customer = require("../models/customer_model");
const fs = require("fs");
const path = require("path");

const removeImg=require('./imageRemove')

exports.createCustomer=async (req,res)=>{
try{
   const data=req.body;
   if (!req.file) {
    return res.status(400).json({ status: "fail", message: "No image file provided" });
    }

    if (!data.customerName  ||!data.customerId ||!data.location ||!data. phoneNumber ||!data.outlet) {
        await removeImg('customer',req.file.filename)
        return res
          .status(400)
          .json({ error: "Name,customerId,location,phoneNo and Outlet are required" });
      }
      data.img=req.file.filename
     const newCustomer = await Customer.create(data);
    res.status(201).json(newCustomer);

}catch (err) {
    await removeImg('customer',req.file.filename)
    if (err.code === 11000) {
      // MongoDB duplicate key error
      return res
        .status(400)
        .json({
          error: "Customer with this phone number or CustomerId exists",
        });
    }
    res
      .status(500)
      .json({ error: "Failed to create Customer", details: err.message });
  }
};

exports.getAllCustomers = async (req, res) => {
    try {
      const Customers = await Customer.find().populate('outlet');
      res.json(Customers);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to get Customers", details: err.message });
    }
  };


  exports.getCustomerById = async (req, res) => {
    try {
      const CId = req.params.id;
      const result = await Customer.findById(CId).populate('outlet');
  
      if (!result) {
        return res.status(404).json({ error: "Customer not found" });
      }
  
      res.json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to get Customer", details: err.message });
    }
  };