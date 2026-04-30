import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore'; // Zustand 창고 불러오기

function MypageSeller() {
  const navigate = useNavigate();

  //  창고에서 로그인한 아이디와 로그아웃 함수 꺼내오기
  const userId = useAuthStore((state) => state.userId);
  const logout = useAuthStore((state) => state.logout);

  //  1. 기부자 정보를 담을 상태(State) 정의
  const [sellerInfo, setSellerInfo] = useState({
    region: '',
    phone: '',
    temperature: '',
    donationCount: ''
  });
  
  //  로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);

  //  2. 페이지 진입 시 데이터 불러오기 (useEffect)
  useEffect(() => {
    // 백엔드 API 호출을 시뮬레이션 (1초 지연)
    const fetchSellerData = setTimeout(() => {
      // 서버에서 응답받은 데이터라고 가정
      setSellerInfo({
        region: '서울시 강남구', // 용우님의 실제 데이터에 맞게 수정 가능
        phone: '010-9876-5432',
        temperature: '45.5°C',
        donationCount: '15건'
      });
      setIsLoading(false); // 로딩 완료
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리 (Cleanup)
    return () => clearTimeout(fetchSellerData);
  }, []);

  //  로그아웃 처리 함수
  const handleLogout = () => {
    logout(); // 창고 정보 초기화
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  //  로딩 중일 때 보여줄 UI
  if (isLoading) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen flex flex-col items-center justify-center p-8">
        <svg className="animate-spin h-12 w-12 text-[#22C55E] mb-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-[20px] font-bold text-[#333]">기부자 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-8" style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "-0.05em" }}>
      
      {/* 헤더 영역 */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/seller-home')} className="hover:bg-gray-100 p-2 rounded-full transition-all">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className="text-[36px] font-bold text-[#333]">마이페이지</h1>
        </div>
        
        <button onClick={handleLogout} className="bg-[#6C757D] text-white px-6 py-3 rounded-xl flex items-center gap-2 text-[18px] font-bold active:scale-95 transition-all shadow-sm">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          로그아웃
        </button>
      </div>

      {/* 프로필 정보 카드 */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 mb-10 flex items-center gap-8">
        <div className="w-32 h-32 bg-[#E8F9F1] rounded-full flex items-center justify-center">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M20 21c0-4.418-3.582-8-8-8s-8 3.582-8 8"></path>
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[32px] font-bold text-[#333]">{userId || '기부자'} 님</span>
            <span className="bg-[#E8F9F1] text-[#22C55E] text-[16px] px-4 py-1 rounded-full font-bold">기부자</span>
          </div>
          {/* 상태(sellerInfo)에서 정보 가져오기 */}
          <p className="text-[20px] text-gray-400">{sellerInfo.region} · {sellerInfo.phone}</p>
        </div>
        <button onClick={() => navigate('/seller-edit')} 
          className="ml-auto bg-gray-50 text-gray-600 px-6 py-3 rounded-2xl font-bold border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all">
          정보 수정
        </button>
      </div>

      {/* 활동 요약 카드 */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2">
          <span className="text-gray-400 text-[20px] font-medium">나의 나눔 온도</span>
          {/*  상태(sellerInfo)에서 정보 가져오기 */}
          <span className="text-[40px] font-bold text-[#FF4D4D]">{sellerInfo.temperature}</span>
        </div>
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2">
          <span className="text-gray-400 text-[20px] font-medium">등록한 나눔 물품</span>
          {/*  상태(sellerInfo)에서 정보 가져오기 */}
          <span className="text-[40px] font-bold text-[#22C55E]">{sellerInfo.donationCount}</span>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <div className="space-y-4">
        <button onClick={() => navigate('/manage-items')} className="w-full bg-white p-8 rounded-[28px] flex justify-between items-center transition-all duration-200 border border-[#E5E7EB] hover:bg-gray-50 active:scale-[0.98] active:bg-[#F3F4F6]">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#333]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
                <line x1="9" y1="13" x2="15" y2="13"/>
                <line x1="9" y1="17" x2="15" y2="17"/>
              </svg>
            </div>
            <span className="text-[24px] font-bold text-[#333]">등록 물품 관리</span>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <button onClick={() => navigate('/setting-seller')} className="w-full bg-white p-8 rounded-[28px] flex justify-between items-center transition-all duration-200 border border-[#E5E7EB] hover:bg-gray-50 active:scale-[0.98] active:bg-[#F3F4F6]">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#333]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <span className="text-[24px] font-bold text-[#333]">환경 설정</span>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </div>
  );
}

export default MypageSeller;