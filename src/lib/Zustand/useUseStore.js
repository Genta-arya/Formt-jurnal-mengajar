import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  kelas: null,
  mapel: null,
  setKelas: (kelas) => set({ kelas }),
  setMapel: (mapel) => set({ mapel }),

  setUser: (user) => set({ user }),
}));

export default useUserStore;
