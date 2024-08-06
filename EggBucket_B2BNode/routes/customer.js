const {createCustomer,getAllCustomers}=require('../controllers/customer_controller')
const express = require("express");
const multer = require('multer');

const router=express.Router()

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads/customer",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/egg-bucket-b2b/create-customer',upload.single("img"),createCustomer)
router.get('/egg-bucket-b2b/getAllCustomer',getAllCustomers)

module.exports=router