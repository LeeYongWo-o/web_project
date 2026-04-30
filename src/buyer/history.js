import React, { useState, useEffect } from 'react'; // 💡 useState, useEffect 불러오기
import { useNavigate } from 'react-router-dom';

function History() {
  const navigate = useNavigate();

  //  1. 상태(State) 준비
  // 처음엔 빈 배열([])로 시작하고, 로딩 상태(isLoading)를 true로 둡니다.
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. useEffect: 화면이 처음 켜질 때 딱 한 번만 실행 (빈 배열 [])
  useEffect(() => {
    // 백엔드 서버에 데이터를 요청했다고 가정 (setTimeout으로 1.5초 지연)
    const fetchServerData = setTimeout(() => {
      
      // 1.5초 뒤에 서버에서 이 데이터를 받아왔다고 가정
      const dataFromServer = [
        {
          id: 1, status: '나눔 승인 대기', statusColor: 'bg-[#E9F0FF] text-[#0047FF]',
          title: '빈티지 필름 카메라', donor: '김나눔', date: '2026.02.18',
          img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200', isWaiting: true,
        },
        {
          id: 2, status: '나눔 수령 완료', statusColor: 'bg-gray-100 text-gray-500',
          title: '고성능 노트북', donor: '이기부', date: '2026.01.20',
          img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200', isWaiting: false,
        }
      ];

      setHistory(dataFromServer); // 받아온 데이터를 상태 창고에 쏙 넣음
      setIsLoading(false); // 로딩 끝!
      
    }, 1500); // 1.5초(1500ms) 대기

    // 뒷정리: 혹시 로딩 중에 뒤로가기 누르면 타이머 취소!
    return () => clearTimeout(fetchServerData);
  }, []); // 껍데기 화면이 그려진 직후 딱 1번만 실행됨

  // 신청 취소 함수
  const handleCancel = (id) => {
    if (window.confirm('정말 신청을 취소하시겠습니까?')) {
      const updatedHistory = history.filter((item) => item.id !== id);
      setHistory(updatedHistory); 
    }
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-screen" style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "-0.05em" }}>
      
      {/* 상단 헤더 */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate('/mypage-buyer')} className="hover:bg-gray-100 p-2 rounded-full transition-all">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 className="text-[36px] font-bold text-[#333]">나눔 이용 내역</h1>
      </div>

      {/* 💡 3. 로딩 중일 때와 로딩이 끝났을 때 화면을 다르게 보여줌 */}
      <div className="space-y-6">
        {isLoading ? (
          // 서버에서 데이터 가져오는 1.5초 동안 보여줄 로딩 화면
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <svg className="animate-spin h-10 w-10 text-[#0047FF] mb-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-[20px] font-bold text-[#333]">내역을 불러오는 중입니다...</p>
          </div>
        ) : history.length === 0 ? (
          // 데이터가 0개일 때
          <p className="text-center text-gray-400 py-10 text-[20px]">이용 내역이 없습니다.</p>
        ) : (
          // 데이터가 있을 때 리스트 뿌려주기 (historyData -> history 변수로 변경됨)
          history.map((item) => (
            <div key={item.id} className={`bg-white rounded-[32px] p-8 shadow-sm flex justify-between items-center transition-all ${item.isWaiting ? 'border-2 border-[#0047FF]' : 'border border-gray-100 opacity-70'}`}>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className={`${item.statusColor} px-3 py-1 rounded-lg text-[14px] font-bold mb-2 inline-block`}>{item.status}</span>
                  <h3 className="text-[24px] font-bold text-[#333]">{item.title}</h3>
                  <p className="text-gray-400">기부자: {item.donor} · {item.date}</p>
                </div>
              </div>

              {item.isWaiting ? (
                <button onClick={() => handleCancel(item.id)} className="bg-[#F1F3F5] text-[#666] px-6 py-4 rounded-2xl font-bold text-[18px] active:scale-95 transition-all">
                  신청 취소
                </button>
              ) : (
                <button onClick={() => navigate('/review')} className="bg-[#0047FF] text-white px-6 py-4 rounded-2xl font-bold text-[18px] hover:bg-blue-700 active:scale-95 transition-all">
                  후기 작성
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;