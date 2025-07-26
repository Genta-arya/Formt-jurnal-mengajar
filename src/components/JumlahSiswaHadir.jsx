import React from "react";

const JumlahSiswaHadir = ({
    formData,
    handleChange,
    errors
}) => {
  return (
    <div>
      {" "}
      <label className="font-semibold">
        Jumlah Siswa Hadir <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        inputMode="numeric"
        name="siswaHadir"
        value={formData.siswaHadir}
        placeholder="0"
        min={0}
        onChange={handleChange}
        className={`w-full border p-2 rounded ${
          errors.siswaHadir ? "border-red-500" : ""
        }`}
      />
    </div>
  );
};

export default JumlahSiswaHadir;
