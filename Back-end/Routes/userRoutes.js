
const express=require('express')
const route=express.Router()
const {CreateUser,LoginForUser,getSeller,loginForSeller,CreateSeller,}=require('../controllers/userController')




route.post('/user/create',CreateUser)
route.post('/user/login',LoginForUser)
route.post("/seller/register",CreateSeller)
route.get("/user/:userId",getSeller)
route.post("/seller/login",loginForSeller)

module.exports=route