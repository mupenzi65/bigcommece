import React, { useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useMutation } from "react-query";
// import { createProducts } from "../../../utils/api";
import { toast } from "react-toastify";
import { useDataLayerValue } from '../../../context/Datalayer';
import axios from "axios";
import { createProducts } from "../../../utils/api";

const StepOne = () => {
  const [{ user }, dispatch] = useDataLayerValue();
  const inputRef=useRef(null)
  const[file,setFile]=useState(null)
  const[image,setImage]=useState(null)
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    order:'',
    package:'',
    category: "",
    image:"",
    owner:user?.id
  
  });
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    price: false,
    order: false,
    package: false,
    category: false,
    image:false
  });
  

  

  const regex = {
    title: /^\w$/,
    description: /^\w$/,
    price: /^[1-9]\d*$/,
    order: /^[1-9]\d*$/,
    package: /^\w$/,
    category: /^\w$/,
   
  };

  const handleFocus = (e) => {
    if (e.target.value === "") {
      setErrors((prev) => ({ ...prev, [e.target.name]: true }));
    }else{
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };

  const onChange = (e) => {
    setProductDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (regex[e.target.name].test(userDetails[e.target.name])) {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };



  // const handleFile=async(e)=>{
  //   const selectedFile = e.target.files[0];

  //   if (selectedFile) {
  //     if (selectedFile.type.startsWith("image/")) {
  //       setFile(e.target.files[0]);

  //     const imageUrl = URL.createObjectURL(selectedFile);
  //     setImage(imageUrl);





  //     } else {
  //       // File is not an image
  //       alert("Please select an image file.");
  //     }
  //   }
  // }

  // useEffect(() => {
  //   return () => {
  //     // Revoke the object URL when the component is unmounted
  //     if (image) {
  //       URL.revokeObjectURL(image);
  //     }
  //   };
  // }, [image]);

  const cloudinaryRef=useRef();
  const widgetRef=useRef();
  // setProductDetails((prev)=>({...prev,owner:seller.email}))

  useEffect(()=>{
    cloudinaryRef.current=window.cloudinary;
    widgetRef.current=cloudinaryRef.current.createUploadWidget({
        cloudName:"ddkwz7odf",
        uploadPreset:'y8naxvg3',
        maxFiles:1,

    },
    (err,result)=>{
        if(result.event === 'success'){
            setProductDetails((prev)=>({...prev,image:result.info.secure_url}))
            
        }
    }


    )
},[])
  

  // useEffect(() => {
  //   setProductDetails((prev) => ({ ...prev,image:images,owner:seller.email}));
    
    
  // }, []);

 


  
  
  
  
  
  
  
  
  
  const handleSubmit = async(e)=> {
   mutate()
    // const data=new FormData()
    // data.append('title',productDetails.title)
    // data.append('price',productDetails.price)
    // data.append('description',productDetails.description)
    // data.append('image',file)
    // data.append('category',productDetails.category)
    // data.append('owner',user.id)
   
    
   
     
    // await axios.post('http://localhost:3500/api/products/create', data)

   

    

  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => createProducts(productDetails),
    onSuccess: () => {
      toast.success("Added successfully");
      setProductDetails({
        title: "",
        description: "",
        price: "",
        order:"",
        package:"",
        category: "",
        image:"",
        owner:user?.id
      });
      
     
    },
  });




  

  

  return (
    <div>
      <form
        encType="multipart/form-data"
        onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="">
        <div className="mb-8 ">
          <p className="text-2xl font-semibold  " htmlFor="name">
            Product image <span className="text-red-600">*</span>
          </p>
          <div className="flex mt-3  gap-3">
            <div
              className={`w-[260px] ${
                errors.image && "border-red-500"
              } h-[205px] border border-blue-500 rounded-xl`}
            >
              {!productDetails.image&& (
                <div className="">
                  <div className="mt-[70px] mx-[50px] ">
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      onClick={()=>widgetRef.current?.open()}
                    >
                      Upload file
                    
                    </Button>
                  </div>
                </div>
              )}

              {productDetails.image && (
                <img
                  src={productDetails.image}
                  alt=""
                  className="w-[220px] h-[150px] object-contain"
                />
              )}
            </div>
        
          </div>
          {/* {imageError && (
            <p className="text-red-600"> image is required</p>
          )} */}
        </div>
          <p className="text-2xl font-semibold ">
            Title <span className="text-red-600">*</span>
          </p>
          <input
            className={`border w-full h-[40px] rounded-[4px] ${
              errors.title && "border-red-500"
            }   border-blue-600 px-3`}
            type="text"
            name="title"
            id=""
            value={productDetails.title}
            onChange={onChange}
            onBlur={handleFocus}
          />
          {errors.title && (
            <p className="text-red-600">
              Title must be greater than 5 characters
            </p>
          )}
        </div>
        <div className="mt-8 ">
          <p className="text-2xl font-semibold  " htmlFor="name">
            Description <span className="text-red-600">*</span>
          </p>
          <textarea
            className={`border w-full  rounded-[4px] ${
              errors.description && "border-red-500"
            }   border-blue-600 px-3`}
            type="text"
            cols={40}
            rows={3}
            name="description"
            value={productDetails.description}
            id=""
            onChange={onChange}
            onBlur={handleFocus}
          />
          {errors.description && (
            <p className="text-red-600">
              Description must be greater than 15 characters
            </p>
          )}
        </div>
        <div className="mt-8">
          <p className="text-2xl font-semibold ">
            Price <span className="text-red-600">*</span>
          </p>
          <input
            className={`border h-[40px] rounded-[4px] ${
              errors.price && "border-red-500"
            }   border-blue-600 px-3`}
            min={1}
            type="number"
            name="price"
            id=""
            value={productDetails.price}
            onChange={onChange}
            onBlur={handleFocus}
          />
          {errors.price && (
            <p className="text-red-600">
              Price must be greater than one dollar
            </p>
          )}
        </div>
        <div className="mt-8">
          <p className="text-2xl font-semibold ">
            Minimum Order <span className="text-red-600">*</span>
          </p>
          <input
            className={`border h-[40px] rounded-[4px] ${
              errors.order && "border-red-500"
            }   border-blue-600 px-3`}
            min={1}
            type="number"
            name="order"
            id=""
            value={productDetails.order}
            onChange={onChange}
            onBlur={handleFocus}
          />
          {errors.order && (
            <p className="text-red-600">
              order must be greater than 0 
            </p>
          )}
        </div>
        <div className="mt-8">
          <p className="text-2xl font-semibold ">
            Packaging Type <span className="text-red-600">*</span>
          </p>
          <select
            className={`border w-full h-[40px] rounded-[4px] ${
              errors.package && "border-red-500"
            }     border-blue-600 px-3`}
            onChange={onChange}
            onBlur={handleFocus}
            placeholder="pick"
            name="package"
            id=""
            value={productDetails.package}
          >
            <option value=""></option>
            <option value="piece">piece</option>
            <option value="kg">kg</option>
            <option value="ton">Ton</option>
            <option value="carton">carton</option>
            <option value="box">box</option>
            <option value="sack">sack</option>
          </select>
          {errors.package && (
            <p className="text-red-600">Please choose package type</p>
          )}
        </div>
        <div className="mt-8">
          <p className="text-2xl font-semibold ">
            Category <span className="text-red-600">*</span>
          </p>
          <select
            className={`border w-full h-[40px] rounded-[4px] ${
              errors.category && "border-red-500"
            }     border-blue-600 px-3`}
            onChange={onChange}
            onBlur={handleFocus}
            placeholder="pick"
            name="category"
            id=""
            value={productDetails.category}
          >
            <option value=""></option>
            <option value="jewerely">jewerely</option>
            <option value="electronics">electronics</option>
            <option value="kids">kids</option>
            <option value="men's">men's</option>
          </select>
          {errors.category && (
            <p className="text-red-600">Please choose category</p>
          )}
        </div>
        
        <button
          className="bg-green-600 text-white rounded-3xl text-xl p-3 w-[120px] h-[50px] mt-5"
          
        >
          {/* {isLoading ? "Submiting" :"Submit"} */} Submit
        </button>
      </form>
    </div>
  );
};

export default StepOne;
