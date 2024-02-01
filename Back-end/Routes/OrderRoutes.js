const express=require('express')
const router=express.Router()

const {CreateOrder,getUserOrder,getSellerOrder}=require('../controllers/OrderController')

router.post('/order/create',CreateOrder)
router.post('/order/',getUserOrder)
router.post('/seller/order/',getSellerOrder)

module.exports=router