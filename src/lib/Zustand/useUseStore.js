import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  kelas: null,
  mapel: null,
  kegiatan: null,
  web: null,
  setKelas: (kelas) => set({ kelas }),
  setMapel: (mapel) => set({ mapel }),
  setKegiatan: (kegiatan) => set({ kegiatan }),
  setWeb: (web) => set({ web }),

  setUser: (user) => set({ user }),
}));

export default useUserStore;
