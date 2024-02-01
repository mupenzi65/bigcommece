const express=require('express')
const router=express.Router()
const { addProducts,getAllProducts,getProduct,sellerProducts,searchProducts } = require('../controllers/ProductController');


router.post('/products/create',addProducts);
router.post('/products/',getAllProducts);
router.post('/product/',getProduct);
router.post('/product/search',searchProducts);
router.post('/seller/products/',sellerProducts);


module.exports=router