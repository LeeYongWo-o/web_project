import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('digital');

  // 카테고리 데이터 분리 (우측 상단 타이틀에 이름 띄우기 위함)
  const categories = [
    { id: 'all', name: '전체' },
    { id: 'digital', name: '디지털/가전' },
    { id: 'fashion', name: '패션/의류' },
    { id: 'furniture', name: '가구/인테리어' },
    { id: 'book', name: '도서' },
  ];

  const allItems = [
    { id: 1, category: 'digital', title: '블루투스 헤드셋', location: '서초동', time: '1시간 전', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
    { id: 2, category: 'digital', title: '사무용 키보드', location: '반포동', time: '3시간 전', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400' },
    { id: 3, category: 'fashion', title: '여름용 반팔 티셔츠', location: '양재동', time: '10분 전', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
    { id: 4, category: 'fashion', title: '아동용 운동화', location: '서초동', time: '2시간 전', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' },
    { id: 5, category: 'furniture', title: '우드 미니 협탁', location: '방배동', time: '5시간 전', img: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=400' },
    { id: 6, category: 'furniture', title: '초록색 1인용 소파', location: '양재동', time: '어제', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
    { id: 7, category: 'book', title: '자기계발 베스트셀러', location: '서초동', time: '30분 전', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' },
    { id: 8, category: 'book', title: '어린이 동화 전집', location: '반포동', time: '4시간 전', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === selectedCategory);

  // 현재 선택된 카테고리의 한국어 이름 찾기
  const currentCategoryName = categories.find(c => c.id === selectedCategory)?.name;

  return (
    //  전체 화면을 꽉 채우고 스크롤을 없앰 (키오스크 특성)
    <div className="bg-[#F4F6F8] h-screen flex overflow-hidden" style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "-0.05em" }}>
      
      {/* 1 좌측 사이드바 (카테고리 메뉴) */}
      <div className="w-[260px] bg-[#0047FF] flex flex-col shadow-2xl z-10">
        {/* 상단 로고 영역 */}
        <div className="p-8 border-b border-white/20">
          <h1 className="text-[28px] font-bold text-white leading-tight">나눔<br/>플랫폼</h1>
        </div>

        {/* 카테고리 리스트 */}
        <div className="flex-1 overflow-y-auto py-6">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left pl-8 py-5 text-[22px] font-bold transition-all relative ${
                selectedCategory === cat.id 
                  ? 'bg-[#F4F6F8] text-[#0047FF] rounded-l-[30px] ml-4 w-[calc(100%-16px)] shadow-[-5px_0_15px_rgba(0,0,0,0.1)]' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 하단 로그아웃 버튼 */}
        <div className="p-6">
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-white/20 text-white py-4 rounded-2xl font-bold text-[18px] hover:bg-white/30 active:scale-95 transition-all"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/*  우측 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* 우측 상단 헤더 (선택된 카테고리 이름 & 유저 정보) */}
        <div className="px-10 py-8 flex justify-between items-end border-b border-gray-200 bg-white shadow-sm z-0">
          <h2 className="text-[36px] font-bold text-[#333] border-b-4 border-[#0047FF] pb-2 inline-block">
            {currentCategoryName}
          </h2>
          <p className="text-[18px] text-gray-500 pb-2">
            안녕하세요, <span className="font-bold text-gray-800">1111</span>님
          </p>
        </div>

        {/* 물품 리스트 그리드 */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#F4F6F8]">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max pb-24">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all cursor-pointer">
                <div className="h-48 bg-gray-100 relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-[22px] font-bold text-[#333] mb-2 truncate">{item.title}</h3>
                  <p className="text-[16px] text-gray-400 font-medium">{item.location} · {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 우측 하단 고정 액션 바 (장바구니/주문내역 같은 느낌) */}
        <div className="absolute bottom-0 right-0 w-full bg-white border-t border-gray-200 p-6 flex justify-end gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => navigate('/wanted')} 
            className="bg-[#E9F0FF] text-[#0047FF] px-8 py-4 rounded-2xl flex items-center gap-2 text-[20px] font-bold active:scale-95 transition-all"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            나눔 요청
          </button>
          
          <button 
            onClick={() => navigate('/mypage-buyer')} 
            className="bg-[#0047FF] text-white px-8 py-4 rounded-2xl flex items-center gap-2 text-[20px] font-bold active:scale-95 transition-all shadow-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            마이페이지
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default MainScreen;