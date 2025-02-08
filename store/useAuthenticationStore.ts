import { create } from 'zustand';

interface AuthenticationState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthenticationStore = create<AuthenticationState>()((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) =>
    set(() => ({
      isAuthenticated: isAuthenticated,
    })),
}));

export { useAuthenticationStore };
