import React, { useEffect } from "react";
import useUserStore from "../Zustand/useUseStore";
import { getUser } from "../../services/User.servcies";
import { toast } from "sonner";

const useUser = () => {
  const { user, setUser, kelas, setKelas, mapel, setMapel } = useUserStore();
  const [loading, setLoading] = React.useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getUser();
      setUser(response.data.user);
      setKelas(response.data.kelas);
      setMapel(response.data.mapel);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Gagal mengambil user");
    } finally {
      // ⏱ delay 3 detik biar loading lebih smooth
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    }
  };

  return {
    fetchUser,
    loadingUser: loading,
    user,
    kelas,
    mapel,
  };
};

export default useUser;
