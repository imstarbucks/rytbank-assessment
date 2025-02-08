import { create } from 'zustand';

interface BiometricState {
  isCompatible: boolean;
  setIsCompatible: (compatible: boolean) => void;
}

const useBiometricStore = create<BiometricState>()((set) => ({
  isCompatible: false,
  setIsCompatible: (compatible) =>
    set(() => ({
      isCompatible: compatible,
    })),
}));

export { useBiometricStore };
