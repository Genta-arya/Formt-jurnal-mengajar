import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  kelas: null,
  mapel: null,
  web: null,
  setKelas: (kelas) => set({ kelas }),
  setMapel: (mapel) => set({ mapel }),
  setWeb: (web) => set({ web }),

  setUser: (user) => set({ user }),
}));

export default useUserStore;
