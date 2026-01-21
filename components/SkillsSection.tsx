
import React from 'react';

// Added key to the interface to satisfy React prop requirements and fixed type definition
const CapabilityCard = ({ title, desc, tag, color, icon }: { title: string, desc: string, tag: string, color: string, icon: string, key?: string }) => (
  <div className="group relative p-12 rounded-[50px] h-[550px] flex flex-col justify-between transition-all duration-500 glass-card border-none hover:-translate-y-6 hover:shadow-2xl cursor-default" style={{ background: color }}>
    <div className="relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-white/40 backdrop-blur-md flex items-center justify-center text-2xl mb-12 shadow-inner">
            {icon}
        </div>
        <h3 className="text-4xl font-extrabold outfit tracking-tighter text-gray-800 mb-8">{title}</h3>
        <p className="text-gray-700/80 font-bold leading-relaxed text-lg">{desc}</p>
    </div>
    
    <div className="relative z-10 flex justify-between items-center">
        <span className="text-[12px] font-black outfit text-gray-800/30 uppercase tracking-[0.3em]">{tag}</span>
        <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 transition-transform group-hover:rotate-90">
            <span className="text-2xl font-light">+</span>
        </div>
    </div>
  </div>
);

export const SkillsSection: React.FC = () => {
  const capabilities = [
    { 
        tag: '분야 01', 
        title: '설계와 기획', 
        icon: '🧠',
        desc: '사고 실험을 통해 문제를 정의하고 해결책의 밑그림을 그립니다. 모든 작업의 시작점입니다.', 
        color: 'linear-gradient(180deg, #E8D6FF 0%, #F3EBFF 100%)'
    },
    { 
        tag: '분야 02', 
        title: '디자인 사유', 
        icon: '🎨',
        desc: '복잡한 데이터를 미학적으로 정돈합니다. 눈에 보이지 않는 물리학적 가치를 시각화합니다.', 
        color: 'linear-gradient(180deg, #D6E4FF 0%, #EBF2FF 100%)'
    },
    { 
        tag: '분야 03', 
        title: '기술 구현', 
        icon: '💻',
        desc: '파이썬과 최신 웹 기술을 이용해 사유의 장을 현실로 구현해 나가는 과정입니다.', 
        color: 'linear-gradient(180deg, #FFD6E8 0%, #FFF0F7 100%)'
    }
  ];

  return (
    <section className="py-32 px-10 md:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
                <h2 className="text-[11px] font-black tracking-[0.5em] text-gray-300 uppercase mb-4">핵심 역량</h2>
                <h3 className="text-5xl md:text-7xl font-extrabold outfit tracking-tighter text-gray-900">제가 할 수 있는 일들.</h3>
            </div>
            <p className="text-gray-400 font-bold text-xl max-w-xs">모든 결과는 독창적인 사유에서 시작됩니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {capabilities.map(cap => (
            <CapabilityCard 
              key={cap.title} 
              title={cap.title}
              desc={cap.desc}
              tag={cap.tag}
              color={cap.color}
              icon={cap.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
