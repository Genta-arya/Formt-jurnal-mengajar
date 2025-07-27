import React from "react";
import useUserStore from "../lib/Zustand/useUseStore";

const Header = () => {
  const { web } = useUserStore();

  const hasWeb = Array.isArray(web) && web.length > 0 && web[0] !== null;

  if (!hasWeb) return null;

  return (
    <div>
      <img src={web[0].Banner} alt="Banner"   loading="eager" className="rounded-xl" />
      <div className="bg-white mt-4 items-center border-t-8 border-t-blue-600 p-6 rounded-xl shadow border">
        <div className="flex border-b-2 pb-4 gap-8 items-center">
          <div>
            <h1 className="lg:text-4xl uppercase md:text-2xl text-xl font-bold">
              {web[0].msgWelcome}
            </h1>
            <p className="text-sm uppercase font-semibold mt-4 text-gray-600">
              {web[0].tahun_ajaran}
            </p>
          </div>
        </div>
        <p className="text-red-500 mt-4 font-bold">
          * Menunjukkan Kolom yang wajib diisi
        </p>
      </div>
    </div>
  );
};

export default Header;
