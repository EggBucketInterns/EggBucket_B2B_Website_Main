const {orderAggregate,createAdmin,changePass,signin,verify}=require('../controllers/admin_controller')
const express=require('express')
const router=express.Router()

router.get('/egg-bucket-b2b/dashboard',orderAggregate)
//router.post('/egg-bucket-b2b/create-admin',createAdmin)
router.post('/egg-bucket-b2b/admin',signin)
router.patch('/egg-bucket-b2b/admin',changePass)
router.get('/egg-bucket-b2b/verify',verify)


module.exports=router
