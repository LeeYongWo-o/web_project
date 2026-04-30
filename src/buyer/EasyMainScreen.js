import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EasyMainScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'digital', name: '가전' },
    { id: 'fashion', name: '의류' },
  ];

  const allItems = [
    { id: 1, category: 'digital', title: '블루투스 헤드폰', location: '서초동', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
    { id: 2, category: 'fashion', title: '여름 반팔티', location: '양재동', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800' },
    { id: 3, category: 'digital', title: '사무용 키보드', location: '반포동', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800' },
    { id: 4, category: 'fashion', title: '아이 신발', location: '서초동', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory);

  const visibleSlots = [...filteredItems.slice(0, 4)];
  while (visibleSlots.length < 4) {
    visibleSlots.push(null);
  }

  return (
    <div
      className="bg-[#F8F9FA] h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "-0.02em" }}
    >
      <div className="bg-[#0047FF] text-white px-5 py-3 flex justify-between items-center shadow-md shrink-0">
        <h1 className="text-[28px] font-bold leading-tight">무료 나눔 키오스크</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/buyer-main')}
            className="bg-white text-[#0047FF] px-4 py-2 rounded-[14px] text-[18px] font-bold border-2 border-white active:bg-gray-200"
          >
            일반 화면
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-[#FF4D4D] text-white px-4 py-2 rounded-[14px] text-[18px] font-bold border-2 border-[#FF4D4D] active:bg-red-700"
          >
            처음으로
          </button>
        </div>
      </div>

      <div className="px-4 py-3 bg-white border-b-2 border-gray-200 flex gap-3 shadow-sm shrink-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex-1 py-3 rounded-[18px] text-[24px] font-bold border-2 transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#0047FF] text-white border-[#0047FF] shadow-md'
                : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-hidden">
        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
          {visibleSlots.map((item, index) => (
            item ? (
              <div
                key={item.id}
                className="bg-white rounded-[18px] overflow-hidden shadow-md border-2 border-gray-200 p-3 flex gap-3 active:scale-[0.99] transition-transform h-full min-h-0"
              >
                <div className="w-[112px] h-[112px] self-center bg-gray-100 rounded-[14px] overflow-hidden shrink-0 border-2 border-gray-100 shadow-inner">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center gap-2 py-1">
                  <h3 className="text-[24px] font-bold text-black leading-tight break-keep truncate">
                    {item.title}
                  </h3>
                  <div className="bg-[#F4F6F8] p-2 rounded-[12px]">
                    <p className="text-[18px] text-gray-600 font-bold truncate">
                      위치: <span className="text-[#0047FF]">{item.location}</span>
                    </p>
                    <p className="text-[14px] text-gray-500 mt-1 leading-tight">
                      터치해서 자세한 정보를 확인하세요
                    </p>
                  </div>
                  <button className="w-full bg-[#22C55E] text-white rounded-[12px] text-[20px] font-bold hover:bg-green-600 active:scale-[0.98] transition-all shadow-sm border-b-4 border-green-700 py-2">
                    물건 받기
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={`empty-${index}`}
                className="bg-white/60 rounded-[18px] border-2 border-dashed border-gray-200 h-full min-h-0"
                aria-hidden="true"
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default EasyMainScreen;
