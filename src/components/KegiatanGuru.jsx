import React from "react";
import useUserStore from "../lib/Zustand/useUseStore";

const KegiatanGuru = ({
  formData,
  handleCheckboxChange,
  refs,
  handleChange,
  errors,
}) => {
  const { kegiatan } = useUserStore();
  if (!kegiatan) return null;
  // Ambil nama kegiatan dari store dan tambahkan "Lainnya"
  const kegiatanList = [
    ...kegiatan.map((item) => item.nama_kegiatan),
    "Lainnya",
  ];


  return (
    <>
      <label className="font-semibold">
        Kegiatan Guru <span className="text-red-500">*</span>
      </label>
      <div className="grid lg:grid-cols-2 gap-2">
        {kegiatanList.map((keg) => (
          <label className="border-b py-1" key={keg}>
            <input
              className="mr-3"
              type="checkbox"
              name="kegiatan"
              value={keg}
              checked={formData.kegiatan.includes(keg)}
              onChange={handleCheckboxChange}
            />
            {keg}
          </label>
        ))}
      </div>

      {formData.kegiatan.includes("Lainnya") && (
        <input
          ref={refs.lainnyaKegiatan}
          type="text"
          name="lainnyaKegiatan"
          placeholder="Tuliskan kegiatan lainnya"
          value={formData.lainnyaKegiatan}
          onChange={handleChange}
          className={`w-full border p-2 mt-2 rounded ${
            errors.lainnyaKegiatan ? "border-red-500" : ""
          }`}
        />
      )}
    </>
  );
};

export default KegiatanGuru;
