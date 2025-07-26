import React from "react";
import Lottie from "lottie-react";
import loadingplane from "../assets/Loadingplane.json";

const LoadingSubmit = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="w-80">
        <Lottie animationData={loadingplane} loop={true} />
      </div>
    </div>
  );
};

export default LoadingSubmit;
