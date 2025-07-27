import React from "react";
import { motion } from "framer-motion";

const ModalClearConfirm = ({ onConfirm, onCancel }) => {
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
        className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md"
      >
        <h2 className="text-lg font-semibold text-center">
          Konfirmasi
        </h2>
        <p className="text-sm text-center mt-2">
          Apakah Anda yakin ingin mengosongkan seluruh formulir?
        </p>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 w-24 rounded border text-sm hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 w-24 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Lanjutkan
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalClearConfirm;
