import React from "react";

const SelectKelas = ({ formData, setFormData, errors, Select, kelas }) => {
  // Siapkan options
  const options = Array.isArray(kelas)
    ? kelas.map((u) => ({
        value: u.nama_kelas,
        label: u.nama_kelas,
        email: u.email,
        id: u.id,
      }))
    : [];

  // Cari nilai yang cocok untuk ditampilkan
  const selectedValue = options.find((opt) => opt.value === formData.kelas) || null;

  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={(selected) =>
        setFormData({
          ...formData,
          kelas: selected?.value || "",
          nama_kelas: selected?.label || "",
        })
      }
      styles={{
        control: (base) => ({
          ...base,
          borderColor: errors.kelas ? "red" : base.borderColor,
          boxShadow: "none",
          "&:hover": {
            borderColor: errors.kelas ? "red" : base.borderColor,
          },
        }),
      }}
      placeholder="Pilih Kelas"
      isSearchable
      isClearable
    />
  );
};

export default SelectKelas;
