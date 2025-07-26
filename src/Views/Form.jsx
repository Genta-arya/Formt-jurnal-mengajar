import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import useUserStore from "../lib/Zustand/useUseStore";
import Select from "react-select";
import SelectGuru from "../components/SelectGuru";
import SelectMapel from "../components/SelectMapel";
import SelectKelas from "../components/SelectKelas";
import { AnimatePresence } from "framer-motion";
import { FaUpload } from "react-icons/fa6";
import Jamke from "../components/Jamke";
import SelectKehadiran from "../components/SelectKehadiran";
import MateriPelajaran from "../components/MateriPelajaran";
import KegiatanGuru from "../components/KegiatanGuru";
import JumlahSiswaHadir from "../components/JumlahSiswaHadir";
import JumlahSiswaTH from "../components/JumlahSiswaTH";
import ModalConfirm from "../components/ModalConfirm";
import { uploadGambar } from "../services/User.servcies";
import LoadingSubmit from "../components/LoadingSubmit";
import { createJurnal } from "../services/Jurnal.services";
const JurnalMengajarForm = () => {
  const { user, kelas, mapel } = useUserStore();
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    namaGuru: "",
    tanggalMengajar: today,
    mataPelajaran: "",
    kelas: "",
    jamKe: [],
    statusKehadiran: "",
    materi: "",
    kegiatan: [],
    siswaHadir: "",
    siswaTidakHadir: "",
    buktiFoto: null,
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
        userId: selectedUser ? selectedUser.id : "",
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
          e.target.value = "";
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast.error("Ukuran gambar maksimal 5MB");
          e.target.value = "";
          return;
        }

        setFormData({ ...formData, [name]: file });
        setPreviewImage(URL.createObjectURL(file));
        setSelectedFile(file);
      }
    } else if (name === "siswaHadir" || name === "siswaTidakHadir") {
      const onlyDigits = /^\d+$/; // hanya angka 0-9, tidak termasuk e, -, .

      if (value === "" || onlyDigits.test(value)) {
        setFormData({ ...formData, [name]: value });
      } else {
        toast.warning(
          "Input hanya boleh angka tanpa simbol, minus, atau huruf."
        );
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
        e.returnValue = "";
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

  const handleSubmit = async (e) => {
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
      !(formData.lainnyaKegiatan || "").trim()
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

    setLoading(true);

    try {
      // Cek apakah buktiFoto sudah berupa URL, skip upload kalau iya
      let fileUrl = formData.buktiFoto;
      const isUrl = typeof fileUrl === "string" && fileUrl.startsWith("http");

      if (!isUrl) {
        const formUpload = new FormData();
        formUpload.append("file", formData.buktiFoto);

        try {
          const upload = await uploadGambar(formUpload);
          fileUrl = upload.data.file_url;
        } catch (err) {
          console.error("Upload gagal:", err);
          toast.error(
            "Gagal mengupload bukti foto ke Server. Silakan coba lagi."
          );
          return; // 🚫 stop proses jika upload gagal
        }
      }

      setFormData((prev) => ({
        ...prev,
        buktiFoto: fileUrl,
      }));

      setErrors({});
      const finalKegiatan = [
        ...formData.kegiatan.filter((k) => k !== "Lainnya"),
      ];
      if (formData.kegiatan.includes("Lainnya")) {
        finalKegiatan.push(formData.lainnyaKegiatan);
      }

      setShowPasswordModal(true);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitFormFinal = async () => {
    if (inputPassword !== "smk2hebat") {
      toast.error("Password salah.");
      return;
    }
    setLoading(true);
    try {
      setIsSubmitting(true);
      setShowPasswordModal(false);
      setInputPassword("");

      const finalKegiatan = [
        ...formData.kegiatan.filter((k) => k !== "Lainnya"),
      ];
      if (formData.kegiatan.includes("Lainnya")) {
        finalKegiatan.push(formData.lainnyaKegiatan);
      }

      localStorage.removeItem(DRAFT_KEY);

      const finalData = { ...formData, kegiatan: finalKegiatan };

      const response = await createJurnal(finalData);
      console.log(response);
      console.log("SUBMIT:", finalData);
      toast.success("Form berhasil dikirim!");
      // kosongkan form
      localStorage.removeItem(DRAFT_KEY);
      setFormData({
        namaGuru: "",
        tanggalMengajar: today,
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setIsSubmitting(false);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      toast.error("Terjadi kesalahan pada server Gagal mengirim formulir.");
    } finally {
      setLoading(false);
    }
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
          <div
            ref={refs.jamKe}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">
              Jam Ke <span className="text-red-500">*</span>
            </label>
            <Jamke
              formData={formData}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div
            ref={refs.statusKehadiran}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <label className="font-semibold">
              Status Kehadiran <span className="text-red-500">*</span>
            </label>
            <SelectKehadiran
              errors={errors}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
          <div
            ref={refs.materi}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <MateriPelajaran
              errors={errors}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
          <div
            ref={refs.kegiatan}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <KegiatanGuru
              formData={formData}
              handleCheckboxChange={handleCheckboxChange}
              refs={refs}
              errors={errors}
              handleChange={handleChange}
            />
          </div>
          <div
            ref={refs.siswaHadir}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <JumlahSiswaHadir
              errors={errors}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
          <div
            ref={refs.siswaTidakHadir}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <JumlahSiswaTH
              errors={errors}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
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
              <FaUpload className="mr-2" />
              Upload
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
                  <div className="flex justify-center">
                    <img
                      src={previewImage}
                      alt="Preview Bukti Foto"
                      className=""
                    />
                  </div>
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

      <AnimatePresence>
        {showPasswordModal && (
          <ModalConfirm
            inputPassword={inputPassword}
            setInputPassword={setInputPassword}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            setShowPasswordModal={setShowPasswordModal}
            submitFormFinal={submitFormFinal}
          />
        )}
      </AnimatePresence>
      {loading && <LoadingSubmit />}
    </div>
  );
};

export default JurnalMengajarForm;
