import React, { useState, useEffect } from 'react'; // 💡 훅 추가!
import { useNavigate } from 'react-router-dom';

function WantedList() {
    const navigate = useNavigate();

    //  1. 상태 창고 만들기: 목록 데이터와 로딩 상태
    const [wantedItems, setWantedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //  2. (화면 켜질 때 서버에서 글 목록 가져오기)
    useEffect(() => {
        // 실제로는 axios.get('/api/wanted') 로 가져올 부분 (1초 지연 흉내)
        const fetchItems = setTimeout(() => {
            setWantedItems([
                { id: 1, status: '급해요!', statusColor: 'bg-orange-100 text-orange-600', time: '30분 전', title: '전공 서적 (컴퓨터 공학)', desc: '자료구조나 알고리즘 관련 전공 서적 구합니다. 상태 상관없이 공부용으로 필요해요!', user: '익명요청자', emoji: '👤', isCompleted: false },
                { id: 2, status: '기다려요', statusColor: 'bg-green-100 text-green-600', time: '2시간 전', title: '아이 유모차', desc: '둘째가 태어나서 유모차가 하나 더 필요하게 되었습니다. 나눔 주시면 감사히 잘 쓰겠습니다.', user: '초보맘', emoji: '👶', isCompleted: false },
                { id: 3, status: '나눔 완료', statusColor: 'bg-gray-100 text-gray-500', time: '어제', title: '안쓰시는 멀티탭', desc: '방 구조를 옮기는데 멀티탭이 부족하네요. 3구 이상이면 좋겠습니다!', user: '자취생A', emoji: '', isCompleted: true }
            ]);
            setIsLoading(false); // 데이터 다 가져왔으니 로딩 끝!
        }, 1000);

        return () => clearTimeout(fetchItems); // 뒷정리
    }, []);

    //  3. 버튼 동작 (나눔해주기 클릭 시 실행)
    const handleDonateClick = (itemId) => {
        if (window.confirm("이 분에게 나눔을 시작하시겠습니까?")) {
            // 선택된 항목의 isCompleted를 true로 바꿔서 새로운 리스트를 만듦
            const updatedItems = wantedItems.map(item =>
                item.id === itemId ? { ...item, isCompleted: true, status: '나눔 완료', statusColor: 'bg-gray-100 text-gray-500' } : item
            );
            setWantedItems(updatedItems); // 바뀐 리스트로 상태 업데이트!
            alert("나눔 매칭이 완료되었습니다!");
        }
    };

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
                    <h1 className="text-[36px] font-bold text-[#333]">나눔 요청 게시판</h1>
                </div>

                <button onClick={() => navigate('/write-wanted')} className="bg-[#0047FF] text-white px-8 py-4 rounded-[20px] flex items-center gap-3 text-[20px] font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all hover:bg-blue-700">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    물품 요청하기
                </button>
            </div>

            {/* 안내 문구 */}
            <div className="bg-blue-50 p-6 rounded-[24px] mb-10 flex items-center gap-4 border border-blue-100">
                <span className="text-[30px]">💡</span>
                <p className="text-blue-700 text-[18px] font-medium">
                    찾으시는 물품이 없나요? 요청 게시판에 남겨주시면 이웃들이 확인 후 나눔을 시작할 수 있어요!
                </p>
            </div>

            {/*  4. 로딩 중일 때와 데이터가 떴을 때 화면 다르게 보여주기 */}
            {isLoading ? (
                // 로딩 애니메이션
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <svg className="animate-spin h-10 w-10 text-[#0047FF] mb-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-[20px] font-bold text-[#333]">게시글을 불러오는 중입니다...</p>
                </div>
            ) : (
                // 요청 카드 그리드 (wantedItems 상태 렌더링)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wantedItems.map((item) => (
                        <div key={item.id} className={`bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 transition-all active:scale-[0.98] ${item.isCompleted ? 'opacity-80' : ''}`}>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`${item.statusColor} px-4 py-1 rounded-full font-bold text-[14px]`}>{item.status}</span>
                                <span className="text-gray-400 text-[16px]">{item.time}</span>
                            </div>

                            <h3 className="text-[26px] font-bold text-[#333] mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-[18px] mb-6 leading-relaxed">{item.desc}</p>

                            <div className="flex justify-between items-center border-t pt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[20px]">{item.emoji}</div>
                                    <span className={`font-bold ${item.isCompleted ? 'text-gray-400' : 'text-gray-700'}`}>{item.user}</span>
                                </div>

                                {/*  상태에 따라 버튼과 완료 표시 변경 */}
                                {item.isCompleted ? (
                                    <span className="bg-gray-100 text-gray-400 px-6 py-2 rounded-xl font-bold">매칭 완료</span>
                                ) : (
                                    <button
                                        onClick={() => handleDonateClick(item.id)} // 👈 버튼 클릭 시 함수 연결!
                                        className="text-[#0047FF] font-bold text-[18px] border-2 border-[#0047FF] px-6 py-2 rounded-xl active:bg-blue-50 transition-all"
                                    >
                                        나눔해주기
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WantedList;