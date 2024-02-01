import React, { useState } from "react";
import img from '../../assets/Intersect.png'
import { Avatar } from "@mui/material";
import countries from "i18n-iso-countries";
import { Select, MenuItem } from "@mui/material";
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
import { MuiTelInput } from "mui-tel-input";

import styled from "styled-components";
import { useRef } from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { registerSeller } from "../../utils/api";
import { toast } from "react-toastify";
import { useDataLayerValue } from "../../context/Datalayer";
import { useNavigate } from "react-router-dom";

const SellerRegister = () => {
  const[{seller},dispatch]=useDataLayerValue()
  const [selectedCountry, setSelecteCountry] = useState("");
  const selectCountryHandler = (value) => setSelecteCountry(value);
  const [pass2, setPass2] = useState();
  const [value, setValue] = useState();
  const [images, setImage] = useState();
  const [data,setdata]=useState(null)
  const [userDetails, setUserDetails] = useState({
    image: "",
    fname: "",
    lname: "",
    country: "",
    tel: "",
    email: "",
    password: "",
  });

  const regex = {
    fname: /^\w$/,
    lname: /^\w$/,
    tel: /^\+\d{7}(\d{1,8})?$/,
    email: /^([a-z\d\.\-]+)@([a-z\d\-]+)(\.[a-z]{2,5})(\.[a-z]{2,5})?$/,
    password: /^\w\w{8,16}$/,
    confirmPass: userDetails.password,
  };

  const navigate=useNavigate()

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    country: false,
    phone: false,
    email: false,
    password: false,
    matchingPass: false,
  });

  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "ddkwz7odf",
        uploadPreset: "y8naxvg3",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImage(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleFocus = (e) => {
    if (e.target.value === "") {
      setErrors((prev) => ({ ...prev, [e.target.name]: true }));
    }
  };

  const onChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (regex[e.target.name].test(userDetails[e.target.name])) {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };

  const handlePassword = (e) => {
    if (userDetails.password !== e.target.value) {
      setErrors((prev) => ({ ...prev, matchingPass: true }));
    } else {
      setErrors((prev) => ({ ...prev, matchingPass: false }));
    }
  };

  useEffect(() => {
    setUserDetails((prev) => ({ ...prev, tel:value, image: images }));
  }, [images,value]);

  const handleSubmit = () => {
    mutate()
   
  };

  useEffect(()=>{
    console.log(data)
    if(data !=="Email arleady exist"){
        console.log(data)
        dispatch({
            type:"SET_SELLER",
            seller:data
          })

          if(data){

            navigate('/seller/dashboard')
          }

      

          
    }else{

        toast.error('Email arleady exist');
    }

  },[data])






  const {mutate,isLoading}=useMutation({
    mutationFn:()=>registerSeller(userDetails),
    onSuccess:(res)=>{
        setdata(res)
    }





  })






  return (
    <div className="flex">
      <div className="basis-[50%]  from-black  h-full opacity-90 ">
        <img
          src={img}
          className="h-[950px] 2xl:h-full object-cover w-full  relative "
          alt=""
        />
      </div>
      <div className="bg-gray-100 basis-[40%] mt-10 ml-12 rounded-md shadow-2xl h-[900px]">
        <p className="text-blue-700 font-bold mx-6 mt-3">
          Register to become a seller
        </p>
        <div className="items-center mx-[200px] mt-5 text-center">
          <Avatar sx={{ width: "150px", height: "150px" }}>
            {!images && (
              <button
                className="bg-white text-blue-300 p-1 rounded-2xl"
                onClick={() => widgetRef.current?.open()}
              >
                Add image
              </button>
            )}
            {images && (
              <img src={images} alt="profile" className="object-cover" />
            )}
          </Avatar>
        </div>
        <div className="mt-5 mx-[100px]">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <p className="text-blue-700">First Name</p>
            <input
              type="text"
              className="w-[350px] h-[30px] bg-gray-300 text-green-700 rounded-md px-3 "
              name="fname"
              id=""
              required
              value={userDetails.fname}
              onBlur={handleFocus}
              onChange={onChange}
            />
            {errors.fname && (
              <span className="text-red-600">first name can not be empty</span>
            )}
            <p className="text-blue-700 mt-5">Last Name</p>
            <input
              type="text"
              className="w-[350px] h-[30px] bg-gray-300 text-green-700 rounded-md px-3 "
              name="lname"
              id=""
              onBlur={handleFocus}
              value={userDetails.lname}
              onChange={onChange}
              required
            />
            {errors.lname && (
              <span className="text-red-600">last name can not be empty</span>
            )}
            <p className="text-blue-700 mt-5">Country</p>
            <Select
              style={{
                width: "350px",
                height: "30px",
                border: " ",
                background: "#cbd5e1",
              }}
              required
              name="country"
              value={userDetails.country}
              onChange={(e)=>setUserDetails((prev)=>({...prev,country:e.target.value}))}
            >
              {!!countryArr?.length &&
                countryArr.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
            </Select>
            <p className="text-blue-700 mt-5">Phone</p>
            <MuiTelInput
              defaultCountry="US"
              className="w-[350px]  bg-gray-300 rounded-sm"
            //   onChange={(e)=>setUserDetails((prev)=>({...prev,tel:value}))}
            onChange={handleChange} value={value}
            required
            />
            <p className="text-blue-700 mt-5">Email</p>
            <input
              type="email"
              className="w-[350px] h-[30px] bg-gray-300 text-green-700 rounded-md px-3 "
              name="email"
              id=""
              onBlur={handleFocus}
              value={userDetails.email}
              onChange={onChange}
              required
              autoComplete="false"
              
            />
            {errors.email && (
              <span className="text-red-600">Invalid email</span>
            )}
            <p className="text-blue-700 mt-5">Password</p>
            <input
              type="password"
              className="w-[350px] h-[30px] bg-gray-300 text-green-700 rounded-md px-3 "
              name="password"
              id=""
              onBlur={handleFocus}
              value={userDetails.password}
              onChange={onChange}
              required
            />
            {errors.password && (
              <span className="text-red-600">Invalid Password</span>
            )}
            <p className="text-blue-700 mt-5">Confirm Password</p>
            <input
              type="password"
              className="w-[350px] h-[30px] bg-gray-300 text-green-700 rounded-md px-3 "
              name=""
              id=""
              onChange={handlePassword}
              required
            />
            {errors.matchingPass && (
              <span className="text-red-600">Password Not match </span>
            )}
            <div>
              <p className="text-[14px] mt-3 ">
                By clicking Register You agree to{" "}
                <span className="text-green-600 font-bold underline cursor-pointer">
                  Terms and conditions
                </span>
              </p>
              <button disabled={isLoading} className="p-3 w-[250px] bg-slate-600 text-white rounded-2xl mt-6">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
