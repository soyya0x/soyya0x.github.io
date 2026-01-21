
import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-10 md:px-32 py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="inline-block px-5 py-2 glass-card border-pink-200 mb-8">
            <p className="text-[10px] font-black tracking-[0.3em] text-pink-400 uppercase">
                Thoughts & Possibilities
            </p>
        </div>
        
        <h1 className="text-7xl md:text-[10rem] font-black outfit tracking-tighter leading-[0.85] text-gray-900 mb-12">
          Thinking <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">Infinite</span> <br/>
          Steps.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mt-12">
          <div className="lg:col-span-8">
            <p className="serif-quote text-3xl md:text-5xl tracking-tight leading-relaxed text-gray-600 max-w-4xl">
              확률이 0에 수렴해도 가능성을 <br/> 
              포기하지 않는 사고 실험형 인간, 송유민입니다.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
             <div className="w-28 h-28 rounded-3xl glass-card border-blue-200 flex items-center justify-center bg-white/40 mb-10 rotate-12 transition-transform hover:rotate-0 cursor-help">
               <span className="text-xl font-black outfit text-blue-400">0%</span>
             </div>
             <a href="#about" className="group flex items-center gap-4 text-xs font-black tracking-[0.3em] uppercase">
                <span>View More</span>
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                    →
                </div>
             </a>
          </div>
        </div>
      </div>
      
      {/* Abstract cute shapes */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-pink-200 to-blue-200 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
      </div>
    </section>
  );
};
