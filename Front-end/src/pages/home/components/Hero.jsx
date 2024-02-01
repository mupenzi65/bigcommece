import React, { useEffect, useState } from "react";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import warehouse from "../../../assets/warehouse.jpg";
import imageSlide from "../../../utils/data";

const Hero = () => {
  const [currentState, setCurrentState] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (currentState === 2) {
  //       setCurrentState(0);
  //     } else {
  //       setCurrentState(currentState + 1);
  //     }
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [currentState]);

  const goToNext = (currentState) => {
    setCurrentState(currentState);
  };
  return (
    <div className="bg-orange-500 flex h-[300px] w-full">
      <div className="bg-blue-700 w-[700px] flex opacity-80 ">
        <img
          src={warehouse}
          alt=""
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="">

        </div>
        <p className="absolute   text-white text-3xl font-bold ml-[20%] mt-10">
          {imageSlide[currentState].title}
        </p>
        <p className="absolute text-center text-gray-100 font-medium   ml-[20%] mt-[80px]">
          Source featured <br /> Products
        </p>
        <button className="absolute ml-[20%] mt-[140px] w-[120px] h-[30px] bg-orange-700 text-white rounded-lg">
          View all
        </button>
      </div>
      <div className= " md:block hidden  mt-12 ml-[20%]">
        <img
          src={imageSlide[currentState].url}
          data-aos="fade-right"
          data-aos-duration="1500"
          alt=""
          className="w-full h-[200px] object-cover"
        />
        <div className="flex">
          {imageSlide.map((imageSlide, currentState) => (
            <div
              className={`w-4 mt-3 h-4 rounded-full ml-3 bg-white cursor-pointer `}
              key={currentState}
              onClick={() => goToNext(currentState)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
