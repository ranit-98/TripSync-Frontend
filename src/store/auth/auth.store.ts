import type { IUser } from "@/typescript/interface/api";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IAuthStore {
  isAuthenticated: boolean;
  user: IUser | null;
  clearAuth: () => void;
  setAuthUser: (user: IUser) => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        clearAuth: () => {
          set(
            {
              isAuthenticated: false,
              user: null,
            },
            false,
            "auth/clearAuth"
          );
        },
        setAuthUser: (user) => {
          set(
            {
              isAuthenticated: true,
              user,
            },
            false,
            "auth/setAuthUser"
          );
        },
      }),
      {
        name: "tripsync-auth",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: "TripSync Auth Store",
    }
  )
);
