import React, { useState, useEffect } from 'react'; // 💡 훅 불러오기 추가!
import { useNavigate } from 'react-router-dom';

function MypageBuyer() {
    const navigate = useNavigate();

    //  1. 내 정보를 담아둘 상태(기억 장치) 만들기
    const [userInfo, setUserInfo] = useState({
        name: '', type: '', region: '', phone: '', temperature: '', receiveCount: ''
    });
    // 데이터 가져오는 동안 띄울 로딩 상태
    const [isLoading, setIsLoading] = useState(true);

    //  2. 페이지 켜질 때 딱 한 번 실행되는 useEffect (서버에서 내 정보 가져오기)
    useEffect(() => {
        // 실제로는 백엔드 API(예: axios.get('/api/user/me'))를 쓰지만, 지금은 1초 기다리는 걸로 흉내냅니다.
        const fetchUserData = setTimeout(() => {
            
            
            setUserInfo({
                name: '이현우',
                type: '수요자',
                region: '경기도 광명시',
                phone: '010-1234-5678',
                temperature: '38.2°C',
                receiveCount: '5건'
            });
            
            setIsLoading(false); // 로딩 끝!
        }, 1000); // 1초 대기

        return () => clearTimeout(fetchUserData); // 뒷정리
    }, []);

    // 로딩 중일 때는 하얀 화면 대신 예쁜 로딩창 보여주기
    if (isLoading) {
        return (
            <div className="bg-[#F8F9FA] min-h-screen flex flex-col items-center justify-center p-8">
                <svg className="animate-spin h-12 w-12 text-[#0047FF] mb-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-[20px] font-bold text-[#333]">내 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="p-8 bg-[#F8F9FA] min-h-screen" style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "-0.05em" }}>

            {/* 상단 헤더 */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/buyer-main')} className="hover:bg-gray-100 p-2 rounded-full transition-all">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-[36px] font-bold text-[#333]">마이페이지</h1>
                </div>

                <button onClick={() => navigate('/')} className="bg-[#6C757D] text-white px-6 py-3 rounded-xl flex items-center gap-2 text-[18px] font-bold active:scale-95 transition-all shadow-sm">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    로그아웃
                </button>
            </div>

            {/* 프로필 카드 (💡 고정된 글씨 대신 userInfo 상태에서 꺼내 쓰기!) */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 mb-10 flex items-center gap-8">
                <div className="w-32 h-32 bg-[#E9F0FF] rounded-full flex items-center justify-center">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[32px] font-bold text-[#333]">{userInfo.name} 님</span>
                        <span className="bg-[#E9F0FF] text-[#0047FF] text-[16px] px-4 py-1 rounded-full font-bold">{userInfo.type}</span>
                    </div>
                    <p className="text-[20px] text-gray-400">{userInfo.region} · {userInfo.phone}</p>
                </div>

                <button onClick={() => navigate('/buyer-edit')} className="ml-auto bg-gray-50 text-gray-600 px-6 py-3 rounded-2xl font-bold border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all">
                    정보 수정
                </button>
            </div>

            {/* 활동 요약 (💡 고정된 글씨 대신 userInfo 상태에서 꺼내 쓰기!) */}
            <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2">
                    <span className="text-gray-400 text-[20px] font-medium">나의 나눔 온도</span>
                    <span className="text-[40px] font-bold text-[#FF4D4D]">{userInfo.temperature}</span>
                </div>
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2">
                    <span className="text-gray-400 text-[20px] font-medium">받은 나눔</span>
                    <span className="text-[40px] font-bold text-[#0047FF]">{userInfo.receiveCount}</span>
                </div>
            </div>

            {/* 메뉴 리스트 (동일함) */}
            <div className="space-y-4">
                {[
                    { title: '관심 목록', link: '/wishlist', icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path> },
                    { title: '나눔 이용 내역', link: '/history', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></> },
                    { title: '환경 설정', link: '/settings', icon: <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></> }
                ].map((menu, idx) => (
                    <button key={idx} onClick={() => navigate(menu.link)} className="w-full bg-white p-8 rounded-[28px] border border-gray-100 flex justify-between items-center active:scale-[0.99] transition-all hover:bg-gray-50">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#333]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {menu.icon}
                                </svg>
                            </div>
                            <span className="text-[24px] font-bold text-[#333]">{menu.title}</span>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MypageBuyer;