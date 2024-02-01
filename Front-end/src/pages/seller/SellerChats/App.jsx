import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import Aos from "aos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./pages/seller/Dashboard";
import Login from "./pages/Login";
import { useDataLayerValue } from "./context/Datalayer";
import UserSignup from "./pages/UserSignup";
import SellerLogin from "./pages/seller/SellerLogin";
import SellerRegister from "./pages/seller/SellerRegister";
import Products from "./pages/seller/Products";
import SellerChat from "./pages/seller/SellerChats/SellerChat";
function App() {
  useEffect(() => {
    Aos.init();

    
  });
  const queryClient = new QueryClient();
  const [{user,seller}]=useDataLayerValue()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />}></Route>
            </Route>
            <Route path="/seller/dashboard" element={seller ? <Dashboard />:<SellerLogin />} ></Route>
            <Route path="/seller/dashboard" element={seller ? <SellerChat />:<SellerLogin />} ></Route>
            <Route path="/seller/register" element={<SellerRegister />}></Route>
            <Route path="/seller/dashboard/products" element={<Products />}></Route>
            <Route path="/user/login" element={!user && <Login />} ></Route>
            <Route path="/user/signup" element={<UserSignup />} ></Route>
          </Routes>
         
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
