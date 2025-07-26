import React from "react";
import Select from "react-select";

const SelectGuru = ({ formData, setFormData, errors, user }) => {
  return (
    <Select
      options={
        Array.isArray(user)
          ? user.map((u , index) => ({
              value: u.name,
              label: `${index + 1}. ${u.name}`,
              email: u.email,
              id: u.id,
            }))
          : []
      }
      value={
        formData.namaGuru
          ? { value: formData.namaGuru, label: formData.namaGuru }
          : null
      }
      onChange={(selectedOption) => {
        setFormData({
          ...formData,
          namaGuru: selectedOption?.value || "",
          user_id: selectedOption?.id || "",
        });
      }}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: errors.namaGuru ? "red" : base.borderColor,
          boxShadow: "none",
          "&:hover": {
            borderColor: errors.namaGuru ? "red" : base.borderColor,
          },
        }),
      }}
      placeholder="Pilih Guru"
      isSearchable
      isClearable
    />
  );
};

export default SelectGuru;
