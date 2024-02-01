import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Link } from "react-router-dom";

const ProductsMenu = () => {
  return (
    <div className="mt-3 ml-3">
       <Link to={'/seller/dashboard/products'}>
       <div className="hover:bg-gray-400 px-2 rounded-2xl cursor-pointer">
        <AddIcon sx={{fontSize:30, color:'white'}}  />
        <span className="font-semibold text-gray-300 ml-1">Add Products</span>
      </div>

       </Link>
       <Link to={'/seller/dashboard/allproducts'}>
       <div className="hover:bg-gray-400 rounded-2xl px-2 cursor-pointer mt-3">
        <Inventory2OutlinedIcon sx={{fontSize:30, color:'white'}} />
        <span className="font-semibold text-gray-300 ml-1">Products Lists</span>
      </div>
       </Link>
      
      
    </div>
  );
};

export default ProductsMenu;
