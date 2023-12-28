import { User } from "@/utils/types";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useUserStore = create(
    persist(
        combine({
            user: undefined as undefined | null | User
        }, (set) => ({
            setUser: (user: User | null) => set({user})
        })),
        {name: 'account'}
    )
) 