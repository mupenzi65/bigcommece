const { Pool } = require("pg");
const pool = require("../config/db");
const asyncWrapper = require("express-async-handler");






 

const addProducts=asyncWrapper(async(req,res)=>{
    const {title,description,price,package,order,category,owner,image,}=req.body
    const imgArray=[image]

    try {
      const data= await pool.query("INSERT INTO products (title,description,price,package,orders,category,owner,image) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[title,description,price,package,order,category,owner,imgArray])

  
      return res.json('product addded successfull')
      
    } catch (error) {
      res.status(500).json(error)
    }

    




})




const getAllProducts=asyncWrapper(async(req,res)=>{
  const {page}=req.body
  const pageSize=2

  const offset=(page -1)* pageSize;
  



  try {
    const response=await pool.query("SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2 ",[pageSize,offset])
    const totalData=await pool.query("SELECT COUNT(*) FROM products")
    const totalPage=Math.ceil(+totalData.rows[0].count/pageSize)
    res.json({
      data:response.rows,
      pagination:{
        page:page,
        limit:pageSize,
        totalPage:totalPage
      }
    })
  } catch (error) {
    res.status(500).json(error)








}})



const getProduct=asyncWrapper(async(req,res)=>{

  try {
    const response=await pool.query("SELECT * FROM products WHERE id=($1)",[req.body.id])
    res.json(response.rows)
  } catch (error) {
    res.status(500).json(error)

    
  }})
const sellerProducts=asyncWrapper(async(req,res)=>{

  try {
    const response=await pool.query("SELECT * FROM products WHERE owner=($1)",[req.body.id])

    res.json(response.rows)
  } catch (error) {
    res.status(500).json(error)

    
  }})


  const searchProducts=asyncWrapper(async(req,res)=>{
  
    const searchPattern=req.body.searchPattern
  
    // columns to search in
  
    const columnsToSearch=['title','description'];
  
    const query=`SELECT *
    FROM products
    WHERE ${columnsToSearch.map(column => `${column} ILIKE $1`).join(' OR ')}`
  
    // Search query parameters
    const searchParams = [`%${searchPattern}%`];
     pool.query(query, searchParams, (err, queryResult) => {
      if (err) {
        res.status(500).send('Error executing query');
      } else {
       return res.json(queryResult.rows)
      }
    });
  
  
  
  
  
  
  
  
  })
  

module.exports={
  searchProducts,
    addProducts,
    getAllProducts,
    getProduct,
    sellerProducts,
  
  
}