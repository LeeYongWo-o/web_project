import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
  const navigate = useNavigate();

  // 찜한 물품 데이터 (나중에 DB에서 가져올 부분)
  const [wishItems, setWishItems] = useState([
    {
      id: 1,
      category: '디지털/가전',
      title: '빈티지 필름 카메라',
      location: '서울시 강남구',
      time: '2분 전',
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300',
      isCompleted: false,
    },
    {
      id: 2,
      category: '노트북/PC',
      title: '고성능 노트북',
      location: '서울시 서초구',
      time: '12분 전',
      img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300',
      isCompleted: false,
    },
    {
      id: 3,
      category: '패션/의류',
      title: '빨간색 운동화',
      location: '나눔이 종료된 물품입니다.',
      time: '',
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
      isCompleted: true,
    }
  ]);

  // 하트 클릭 시 목록에서 제거하는 함수 
  const toggleWish = (id) => {
    if (window.confirm("관심 목록에서 삭제할까요?")) {
      setWishItems(wishItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-screen" style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "-0.05em" }}>
      
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/mypage-buyer')} 
            className="hover:bg-gray-100 p-2 rounded-full transition-all"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className="text-[36px] font-bold text-[#333]">관심 목록</h1>
        </div>
        <span className="text-[20px] text-[#0047FF] font-bold">전체 {wishItems.length}개</span>
      </div>

      {/* 목록 리스트 */}
      <div className="space-y-6">
        {wishItems.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center gap-6 transition-all active:scale-[0.98] ${item.isCompleted ? 'opacity-60' : ''}`}
          >
            {/* 이미지 영역 */}
            <div className="w-32 h-32 bg-gray-100 rounded-[24px] overflow-hidden relative shrink-0">
              {item.isCompleted && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold">나눔 완료</div>
              )}
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`${item.isCompleted ? 'text-gray-400' : 'text-[#0047FF]'} text-[16px] font-bold mb-1 block`}>
                    {item.category}
                  </span>
                  <h3 className={`text-[24px] font-bold ${item.isCompleted ? 'text-[#999]' : 'text-[#333]'}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[18px]">
                    {item.location} {item.time && `· ${item.time}`}
                  </p>
                </div>

                {/* 하트 버튼 */}
                <button 
                  onClick={() => toggleWish(item.id)}
                  className="p-2 active:scale-125 transition-transform"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" 
                    fill={item.isCompleted ? "#CCC" : "#FF4D4D"} 
                    stroke={item.isCompleted ? "#CCC" : "#FF4D4D"} 
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {wishItems.length === 0 && (
          <div className="py-20 text-center text-gray-400 text-xl">
            찜한 물품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;