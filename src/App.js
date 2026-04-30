import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// 기부자 컴포넌트들 불러오기 
import LoginSeller from './auth/login_seller';
import SignupSeller from './auth/signup_seller';
import SellerHome from './seller/seller_home';
import MypageSeller from './seller/mypage_seller'; 
import SellerInput from './seller/input';

// 기존 수요자 컴포넌트들 불러오기
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

// 쉬운 화면 컴포넌트 불러오기
import EasyMainScreen from './buyer/EasyMainScreen'; 

// 홈 화면 컴포넌트
function Home() {
  const navigate = useNavigate();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log("전체화면 에러:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    //  
    <div className="bg-gradient-to-b from-[#E9F0FF] to-[#FFFFFF] min-h-screen flex flex-col w-full p-6 md:p-10 overflow-auto" style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "-0.05em" }}>
      
      {/*  상단 영역: 쉬운 화면 버튼 (우측 정렬) */}
      <div className="w-full flex justify-end shrink-0">
        <button 
          onClick={() => navigate('/easy-main')}
          className="flex items-center gap-2 md:gap-3 bg-white border-4 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-all px-6 py-3 md:px-8 md:py-5 rounded-full shadow-lg group active:scale-95"
        >
          <svg className="w-20 h-20 md:w-30 md:h-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span className="text-[18px] md:text-[26px] font-bold">쉬운 화면 (큰 글씨)</span>
        </button>
      </div>

      {/*  중앙 메인 영역: 남는 공간을 모두 차지 (flex-1) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full py-10">
        
        <h1 onClick={toggleFullScreen} className="font-bold text-[#0047FF] mb-4 text-[42px] md:text-[72px] cursor-pointer text-center leading-tight">
          무료 나눔 플랫폼
        </h1>
        <p className="text-[#666666] mb-10 md:mb-16 font-medium text-[20px] md:text-[32px] text-center">
          화면을 터치해서 시작해주세요
        </p>

        {/*  고정 크기(w-600) 대신 반응형(w-full max-w-[600px]) 적용 */}
        <div className="w-full flex justify-center px-4">
          <button 
            onClick={() => navigate('/login-buyer')} 
            className="w-full max-w-[600px] bg-white rounded-[32px] md:rounded-[48px] shadow-[0_20px_60px_rgba(0,71,255,0.08)] hover:scale-[1.02] hover:shadow-[0_24px_70px_rgba(0,71,255,0.15)] transition-all flex flex-col items-center border border-[#E9F0FF] group py-12 md:py-20"
          >
            <div className="bg-[#E9F0FF] rounded-full flex items-center justify-center group-hover:bg-[#D4E4FF] transition-colors w-32 h-32 md:w-56 md:h-56 mb-8 md:mb-12">
              <svg className="w-16 h-16 md:w-[120px] md:h-[120px]" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            
            <h2 className="font-bold text-[#333333] mb-4 md:mb-6 text-[32px] md:text-[56px]">
              필요한 물품 찾기
            </h2>
            <p className="text-gray-500 text-center leading-tight text-[18px] md:text-[28px]">
              여기를 눌러서<br />도움을 받아보세요
            </p>
          </button>
        </div>
      </div>

      {/*  하단 영역: 기부자 버튼 (우측 정렬) */}
      <div className="w-full flex justify-end shrink-0 mt-auto">
        <button 
          onClick={() => navigate('/login-seller')}
          className="flex items-center gap-2 bg-white border-2 border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E] hover:text-white transition-all px-6 py-3 md:px-8 md:py-4 rounded-[24px] shadow-sm group active:scale-95"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21c0-4.418-3.582-8-8-8s-8 3.582-8 8"></path>
            <circle cx="12" cy="8" r="4"></circle>
          </svg>
          <span className="text-[16px] md:text-[22px] font-bold">기부자로 시작하기</span>
        </button>
      </div>

    </div>
  );
}

// 라우터 연결
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* 기부자 라우터 */}
        <Route path="/login-seller" element={<LoginSeller />} />
        <Route path="/signup-seller" element={<SignupSeller />} />
        <Route path="/seller-home" element={<SellerHome />} />
        <Route path="/mypage-seller" element={<MypageSeller />} />
        <Route path="/seller-input" element={<SellerInput />} />

        {/* 수요자 라우터 */}
        <Route path="/login-buyer" element={<LoginBuyer />} />
        <Route path="/signup-buyer" element={<SignupBuyer />} />
        <Route path="/buyer-main" element={<MainScreen />}  />
        <Route path="/easy-main" element={<EasyMainScreen />} />
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
