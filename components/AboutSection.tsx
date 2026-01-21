
import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32 px-10 md:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-6">
            <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-blue-200 rounded-[60px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative aspect-square rounded-[60px] overflow-hidden glass-card border-white shadow-2xl p-4">
                   <div className="w-full h-full rounded-[45px] overflow-hidden bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=1000" 
                        alt="Abstract" 
                        className="w-full h-full object-cover mix-blend-overlay opacity-80"
                      />
                      <div className="absolute flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
                            <span className="text-3xl">🪐</span>
                        </div>
                        <p className="text-2xl font-black outfit text-gray-800 tracking-tight">이론을 일상으로</p>
                      </div>
                   </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-12">
            <div>
                <p className="text-[11px] font-black tracking-[0.5em] text-pink-400 uppercase mb-6">01. 정체성</p>
                <h2 className="text-5xl md:text-7xl font-extrabold outfit tracking-tighter text-gray-900 leading-tight">
                    사유는 가장 강력한 <br/>
                    도구입니다.
                </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-xl">
              정답보다 과정을, 결과보다 그 이면의 사유를 중요하게 생각합니다. 
              물리학의 정교함과 코딩의 논리성을 결합하여 보이지 않는 가능성을 시각화합니다.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-8 glass-card">
                    <h4 className="font-black outfit text-pink-400 mb-2 uppercase text-[10px] tracking-widest">중점 분야</h4>
                    <p className="font-bold text-gray-700">물리 & 논리</p>
                </div>
                <div className="p-8 glass-card">
                    <h4 className="font-black outfit text-blue-400 mb-2 uppercase text-[10px] tracking-widest">핵심 방법</h4>
                    <p className="font-bold text-gray-700">사고 실험</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
