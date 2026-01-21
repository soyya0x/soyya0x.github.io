
import React from 'react';

interface FooterProps {
  onOpenBoard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBoard }) => {
  return (
    <footer id="contact" className="py-32 px-10 md:px-32 border-t border-gray-50 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
          <div className="max-w-2xl">
            <h2 className="text-7xl md:text-9xl font-black outfit tracking-tighter text-gray-900 mb-12">연락하기.</h2>
            <p className="text-2xl text-gray-400 font-bold max-w-md">사유의 여정에 함께하실 분들의 연락을 기다립니다.</p>
            
            {/* 게시판 위젯 (방명록으로 변경) */}
            <div 
              onClick={onOpenBoard}
              className="mt-16 p-8 glass-card border-pink-100 hover:border-pink-300 transition-all cursor-pointer group max-w-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black tracking-widest text-pink-400 uppercase">GUESTBOOK</span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <h4 className="text-xl font-extrabold outfit text-gray-800 mb-2">방명록</h4>
              <p className="text-sm text-gray-500 font-medium">방명록 작성하러 가기. 클릭하여 전체 화면으로 보기.</p>
            </div>
          </div>
          
          <div className="w-full lg:w-auto space-y-16">
            <div>
                <p className="text-[10px] font-black tracking-[0.5em] text-pink-400 uppercase mb-6">메일 보내기</p>
                <a href="mailto:harmwehae@gmail.com" className="text-3xl md:text-5xl font-black outfit text-gray-800 hover:text-pink-400 transition-colors tracking-tight">
                    harmwehae@gmail.com
                </a>
            </div>
            <div className="flex gap-20">
                <div>
                    <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-6">소셜</p>
                    <div className="flex gap-10">
                        <a href="#" className="text-sm font-black text-gray-800 hover:text-pink-400">Instagram</a>
                        <a href="#" className="text-sm font-black text-gray-800 hover:text-blue-400">Github</a>
                    </div>
                </div>
                <div>
                    <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-6">위치</p>
                    <p className="text-sm font-black text-gray-800 uppercase tracking-tighter">Seoul, KR</p>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-40 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl font-black outfit tracking-tighter">YM.</span>
          <p className="text-[10px] text-gray-300 font-black tracking-[0.4em] uppercase">© 2024 YUMIN SONG. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
