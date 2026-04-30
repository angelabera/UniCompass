import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AppState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  savedColleges: any[];
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  setSavedColleges: (colleges: any[]) => void;
  addSavedCollege: (college: any) => void;
  removeSavedCollege: (collegeId: string) => void;
  initializeAuth: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  savedColleges: [],
  setAuth: (token, user) => {
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
    set({ token: null, user: null, isAuthenticated: false, savedColleges: [] });
  },
  setSavedColleges: (colleges) => set({ savedColleges: colleges }),
  addSavedCollege: (college) => set((state) => ({ savedColleges: [...state.savedColleges, college] })),
  removeSavedCollege: (collegeId) => set((state) => ({
    savedColleges: state.savedColleges.filter((c) => c.id !== collegeId)
  })),
  initializeAuth: () => {
    const token = Cookies.get('token');
    const userStr = Cookies.get('user');
    if (token && userStr) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          set({ token, user: JSON.parse(userStr), isAuthenticated: true });
        } else {
          Cookies.remove('token');
          Cookies.remove('user');
        }
      } catch (e) {
        Cookies.remove('token');
        Cookies.remove('user');
      }
    }
  }
}));
