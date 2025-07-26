import React from "react";

const FooterFormulir = () => {
  return (
    <footer className="text-center text-sm text-gray-600 mt-10 px-4">
      <p>
        Formulir ini milik ol SMKN 2 KETAPANG dalam naungan Kementerian
        Pendidikan dan Kebudayaan Indonesia.
        <br />
        <a
          href="https://www.smkn2ketapang.sch.id/kontak/"
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Hubungi pemilik formulir
        </a>
      </p>
      <p className="mt-2 text-gray-500 font-semibold">
        &copy; {new Date().getFullYear()} SMKN 2 KETAPANG. All rights reserved.
      </p>
    </footer>
  );
};

export default FooterFormulir;
