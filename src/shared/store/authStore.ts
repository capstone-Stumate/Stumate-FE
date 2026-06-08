import { create } from 'zustand';
import type { UpdatePlanInfoPlanLevel } from '@/shared/api/generated/stumateAPI.schemas';

interface AuthUser {
  userId: number;
  username: string;
  name: string;
  planLevel: UpdatePlanInfoPlanLevel;
}

interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
