const { Pool } = require("pg");
const pool = require("../config/db");
const asyncWrapper = require("express-async-handler");



const CreateOrder=asyncWrapper(async(req,res)=>{

    


    try {
        const savedOrder=await pool.query('INSERT INTO orders (products,owner,sender,createdAt) VALUES($1,$2,$3,$4) RETURNING *',[req.body.products,req.body.owner,req.body.sender,req.body.createdAt])
        console.log(savedOrder.rows[0])
        res.json(savedOrder.rows[0])
    } catch (error) {
        res.json(error)
    }



})



const getUserOrder=asyncWrapper(async(req,res)=>{

    try {
        const order=await pool.query('SELECT * FROM orders WHERE owner=($1)',[req.body.id])
        res.json(order.rows)
    } catch (error) {
        res.json(error)
    }






})
const getSellerOrder=asyncWrapper(async(req,res)=>{

    try {
        const order=await pool.query('SELECT * FROM orders WHERE sender=($1)',[req.body.id])
        res.json(order.rows)
    } catch (error) {
        res.json(error)
    }






})

module.exports={CreateOrder,getUserOrder,getSellerOrder}