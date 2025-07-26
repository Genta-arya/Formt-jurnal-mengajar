import React from "react";
import { motion } from "framer-motion";
import icon from "../assets/Icon.jpeg";

const LoadingData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      {/* Logo diam */}
      <img
        src={icon}
        alt="Logo"
        className="w-40 "
      />

      {/* Bar Loader */}
      <div className="w-48 h-2 bg-gray-300 rounded overflow-hidden">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Teks Loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="text-sm text-gray-600 font-medium"
      >
        Sedang mengambil data...
      </motion.div>
    </div>
  );
};

export default LoadingData;
