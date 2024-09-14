const Order = require("../models/order_model");
const Outlet = require("../models/outlet_model");
const Admin = require("../models/admin_model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {promisify}=require('util')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.secrete, {
    expiresIn: process.env.expire,
  });
};

const createJwtAndSend = (user, statusCode, res) => {
  let token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.orderAggregate = async (req, res) => {
  try {
    const { outletId, customerId, createdAt } = req.query;
    const matchCriteria = {};
    if (outletId) {
      matchCriteria.outletId = new mongoose.Types.ObjectId(outletId);
    }

    if (customerId) {
      matchCriteria.customerId = new mongoose.Types.ObjectId(customerId);
    }

    if (createdAt) {
      matchCriteria.createdAt = { $lt: new Date(createdAt) };
    }

    const data = await Order.aggregate([
      {
        $match: matchCriteria,
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          ordersPending: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },
          ordersCompleted: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
          totalAmtCollected: {
            $sum: {
              $cond: [
                { $eq: ["$status", "completed"] },
                { $toDouble: "$amount" },
                0,
              ],
            },
          },
          ordersIntransit: {
            $sum: {
              $cond: [{ $eq: ["$status", "intransit"] }, 1, 0],
            },
          },
          ordersCancelled: {
            $sum: {
              $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0],
            },
          },
          ordersDelivered: {
            $sum: {
              $cond: [{ $eq: ["$status", "delivered"] }, 1, 0],
            },
          }
        },
      },
    ]);

    const totalOutlets = await Outlet.countDocuments();
    const result = {
      totalOutlets,
      ...data[0],
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to aggregate orders", details: err.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const data = await Admin.create(req.body);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    if (err.name == "ValidationError") {
      const errors = Object.values(err.errors).map((val) => val.message);
      const message = `Invalid input data. ${errors.join(". ")}`;
      return res.status(400).json({
        status: "validation error",
        message,
      });
    }

    if (err.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).json({
        error: "Admin with this email already exists",
      });
    }

    res.status(500).json({
      status: "fail",
      message: "Failed to create Admin",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email)
      return res.status(401).json({
        status: "fail",
        message: "Enter email & password",
      });

    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.passcheck(password, admin.password)))
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });

    createJwtAndSend(admin, 200, res);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error during login",
      details: err.message,
    });
  }
};

exports.changePass = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!oldPassword || !email || !newPassword)
      return res.status(401).json({
        status: "fail",
        message: "Enter email, old & new password",
      });

    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.passcheck(oldPassword, admin.password)))
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or old password",
      });

    admin.password = newPassword;
    admin.passChangedAt=Date.now()
    await admin.save();

    return res.status(200).json({
      status: "success",
      data: "Password successfully changed",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed to change password",
      details: err.message,
    });
  }
};

exports.verify=async (req,res)=>{
  try{
     
    const token=req.headers.authorization;
    
    if(!token && !token.startsWith('Bearer')) return res.status(401).json({
      status:"fail",
      message:"Bearer token not sent!"
    })
    
    
    const verification=promisify(jwt.verify)

    const decoded=await verification(token.split(' ')[1],process.env.secrete)
   
    
    
    const admin=await Admin.findOne({_id:decoded.id})
    
    if(!admin) return res.status(401).json({
      status:"fail",
      message:"Admin not found, please login again"
    })
    
    
  //   if(admin.passChangedAt){
  //   const passChangeTime=parseInt(admin.passChangedAt.getTime()/1000,10)
    
    // if(passChangeTime>decoded.iat) return res.status(401).json({
    //   status:"fail",
    //   message:"password has changed, login again!"  
    // })
  // }
  if(admin.checkPassChanged(decoded.iat)){
    return res.status(401).json({
      status:"fail",
      message:"password has changed, login again!"  
    })
  }
     
    res.status(200).json({
      status:"success"
    })
    

  } catch(err){
      res.status(401).json({
        status:"fail",
        message:"Invalid token, please login again"
      })
  }
}
