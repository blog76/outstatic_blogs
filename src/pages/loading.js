import { CirclesWithBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full min-h-screen	 h-1/2 flex flex-col items-center justify-center bg-black">
      <CirclesWithBar
        height="100"
        width="100"
        color="#FFFFFF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

export default Loader;
