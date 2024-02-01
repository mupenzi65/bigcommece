import React, { useEffect, useState } from 'react'
import img10 from '../assets/img10.png'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useDataLayerValue } from '../context/Datalayer';
import { signup } from '../utils/api';


const UserSignup = () => {
    const navigate=useNavigate()
    const [{ user }, dispatch] = useDataLayerValue();
  const [data,setdata]=useState(null)
  const[pass2,setPass2]=useState()
  const[pass1,setPass1]=useState()
  const[notmacth,setNotmacth]=useState(false)
  const [userDetails, setUserDetails] = useState({
    fname:"",
    email: "",
    password: "",
  });

  useEffect(()=>{

    if(data !=="user arleady exists"){
        dispatch({
            type:"SET_USER",
            user:data
          })
          if(data){

            navigate('/');
          }

          
    }
    else{

        toast.error('user arleady exist')
    }

  },[data])

  const { mutate, isLoading } = useMutation({
    mutationFn: () => signup(userDetails.fname,userDetails.email, userDetails.password),

    onSuccess: (res) => {
        setdata(res)
       
    
    },
  });


useEffect(()=>{
    
    const isMatch=(pass1,pass2)=>{
         if(pass1!==pass2){
            setNotmacth(true)
         }else{
            setNotmacth(false)
            setUserDetails((prev)=>({...prev,password:pass2}))
         }

    }
    isMatch(pass1,pass2)




},[pass2])

  

  return (
    <section>
        <div className="flex">
            <div className="basis-[60%]  ">
                <div className="bg-white w-[450px] h-[590px] mx-auto mt-12 rounded-xl shadow-2xl">
                 <img src={logo} alt="" className='w-[120px] h-[120px] mx-10' />
                 <div className="mx-10">
                    <h2 className='text-gray-600 '>Welcome !!</h2>
                    <p className='text-3xl font-bold mt-3'>Sign Up</p>
                    <form action=""
                    onSubmit={(e)=>{
                        e.preventDefault()
                    }}
                    
                    
                    className='mt-5' >
                     <p>Full Name <span className='text-red-600'>*</span></p>
                     <input className='bg-orange-100 w-[350px] rounded-sm px-3 h-[30px] mb-5' onChange={(e)=>setUserDetails((prev)=>({...prev,fname:e.target.value}))} placeholder='Enter your name' type="text" name="" id="" />
                     <p>Email <span className='text-red-600'>*</span></p>
                     <input className='bg-orange-100 w-[350px] rounded-sm px-3 h-[30px] mb-5' onChange={(e)=>setUserDetails((prev)=>({...prev,email:e.target.value}))} placeholder='Enter email' type="email" name="" id="" />
                     <p>Password <span className='text-red-600 '>*</span></p>
                     <input className='bg-orange-100 w-[350px] rounded-sm px-3 h-[30px] mb-5' onChange={(e)=>setPass1(e.target.value)}  placeholder='Enter password' type="password" name="" id="" />
                     <p>Confirm Password <span className='text-red-600 '>*</span></p>
                     <input className='bg-orange-100 w-[350px] rounded-sm h-[30px] px-3' onChange={(e)=>setPass2(e.target.value)}     placeholder='Confirm password' type="password" name="" id="" />
                    { notmacth && (<p className='text-red-600'>not match</p>)}
                    <div>
                        <button className='bg-[#f47458] text-white p-1 text-[12px] w-[100px] rounded-2xl mt-5 mx-[120px]' onClick={()=>mutate()}  >SIGN UP </button>
                    </div>
                    <p className='mt-5 text-center'>Arleady have an account ? <span onClick={()=>navigate('/user/login')} className='text-[#f47458] font-semibold'><a href="">Sign In</a></span></p>


                    </form>
                 </div>

                </div>

            </div>
            <div className="">
              <img src={img10} className='h-[600px]'  alt="" />    
            </div>


        </div>
    </section>
  )
}

export default UserSignup