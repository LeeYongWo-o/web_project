// src/store/useAuthStore.js
import { create } from 'zustand';

// create 함수로 전역 상태(Store)를 만듭니다.
const useAuthStore = create((set) => ({
  isLoggedIn: false, // 처음엔 로그아웃 상태
  userRole: null,    // 'seller'(기부자)인지 'buyer'(수요자)인지 구분
  userId: '',        // 로그인한 유저의 아이디 저장

  // 로그인 시 호출할 함수 (상태를 true로 바꾸고 정보 저장)
  login: (role, id) => set({ isLoggedIn: true, userRole: role, userId: id }),

  // 로그아웃 시 호출할 함수 (모든 상태를 초기화)
  logout: () => set({ isLoggedIn: false, userRole: null, userId: '' }),
}));

export default useAuthStore;