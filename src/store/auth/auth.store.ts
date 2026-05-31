import type { IUser } from "@/typescript/interface/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuthStore {
  isAuthenticated: boolean;
  user: IUser | null;
  clearAuth: () => void;
  setAuthUser: (user: IUser) => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      clearAuth: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
      setAuthUser: (user) => {
        set({
          isAuthenticated: true,
          user,
        });
      },
    }),
    {
      name: "tripsync-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
