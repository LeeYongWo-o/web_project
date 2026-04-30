import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WriteWanted() {
  const navigate = useNavigate();

  
  const [category, setCategory] = useState('디지털/가전');
  const [urgency, setUrgency] = useState('천천히 기다릴게요');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('나눔 요청이 게시판에 등록되었습니다!');
  
    navigate('/wanted');
  };

  return (
    <div className="p-8 flex justify-center bg-[#F8F9FA] min-h-screen" style={{ fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "-0.05em" }}>
      <div className="w-full max-w-2xl bg-white shadow-xl p-10 rounded-[40px] border border-gray-100">
        
        {/* 헤더 */}
        <header className="mb-12 flex items-center gap-4">
          <button 
            onClick={() => navigate('/wanted')} 
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">어떤 물건이 필요한가요?</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* 카테고리 선택 */}
          <section>
            <label className="block text-xl font-bold text-gray-800 mb-4">카테고리 선택</label>
            <div className="flex flex-wrap gap-3">
              {['디지털/가전', '패션/의류', '가구/인테리어', '도서/교육', '기타'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-3 rounded-2xl font-bold transition-all border-2 
                    ${category === cat ? 'border-[#0047FF] bg-[#E8EEFF] text-[#0047FF]' : 'border-gray-100 bg-white text-gray-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* 물품 명칭 입력 */}
          <section>
            <label className="block text-xl font-bold text-gray-800 mb-4">찾으시는 물품 명칭</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-[20px] p-[18px] text-[18px] outline-none focus:border-[#0047FF] transition-all" 
              placeholder="예: 아이가 볼 전집 도서, 사무용 마우스"
              required
            />
          </section>

          {/* 긴급도 선택 */}
          <section>
            <label className="block text-xl font-bold text-gray-800 mb-4">얼마나 급하신가요?</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setUrgency('급해요!')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 
                  ${urgency === '급해요!' ? 'border-[#0047FF] bg-[#E8EEFF] text-[#0047FF]' : 'border-gray-100 bg-white text-gray-400'}`}
              >
                🏃‍♂️ 급해요!
              </button>
              <button
                type="button"
                onClick={() => setUrgency('천천히 기다릴게요')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 
                  ${urgency === '천천히 기다릴게요' ? 'border-[#0047FF] bg-[#E8EEFF] text-[#0047FF]' : 'border-gray-100 bg-white text-gray-400'}`}
              >
                🧸 천천히 기다릴게요
              </button>
            </div>
          </section>

          {/* 상세 내용 입력 */}
          <section>
            <label className="block text-xl font-bold text-gray-800 mb-4">상세 내용 (선택)</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-[20px] p-[18px] text-[18px] h-40 resize-none outline-none focus:border-[#0047FF] transition-all" 
              placeholder="희망하는 상태나 선호하는 수령 위치 등을 자유롭게 적어주세요."
            />
          </section>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-[#0047FF] text-white py-6 rounded-[28px] text-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              요청 게시글 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteWanted;