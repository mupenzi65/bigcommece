import axios from 'axios'
import { toast } from 'react-toastify'

const api=axios.create({
    baseURL:'http://localhost:3500/api/'
})

export const getAllProducts=async()=>{
    try {
        const response=await api.get('/products')
       return response.data
        
    } catch (error) {
        
        toast.error('Something went wrong')
    }
}
export const getnotifications=async({receiverId})=>{
    try {
        const response=await api.post('/getnotifications',{receiverId})
       return response.data
        
    } catch (error) {
        
        toast.error('Something went wrong')
    }
}

export const login=async(email,password)=>{
    try {
       
        const response=await axios.post("http://localhost:3500/api/user/login",{email,password})
        if(response.data !=='Account not exist ,register instead'){
            return response.data
        }
        toast.error('Account not exist ,register instead')
        
    } catch (error) {
        toast.error('Something went wrong')
    }
}

export const signup=async(fname,email,password)=>{
    try {
        const res=await axios.post("http://localhost:3500/api/user/create" ,{fname,email,password})
      
        return res.data
     

        
    } catch (error) {
        toast.error('Something went wrong')
    }
}

export const registerSeller=async(data)=>{
    console.log(data)
    try {
        const res=await axios.post('http://localhost:3500/api/seller/register',(data))
        return res.data
        
    } catch (error) {
        toast.error("Something went wrong ")
        
    }
}

export const sellerlogin=async(email,password)=>{
    try {
       
        const response=await axios.post("http://localhost:3500/api/seller/login",{email,password})
        console.log(response.data)
        return response.data
    } catch (error) {
        toast.error('Something went wrong')
    }
}

export const createProducts=async(data)=>{
    try {
        const response= await axios.post("http://localhost:3500/api/products/create",{...data})
        
    } catch (error) {
        toast.error('Something went wrong')
    }
}
