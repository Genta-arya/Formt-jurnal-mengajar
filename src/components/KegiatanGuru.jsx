import React from "react";

const KegiatanGuru = ({
  formData,
  handleCheckboxChange,
  refs,
  handleChange,
  errors,
}) => {
  return (
    <>
      <label className="font-semibold">
        Kegiatan Guru <span className="text-red-500">*</span>
      </label>
      <div className="grid lg:grid-cols-2 gap-2 ">
        {[
          "MENGISI MATERI",
          "MENGISI TUGAS",
          "PRAKTIK",
          "KUNJUNGAN INDUSTRI",
          "KUIS",
          "MEMUTARKAN VIDEO PEMBELAJARAN",
          "MEMBUAT PROYEK",
          "Lainnya",
        ].map((keg) => (
          <label className="border-b" key={keg}>
            <input
              className="mr-3 "
              type="checkbox"
              name="kegiatan"
              value={keg}
              checked={formData.kegiatan.includes(keg)}
              onChange={handleCheckboxChange}
            />{" "}
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
          className={`w-full border p-2 rounded ${
            errors.lainnyaKegiatan ? "border-red-500" : ""
          }`}
        />
      )}
    </>
  );
};

export default KegiatanGuru;
