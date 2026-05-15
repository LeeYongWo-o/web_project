import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from './api/client';
import useAuthStore from './store/useAuthStore';

function MainScreen() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const nickname = useAuthStore((state) => state.nickname);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = useMemo(() => [
    { id: 'all', name: '전체' },
    { id: 'digital', name: '디지털/가전' },
    { id: 'fashion', name: '패션/의류' },
    { id: 'furniture', name: '가구/인테리어' },
    { id: 'book', name: '도서' },
  ], []);

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      try {
        setIsLoading(true);
        const data = await fetchPosts();
        const nextItems = data.content || data.posts || data || [];

        if (!ignore) {
          setItems(nextItems);
        }
      } catch (error) {
        if (!ignore) {
          alert(`물품 목록을 불러오지 못했습니다: ${error.message}`);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const currentCategoryName = categories.find((category) => category.id === selectedCategory)?.name;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div
      className="bg-[#F4F6F8] h-screen flex overflow-hidden"
      style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: '-0.02em' }}
    >
      <div className="w-[260px] bg-[#0047FF] flex flex-col shadow-2xl z-10 shrink-0">
        <div className="p-8 border-b border-white/20">
          <h1 className="text-[28px] font-bold text-white leading-tight">나눔<br />플랫폼</h1>
        </div>

        <div className="flex-1 py-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left pl-8 py-5 text-[22px] font-bold transition-all relative ${
                selectedCategory === category.id
                  ? 'bg-[#F4F6F8] text-[#0047FF] rounded-l-[30px] ml-4 w-[calc(100%-16px)] shadow-[-5px_0_15px_rgba(0,0,0,0.1)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-white/20 text-white py-4 rounded-2xl font-bold text-[18px] hover:bg-white/30 active:scale-95 transition-all"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full relative min-w-0">
        <div className="px-10 py-8 flex justify-between items-end border-b border-gray-200 bg-white shadow-sm shrink-0">
          <h2 className="text-[36px] font-bold text-[#333] border-b-4 border-[#0047FF] pb-2 inline-block">
            {currentCategoryName}
          </h2>

          <div className="flex items-center gap-5 pb-2">
            <p className="text-[20px] text-gray-500">
              안녕하세요, <span className="font-bold text-gray-800">{nickname}</span>님
            </p>
            <button
              onClick={() => navigate('/easy-main')}
              className="bg-[#0047FF] text-white px-9 py-5 rounded-[28px] flex items-center gap-4 text-[28px] font-bold active:scale-95 transition-all shadow-xl"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              쉬운모드
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-10 bg-[#F4F6F8]">
          {isLoading ? (
            <div className="h-full flex items-center justify-center text-[28px] font-bold text-gray-500">
              물품을 불러오는 중입니다...
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 pb-24">
              {filteredItems.map((item) => (
                <div
                  key={item.id || item.post_id}
                  className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="h-48 bg-gray-100 relative">
                    <img
                      src={item.image || item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[22px] font-bold text-[#333] mb-2 truncate">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 right-0 w-full bg-white border-t border-gray-200 p-6 flex justify-end gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => navigate('/wanted')}
            className="bg-[#E9F0FF] text-[#0047FF] px-8 py-4 rounded-2xl flex items-center gap-2 text-[20px] font-bold active:scale-95 transition-all"
          >
            나눔 요청
          </button>

          <button
            onClick={() => navigate('/mypage-buyer')}
            className="bg-[#0047FF] text-white px-8 py-4 rounded-2xl flex items-center gap-2 text-[20px] font-bold active:scale-95 transition-all shadow-lg"
          >
            마이페이지
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
