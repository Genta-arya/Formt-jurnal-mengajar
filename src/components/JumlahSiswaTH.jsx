import React from "react";

const JumlahSiswaTH = ({ formData, handleChange, errors }) => {
  return (
    <div>
      {" "}
      <label className="font-semibold">
        Jumlah Siswa Tidak Hadir <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        inputMode="numeric"
        placeholder="0"
        name="siswaTidakHadir"
        min={0}
        value={formData.siswaTidakHadir}
        onChange={handleChange}
        className={`w-full border p-2 rounded ${
          errors.siswaTidakHadir ? "border-red-500" : ""
        }`}
      />
    </div>
  );
};

export default JumlahSiswaTH;
