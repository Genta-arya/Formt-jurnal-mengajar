import React, { useEffect } from "react";
import useUserStore from "../Zustand/useUseStore";
import { getUser } from "../../services/User.servcies";
import { toast } from "sonner";

const useUser = () => {
  const { user, setUser, kelas, setKelas, mapel, setMapel, web, setWeb } =
    useUserStore();
  const [loading, setLoading] = React.useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getUser();
      setUser(response.data.user);
      setKelas(response.data.kelas);
      setMapel(response.data.mapel);
      setWeb(response.data.web);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan pada server.");
    } finally {
  
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  return {
    fetchUser,
    loadingUser: loading,
    user,
    kelas,
    web,
    mapel,
  };
};

export default useUser;
