import React from "react";
import { motion } from "framer-motion";
import { FaHouseLock } from "react-icons/fa6";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const ModalConfirm = ({
    showPassword,
    setShowPassword,
    inputPassword,
    setInputPassword,
    submitFormFinal,
    setShowPasswordModal,
    
   
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md"
      >
        <FaHouseLock
          size={60}
          className="text-center mx-auto mb-4 text-red-500"
        />
        <h2 className="text-xl font-semibold mb-4 text-center">
          Konfirmasi Akses
        </h2>
        <p className="text-sm text-center mb-2">
          Masukkan password untuk mengirim formulir.
        </p>

        {/* Input Password dengan Eye */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Masukkan password"
            required
            className="w-full border p-2 rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowPasswordModal(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            disabled={inputPassword === ""}
            onClick={submitFormFinal}
            className="px-4 py-2 disabled:bg-gray-500 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Kirim
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalConfirm;
