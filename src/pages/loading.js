import React from "react";

const Loader = () => {
  return (
    <div className="w-full min-h-screen	 h-1/2 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-cyan-500 border-solid h-24 w-24 mb-4"></div>
      <p className="text-cyan-600 font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
