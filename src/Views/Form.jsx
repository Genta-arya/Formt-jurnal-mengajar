import React, { useState, useRef } from "react";
import { toast } from "sonner";
import Header from "../components/Header";

const JurnalMengajarForm = () => {
  const [formData, setFormData] = useState({
    namaGuru: "",
    tanggalMengajar: "",
    mataPelajaran: "",
    kelas: "",
    jamKe: [],
    statusKehadiran: "",
    materi: "",
    kegiatan: [],
    lainnyaKegiatan: "",
    siswaHadir: "",
    siswaTidakHadir: "",
    buktiFoto: null,
  });

  const [errors, setErrors] = useState({});

  const refs = {
    namaGuru: useRef(),
    tanggalMengajar: useRef(),
    mataPelajaran: useRef(),
    kelas: useRef(),
    jamKe: useRef(),
    statusKehadiran: useRef(),
    materi: useRef(),
    kegiatan: useRef(),
    lainnyaKegiatan: useRef(),
    siswaHadir: useRef(),
    siswaTidakHadir: useRef(),
    buktiFoto: useRef(),
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [name]: [...formData[name], value] });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.namaGuru) newErrors.namaGuru = "Nama guru wajib dipilih.";
    if (!formData.tanggalMengajar)
      newErrors.tanggalMengajar = "Tanggal wajib diisi.";
    if (!formData.mataPelajaran)
      newErrors.mataPelajaran = "Mata pelajaran wajib dipilih.";
    if (!formData.kelas) newErrors.kelas = "Kelas wajib dipilih.";
    if (formData.jamKe.length === 0) newErrors.jamKe = "Pilih jam ke.";
    if (!formData.statusKehadiran)
      newErrors.statusKehadiran = "Status kehadiran wajib dipilih.";
    if (!formData.materi.trim()) newErrors.materi = "Materi wajib diisi.";
    if (formData.kegiatan.length === 0)
      newErrors.kegiatan = "Pilih kegiatan guru.";
    if (
      formData.kegiatan.includes("Lainnya") &&
      !formData.lainnyaKegiatan.trim()
    ) {
      newErrors.lainnyaKegiatan = "Isi kegiatan lainnya.";
    }
    if (!formData.siswaHadir)
      newErrors.siswaHadir = "Jumlah hadir wajib diisi.";
    if (!formData.siswaTidakHadir)
      newErrors.siswaTidakHadir = "Jumlah tidak hadir wajib diisi.";
    if (!formData.buktiFoto) newErrors.buktiFoto = "Upload bukti foto.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.keys(newErrors)[0];
      toast.error(newErrors[firstError]);
      refs[firstError].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs[firstError].current.focus?.();
      return;
    }

    setErrors({});
    const finalKegiatan = [...formData.kegiatan.filter((k) => k !== "Lainnya")];
    if (formData.kegiatan.includes("Lainnya")) {
      finalKegiatan.push(formData.lainnyaKegiatan);
    }

    const finalData = { ...formData, kegiatan: finalKegiatan };
    console.log("SUBMIT:", finalData);
    toast.success("Form berhasil dikirim!");
  };

  const handleClearForm = () => {
    toast.success("Formulir berhasil dikosongkan.");
    setFormData({
      namaGuru: "",
      tanggalMengajar: "",
      mataPelajaran: "",
      kelas: "",
      jamKe: [],
      statusKehadiran: "",
      materi: "",
      kegiatan: [],
      lainnyaKegiatan: "",
      siswaHadir: "",
      siswaTidakHadir: "",
      buktiFoto: null,
    });
    setErrors({});

    // Scroll ke atas
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="">
        <div className="max-w-3xl mx-auto space-y-6">
          <Header />
          {/* Nama Guru */}
          <div
            ref={refs.namaGuru}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">
              Nama Guru <span className="text-red-500">*</span>
            </label>
            <select
              name="namaGuru"
              value={formData.namaGuru}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.namaGuru ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih</option>
              <option value="Pak A">Pak A</option>
              <option value="Bu B">Bu B</option>
            </select>
          </div>

          {/* Tanggal */}
          <div
            ref={refs.tanggalMengajar}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">
              Tanggal Mengajar <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggalMengajar"
              value={formData.tanggalMengajar}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.tanggalMengajar ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Mata Pelajaran */}
          <div
            ref={refs.mataPelajaran}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">Pilih Mata Pelajaran <span className="text-red-500">*</span></label>
            <select
              name="mataPelajaran"
              value={formData.mataPelajaran}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.mataPelajaran ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih</option>
              <option value="Matematika">Matematika</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            </select>
          </div>

          {/* Kelas */}
          <div
            ref={refs.kelas}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">Pilih Kelas <span className="text-red-500">*</span></label>
            <select
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.kelas ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih</option>
              <option value="X RPL">X RPL</option>
              <option value="XI TKJ">XI TKJ</option>
            </select>
          </div>

          {/* Jam Ke */}
          <div
            ref={refs.jamKe}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">Jam Ke <span className="text-red-500">*</span></label>
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((jam) => (
                <label  key={jam} className="flex border-b pb-1 items-center space-x-2">
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
          </div>

          {/* Status Kehadiran */}
          <div
            ref={refs.statusKehadiran}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">Status Kehadiran <span className="text-red-500">*</span></label>
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
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>

          {/* Materi */}
          <div
            ref={refs.materi}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">Materi Pelajaran <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="materi"
              value={formData.materi}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.materi ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Kegiatan Guru */}
          <div
            ref={refs.kegiatan}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">Kegiatan Guru <span className="text-red-500">*</span></label>
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
          </div>

          {/* Jumlah Siswa Hadir */}
          <div
            ref={refs.siswaHadir}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">Jumlah Siswa Hadir <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="siswaHadir"
              value={formData.siswaHadir}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.siswaHadir ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Jumlah Siswa Tidak Hadir */}
          <div
            ref={refs.siswaTidakHadir}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">Jumlah Siswa Tidak Hadir <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="siswaTidakHadir"
              value={formData.siswaTidakHadir}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.siswaTidakHadir ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Bukti Foto */}
          <div
            ref={refs.buktiFoto}
            className="bg-white p-4 rounded-xl shadow border space-y-2"
          >
            <label className="font-semibold text-sm block">
              UPLOAD BUKTI FOTO KBM <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600">
              <strong>Nb:</strong> Bagi yang tidak hadir upload bukti sesuai
              alasan ketidakhadiran
            </p>
            <p className="text-xs text-gray-400">
              Upload maksimum 10 file yang didukung. Maks 1 MB per file.
            </p>
            <label className="inline-flex items-center justify-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 cursor-pointer text-sm font-medium w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3m1-6a4 4 0 00-8 0v4h8V9z"
                />
              </svg>
              Tambahkan file
              <input
                type="file"
                name="buktiFoto"
                multiple
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {errors.buktiFoto && (
              <p className="text-red-500 text-xs mt-1">{errors.buktiFoto}</p>
            )}
          </div>

          {/* Tombol Submit */}
        </div>
        <div className="max-w-3xl bg-[#f4f1ee] mx-auto  mt-4 text-center font-bold items-center flex justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-orange-700 lg:text-base text-sm hover:bg-orange-800 text-white px-6 py-2 rounded shadow"
          >
            Kirim
          </button>

          <button
            onClick={handleClearForm}
            className="text-orange-700 font-bold"
          >
            Kosongkan Formulir
          </button>
        </div>
      </div>
    </div>
  );
};

export default JurnalMengajarForm;
