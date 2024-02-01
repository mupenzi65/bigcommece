import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { sellerlogin } from "../../utils/api";
import { useDataLayerValue } from "../../context/Datalayer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import landing from '../../assets/landing.png'
const SellerLogin = () => {
  const [{ user,seller }, dispatch] = useDataLayerValue();
  const [data,setdata]=useState()
  const navigate=useNavigate()
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
  
    if(data){
        dispatch({
            type:"SET_SELLER",
            seller:data
          })
          navigate('/seller/dashboard')

    }

  },[data])

  const { mutate, isLoading } = useMutation({
    mutationFn: () => sellerlogin(userDetails.email, userDetails.password),

    onSuccess: (res) => {setdata(res)},
  });

  return (
    <section>
    <div className="flex">
    <div className="w-full h-full flex   bg-gray-900  from-black relative  ">
      <img
        src={landing}
        className="w-full h-[650px] object-cover mix-blend-overlay "
        alt=""
      />
    </div>
    <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2  ">
    <div className=" ">
    <h2 className="text-white text-4xl">Login</h2>
      <div className="w-[500px] h-[500px] bg-slate-400 opacity-60 rounded-2xl mt-2 ">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="">
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, email: e.target.value }))
              }
              name="email"
              id="email"
              placeholder="Enter your email "
              className="bg-gray-900 font-bold border  mx-3 p-3 border-white rounded-3xl text-xl text-white mt-10 w-[450px] h-[50px] "
            />
          </div>
          <div className="">
            <input
              type="password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              name="pass"
              id="pass"
              placeholder="Enter your password "
              className="bg-gray-900 font-bold border  mx-3 p-3 border-white rounded-3xl text-xl text-white mt-10 w-[450px] h-[50px] "
            />
          </div>
          <div className="flex justify-between">
            <button
              className="text-white text-2xl  font-bold bg-green-800 p-2 w-[120px] rounded-3xl mt-5 ml-5"
              onClick={() => mutate()}
            >
              Login
            </button>
            <p className="text-white font-extrabold text-2xl mt-5 mr-4 hover:underline hover:cursor-pointer">
              Forgot password ?
            </p>
          </div>
          <p className="font-bold mt-5 mx-3">Not a seller yet register <span className="text-red-800 underline cursor-pointer" onClick={()=>navigate('/seller/register')} >Here</span> </p>
        </form>
      </div>
      
    </div>

    </div>

    </div>
   
   
 
</section>

    
  );
};

export default SellerLogin;
