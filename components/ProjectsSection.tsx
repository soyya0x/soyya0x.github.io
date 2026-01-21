
import React from 'react';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-10 md:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32">
          <h2 className="text-[11px] font-black tracking-[0.5em] text-gray-300 uppercase mb-6">02. 프로젝트 기록</h2>
          <h3 className="text-6xl md:text-8xl font-extrabold outfit tracking-tighter text-gray-900">탐구의 로그.</h3>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {/* Main Work Card */}
          <div className="group relative glass-card p-12 overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-gray-100 shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200" 
                      alt="Physics" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                </div>
                <div className="space-y-10">
                    <div className="flex gap-4">
                        <span className="px-4 py-2 bg-pink-100 rounded-full text-[10px] font-black tracking-widest text-pink-500 uppercase">과학</span>
                        <span className="px-4 py-2 bg-blue-100 rounded-full text-[10px] font-black tracking-widest text-blue-500 uppercase">리더십</span>
                    </div>
                    <h4 className="text-4xl md:text-5xl font-extrabold outfit text-gray-900">물리탐구 실험 프로젝트</h4>
                    <p className="text-xl text-gray-500 font-bold leading-relaxed">
                        이론이 현상이 되는 순간을 기록했습니다. 실험 계획부터 최종 보고서까지, 조장으로서 모든 사유의 과정을 리드했습니다.
                    </p>
                    <button className="cute-button px-10 py-4 rounded-full text-[11px] font-black tracking-widest uppercase text-gray-700">
                        보고서 보기
                    </button>
                </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="relative rounded-[60px] bg-gradient-to-br from-indigo-900 to-gray-900 p-20 md:p-32 overflow-hidden text-center text-white">
             <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#D6E4FF,transparent_70%)]"></div>
             </div>
             <div className="relative z-10 max-w-3xl mx-auto">
                <p className="text-pink-300 font-black tracking-[0.4em] uppercase text-[10px] mb-10">미래 컨셉</p>
                <h3 className="text-4xl md:text-6xl font-extrabold outfit mb-10 tracking-tight">작가를 위한 디지털 아틀리에.</h3>
                <p className="text-xl text-gray-300 font-medium leading-relaxed mb-12">
                   작가와 과학적 토론가들을 위한 디지털 아틀리에를 준비하고 있습니다. 
                   사유가 기술을 통해 흐를 수 있는 새로운 공간을 꿈꿉니다.
                </p>
                <div className="flex justify-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
