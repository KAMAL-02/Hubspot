//Store for managing authentication state

import { create } from "zustand";

interface AuthStore {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    loading: false,
    setLoading: (loading) => set({ loading }),
}));  