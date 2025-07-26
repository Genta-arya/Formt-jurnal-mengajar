import React from "react";

const Jamke = ({ formData, handleCheckboxChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((jam) => (
        <label key={jam} className="flex border-b pb-1 items-center space-x-2">
          <input
            className="w-5 h-5 mr-2 "
            type="checkbox"
            name="jamKe"
            value={jam}
            checked={formData.jamKe.includes(String(jam))}
            onChange={handleCheckboxChange}
          />
          <span>{jam}</span>
        </label>
      ))}
    </div>
  );
};

export default Jamke;
