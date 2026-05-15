import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import LoginSeller from './auth/login_seller';
import SignupSeller from './auth/signup_seller';
import SellerHome from './seller/seller_home';
import MypageSeller from './seller/mypage_seller';
import SellerInput from './seller/input';

import LoginBuyer from './auth/login_buyer';
import SignupBuyer from './auth/signup_buyer';
import MainScreen from './Mainscreen';
import MypageBuyer from './buyer/mypage_buyer';
import WantedList from './buyer/wanted_list';
import WriteWanted from './buyer/write_wanted';
import BuyerEdit from './buyer/buyer_edit';
import Wishlist from './buyer/wishlist';
import History from './buyer/history';
import SettingsBuyer from './buyer/settings_buyer';
import EasyMainScreen from './buyer/EasyMainScreen';
import EasyWantedList from './buyer/EasyWantedList';

function Home() {
  const navigate = useNavigate();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('전체화면 오류:', err);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-[#E9F0FF] to-white min-h-screen flex flex-col w-full p-10 overflow-hidden"
      style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: '-0.05em' }}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1
          onClick={toggleFullScreen}
          className="font-bold text-[#0047FF] mb-4 text-[72px] cursor-pointer text-center leading-tight"
        >
          무료 나눔 플랫폼
        </h1>
        <p className="text-[#666666] mb-16 font-medium text-[32px] text-center">
          화면을 터치해서 시작해주세요
        </p>

        <div className="w-full flex justify-center px-4">
          <button
            onClick={() => navigate('/login-buyer')}
            className="w-full max-w-[600px] bg-white rounded-[48px] shadow-[0_20px_60px_rgba(0,71,255,0.08)] hover:scale-[1.02] hover:shadow-[0_24px_70px_rgba(0,71,255,0.15)] transition-all flex flex-col items-center border border-[#E9F0FF] group py-20"
          >
            <div className="bg-[#E9F0FF] rounded-full flex items-center justify-center group-hover:bg-[#D4E4FF] transition-colors w-56 h-56 mb-12">
              <svg className="w-[120px] h-[120px]" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>

            <h2 className="font-bold text-[#333333] mb-6 text-[56px]">
              필요한 물품 찾기
            </h2>
            <p className="text-gray-500 text-center leading-tight text-[28px]">
              여기를 눌러서<br />도움을 받아보세요
            </p>
          </button>
        </div>
      </div>

      <div className="w-full flex justify-end shrink-0 mt-auto">
        <button
          onClick={() => navigate('/login-seller')}
          className="flex items-center gap-3 bg-white border-2 border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E] hover:text-white transition-all px-8 py-4 rounded-[28px] shadow-sm active:scale-95"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21c0-4.418-3.582-8-8-8s-8 3.582-8 8"></path>
            <circle cx="12" cy="8" r="4"></circle>
          </svg>
          <span className="text-[22px] font-bold">기부자로 시작하기</span>
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login-seller" element={<LoginSeller />} />
        <Route path="/signup-seller" element={<SignupSeller />} />
        <Route path="/seller-home" element={<SellerHome />} />
        <Route path="/mypage-seller" element={<MypageSeller />} />
        <Route path="/seller-input" element={<SellerInput />} />

        <Route path="/login-buyer" element={<LoginBuyer />} />
        <Route path="/signup-buyer" element={<SignupBuyer />} />
        <Route path="/buyer-main" element={<MainScreen />} />
        <Route path="/easy-main" element={<EasyMainScreen />} />
        <Route path="/easy-wanted" element={<EasyWantedList />} />
        <Route path="/mypage-buyer" element={<MypageBuyer />} />
        <Route path="/wanted" element={<WantedList />} />
        <Route path="/Write-Wanted" element={<WriteWanted />} />
        <Route path="/buyer-edit" element={<BuyerEdit />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<SettingsBuyer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
