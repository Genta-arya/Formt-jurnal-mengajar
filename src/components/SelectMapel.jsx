import React from "react";

const SelectMapel = ({ formData, setFormData, errors, Select, mapel }) => {
  // Buat options berdasarkan nama_mapel
  const options = Array.isArray(mapel)
    ? mapel.map((m) => ({
        value: m.nama_mapel,
        label: m.nama_mapel,
      }))
    : [];

  // Temukan value yang cocok berdasarkan formData
  const selectedValue = options.find(
    (opt) => opt.value === formData.mataPelajaran
  ) || null;

  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={(selected) =>
        setFormData({
          ...formData,
          mataPelajaran: selected?.value || "",
        })
      }
      styles={{
        control: (base) => ({
          ...base,
          borderColor: errors.mataPelajaran ? "red" : base.borderColor,
          boxShadow: "none",
          "&:hover": {
            borderColor: errors.mataPelajaran ? "red" : base.borderColor,
          },
        }),
      }}
      placeholder="Pilih Mata Pelajaran"
      isSearchable
      isClearable
    />
  );
};

export default SelectMapel;
