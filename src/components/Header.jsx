import React from "react";
import bg_header from "../assets/Banner.png";
const Header = () => {
  return (
    <div>
      <img src={bg_header} alt="" className="rounded-xl" />
      <div className="bg-white mt-4 items-center border-t-8 border-t-blue-600 p-6  rounded-xl shadow border">
        <div className="flex border-b-2 pb-4 gap-8 items-center">

          <div>
            <h1 className="lg:text-4xl text-xl font-bold">
              JURNAL MENGAJAR GURU SMKN 2 KETAPANG
            </h1>
            <p className="text-sm uppercase font-semibold mt-4 text-gray-600">
              Semester Genap Tahun Pelajaran 2024/2025
            </p>
          </div>
        </div>
        <p className="text-red-500 mt-4 font-bold">* Menunjukkan pertanyaan yang wajib diisi</p>
      </div>
    </div>
  );
};

export default Header;
