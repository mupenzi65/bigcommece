import React, { useEffect, useState } from "react";
import img10 from "../assets/img10.png";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../context/Datalayer";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { login } from "../utils/api";

const UserLogin = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useDataLayerValue();
  const [data, setdata] = useState();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_USER",
        user: data,
      });
      
      navigate("/");
    }
  }, [data]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => login(userDetails.email, userDetails.password),

    onSuccess: (res) => {
      setdata(res);
    },
  });

  return (
    <section>
      <div className="flex">
        <div className="basis-[60%]  ">
          <div className="bg-white md:w-[450px]  h-[500px] mx-auto mt-12 rounded-xl shadow-2xl">
            <img src={logo} alt="" className="w-[120px] h-[120px] mx-10" />
            <div className="mx-10">
              <h2 className="text-gray-600 ">Welcome back!!</h2>
              <p className="text-3xl font-bold mt-3">Sign in</p>
              <form
                action=""
                className="mt-5"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <p>
                  Email <span className="text-red-600">*</span>
                </p>
                <input
                  className="bg-orange-100 w-[350px] rounded-sm px-3 h-[30px] mb-5"
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Enter email"
                  type="email"
                  name=""
                  id=""
                />
                <p>
                  Password <span className="text-red-600 ">*</span>
                </p>
                <input
                  className="bg-orange-100 w-[350px] rounded-sm h-[30px] px-3"
                  type="password"
                  name=""
                  id=""
                  placeholder="password"
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <div>
                  <button
                    className="bg-[#f47458] text-white p-1 text-[12px] w-[100px] rounded-2xl mt-5 mx-[120px]"
                    onClick={() => mutate()}
                  >
                    SIGN IN{" "}
                  </button>
                </div>
                <p className="mt-5 text-center">
                  I don't have an account ?{" "}
                  <span
                    onClick={() => navigate("/user/signup")}
                    className="text-[#f47458] font-semibold"
                  >
                    <a href="">Sign up</a>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={img10} className="h-[600px]" alt="" />
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
