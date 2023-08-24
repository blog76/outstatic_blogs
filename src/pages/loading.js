import React from "react";

const Loader = () => {
  return (
    <div className="w-full min-h-screen	bg-black opacity-75 h-1/2 flex flex-col items-center justify-center transition duration-900 ease-in-out ">
      <div className="relative rounded-full border-4 border-blue-300 border-solid h-24 w-24 mb-4">
        <div className="absolute top-9 left-9 rounded-full border-4 border-blue-800 border-solid h-5 w-5 mb-11"></div>
      </div>
      {/* <p className="text-[#2f4468] font-semibold">Loading...</p> */}
    </div>
  );
};

export default Loader;
