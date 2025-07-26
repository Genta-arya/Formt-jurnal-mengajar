import React from "react";

const MateriPelajaran = ({
    formData,
    handleChange,
    errors
}) => {
  return (
    <div>
      {" "}
      <label className="font-semibold">
        Materi Pelajaran <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="materi"
        placeholder="Isikan Materi Pelajaran"
        value={formData.materi}
        onChange={handleChange}
        className={`w-full border p-2 rounded ${
          errors.materi ? "border-red-500" : ""
        }`}
      />
    </div>
  );
};

export default MateriPelajaran;
