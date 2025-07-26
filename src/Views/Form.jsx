import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import useUserStore from "../lib/Zustand/useUseStore";
import Select from "react-select";
import SelectGuru from "../components/SelectGuru";
import SelectMapel from "../components/SelectMapel";
import SelectKelas from "../components/SelectKelas";

const JurnalMengajarForm = () => {
  const { user, kelas, mapel } = useUserStore();

  const [formData, setFormData] = useState({
    namaGuru: "",
    tanggalMengajar: "",
    mataPelajaran: "",
    kelas: "",
    jamKe: [],
    statusKehadiran: "",
    materi: "",
    kegiatan: [],
    siswaHadir: "",
    siswaTidakHadir: "",
    buktiFoto: null,
    user_id: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [errors, setErrors] = useState({});

  const DRAFT_KEY = "draftJurnalMengajar";

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
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "namaGuru") {
      const selectedUser = Array.isArray(user)
        ? user.find((u) => u.name === value)
        : null;

      setFormData({
        ...formData,
        namaGuru: value,
        user_id: selectedUser ? selectedUser.id : "",
      });
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/gif",
        ];

        if (!allowedTypes.includes(file.type)) {
          toast.error(
            "Hanya file gambar yang diperbolehkan (JPG, PNG, WEBP, dll)"
          );
          e.target.value = ""; // reset file input
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast.error("Ukuran gambar maksimal 5MB");
          e.target.value = ""; // reset file input
          return;
        }

        setFormData({ ...formData, [name]: file });
        setPreviewImage(URL.createObjectURL(file));
        setSelectedFile(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const isFilled = Object.values(formData).some((val) => {
        if (typeof val === "string") return val.trim() !== "";
        if (Array.isArray(val)) return val.length > 0;
        return val !== null && val !== undefined;
      });

      if (isFilled) {
        e.preventDefault();
        e.returnValue = ""; // wajib di-set untuk trigger popup di browser
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formData]);

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
    localStorage.removeItem(DRAFT_KEY);

    const finalData = { ...formData, kegiatan: finalKegiatan };
    console.log("SUBMIT:", finalData);
    toast.success("Form berhasil dikirim!");
  };

  const handleClearForm = () => {
    toast.success("Formulir berhasil dikosongkan.");
    localStorage.removeItem(DRAFT_KEY);
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
    setSelectedFile(null);
    setPreviewImage(null);
    setErrors({});

    // Scroll ke atas
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRemove = () => {
    setFormData({ ...formData, buktiFoto: null });
    setPreviewImage(null);
    fileInputRef.current.value = "";
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

            <SelectGuru
              errors={errors}
              refs={refs}
              user={user}
              setFormData={setFormData}
              formData={formData}
            />
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
            <label className="font-semibold">
              Pilih Mata Pelajaran <span className="text-red-500">*</span>
            </label>
            <SelectMapel
              Select={Select}
              mapel={mapel}
              errors={errors}
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          {/* Kelas */}
          <div
            ref={refs.kelas}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">
              Pilih Kelas <span className="text-red-500">*</span>
            </label>
            <SelectKelas
              Select={Select}
              kelas={kelas}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          </div>

          {/* Jam Ke */}
          <div
            ref={refs.jamKe}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">
              Jam Ke <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((jam) => (
                <label
                  key={jam}
                  className="flex border-b pb-1 items-center space-x-2"
                >
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
            <label className="font-semibold">
              Status Kehadiran <span className="text-red-500">*</span>
            </label>
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
          </div>

          {/* Materi */}
          <div
            ref={refs.materi}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
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

          {/* Kegiatan Guru */}
          <div
            ref={refs.kegiatan}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
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
          </div>

          {/* Jumlah Siswa Hadir */}
          <div
            ref={refs.siswaHadir}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">
              Jumlah Siswa Hadir <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="siswaHadir"
              value={formData.siswaHadir}
              placeholder="0"
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
            <label className="font-semibold">
              Jumlah Siswa Tidak Hadir <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="siswaTidakHadir"
              placeholder="0"
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
            className="bg-white p-4  rounded-xl shadow border space-y-2"
          >
            <label className="font-semibold text-sm block">
              UPLOAD BUKTI FOTO KBM <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600">
              <strong>Nb:</strong> Bagi yang tidak hadir upload bukti sesuai
              alasan ketidakhadiran
            </p>
            <p className="text-xs text-gray-400">
              Upload maksimum 1 file yang didukung. Maks 5 MB.
            </p>
            <label className="inline-flex  items-center justify-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 cursor-pointer text-sm font-medium w-fit">
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
                ref={fileInputRef}
                type="file"
                name="buktiFoto"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {errors.buktiFoto && (
              <p className="text-red-500 text-xs mt-1">{errors.buktiFoto}</p>
            )}

            {previewImage && selectedFile && (
              <div className="mt-4 border-t">
                <div className="">
                  {/* Tombol Hapus */}
                  <div className="flex justify-center items-center mt-4 mb-4">
                    <button
                      type="button"
                      onClick={handleRemove}
                      className=" bg-white rounded-full px-4 shadow p-1 hover:bg-red-500 hover:text-white transition"
                      title="Hapus gambar"
                    >
                      Hapus Gambar
                    </button>
                  </div>

                  {/* Gambar Preview */}
                  <div className="flex justify-center">
                    <img
                      src={previewImage}
                      alt="Preview Bukti Foto"
                      className=""
                    />
                  </div>

                  {/* Info File */}
                  <div className="text-center cursor-default text-sm text-gray-600 mt-2">
                    <p
                      onClick={() => {
                        const newWindow = window.open("", "_blank");

                        if (newWindow) {
                          newWindow.document.write(`
        <html>
          <head>
            <title>Download</title>
          </head>
          <body>
            <a id="downloadLink" href="${previewImage}" download="${selectedFile.name}">Download</a>
            <script>
              const link = document.getElementById('downloadLink');
              link.click();
              setTimeout(() => window.close(), 1000);
            </script>
          </body>
        </html>
      `);
                          newWindow.document.close();
                        }
                      }}
                      className="underline cursor-pointer hover:text-blue-600"
                    >
                      {selectedFile.name}
                    </p>

                    <p>
                      <strong>Ukuran:</strong>{" "}
                      {selectedFile.size >= 1024 * 1024
                        ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                        : `${(selectedFile.size / 1024).toFixed(2)} KB`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tombol Submit */}
        </div>
        <div className="max-w-3xl bg-[#f4f1ee] mx-auto  mt-4 text-center font-bold items-center flex flex-col gap-2 justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-700 w-full lg:text-base text-sm hover:bg-blue-800 text-white px-6 py-2 rounded shadow"
          >
            Submit
          </button>

          <button
            onClick={handleClearForm}
            className="border border-gray-400 rounded text-xs  py-2.5  text-blue-700 w-full hover:opacity-80 font-bold"
          >
            Kosongkan Formulir
          </button>
        </div>
      </div>
    </div>
  );
};

export default JurnalMengajarForm;
