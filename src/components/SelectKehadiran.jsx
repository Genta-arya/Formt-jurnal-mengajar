import React from "react";

const SelectKehadiran = ({ formData, handleChange, errors }) => {
  return (
    <select
      name="statusKehadiran"
      value={formData.statusKehadiran}
      onChange={handleChange}
      className={`w-full border p-2 rounded ${
        errors.statusKehadiran ? "border-red-500" : ""
      }`}
    >
      <option value="">Pilih</option>
      <option value="Hadir">Hadir</option>
      <option value="Izin">Izin</option>
      <option value="Sakit">Sakit</option>
      <option value="Dinas_Luar">Dinas Luar</option>
    </select>
  );
};

export default SelectKehadiran;
