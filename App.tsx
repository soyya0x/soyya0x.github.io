
import React, { useState, useCallback, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { AuthScreen } from './components/AuthScreen';
import { CommunityBoard } from './components/CommunityBoard';
import { AdminDashboard } from './components/AdminDashboard';
import { getSupabase } from './supabaseClient';

const COLOR_PRESETS = [
  { name: 'Midnight', accent: '#38bdf8', theme: 'midnight' },
  { name: 'Forest', accent: '#10b981', theme: 'forest' },
  { name: 'Sunset', accent: '#fb923c', theme: 'sunset' },
  { name: 'Sakura', accent: '#FFD6E8', theme: 'sakura' },
];

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [isIntro, setIsIntro] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [viewMode, setViewMode] = useState<'portfolio' | 'board' | 'admin'>('portfolio');

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      setIsCheckingAuth(false);
      return;
    }

    const initSession = async () => {
      try {
        const { data: { session: currentSession } } = await client.auth.getSession();
        setSession(currentSession);
        if (currentSession?.user) {
          loadTheme(currentSession.user.id);
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initSession();

    const { data: { subscription } } = client.auth.onAuthStateChange((_event: string, session: any) => {
      setSession(session);
      if (session?.user) loadTheme(session.user.id);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const loadTheme = async (userId: string) => {
    const client = getSupabase();
    const { data } = await client.from('user_settings').select('theme_color').eq('user_id', userId).single();
    if (data?.theme_color) {
      const root = document.documentElement;
      root.style.setProperty('--accent-primary', data.theme_color);
      const preset = COLOR_PRESETS.find(p => p.accent.toLowerCase() === data.theme_color.toLowerCase());
      root.setAttribute('data-theme', preset?.theme || 'sakura');
    }
  };

  const handleLogout = async () => {
    const client = getSupabase();
    if (client) {
      await client.auth.signOut();
      setIsIntro(true);
      setViewMode('portfolio');
      document.documentElement.removeAttribute('data-theme');
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-pink-400 rounded-full animate-spin mb-6"></div>
        <p className="text-[9px] font-black tracking-[0.5em] text-gray-400 uppercase animate-pulse">Syncing</p>
      </div>
    );
  }

  if (!session) return <AuthScreen />;

  if (viewMode === 'board') return <CommunityBoard onBack={() => setViewMode('portfolio')} user={session.user} />;
  if (viewMode === 'admin') return <AdminDashboard onBack={() => setViewMode('portfolio')} user={session.user} />;

  if (isIntro) {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-white flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <iframe src='https://my.spline.design/r4xbot-MqNGxa250PdJMPntKZzq1hPF/' frameBorder='0' width='100%' height='100%' title="Spline Robot"></iframe>
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-between py-16 px-10 text-gray-800">
          <div className="text-center">
            <p className="text-[10px] font-extrabold tracking-[0.6em] opacity-40 uppercase mb-3">SYSTEMS ONLINE</p>
            <h2 className="text-3xl font-black outfit tracking-tight">YUMIN SONG</h2>
          </div>
          <div className="text-center w-full max-w-md">
            <h1 className="text-4xl md:text-5xl font-extrabold outfit tracking-tight mb-8">Hi, I'm Yumin.</h1>
            <p className="serif-quote text-xl md:text-2xl opacity-60 mb-12 leading-[2.2]">"확률이 0에 수렴해도 가능성을 <br/> 포기하지 않는 사고 실험형 인간"</p>
            <button onClick={() => setIsIntro(false)} className="cute-button px-14 py-6 text-[13px] font-black tracking-[0.2em] uppercase pointer-events-auto shadow-lg">Start Experience</button>
          </div>
          <div className="text-[10px] opacity-30 font-bold tracking-[0.4em] uppercase">Interact with Robot</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-pink-100">
      <nav className="fixed top-0 w-full z-50 px-10 py-8 flex justify-between items-center">
        <div className="glass-card px-8 py-4 flex items-center gap-8 shadow-sm">
            <span className="text-2xl font-black outfit tracking-tighter">YM</span>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <div className="flex gap-10 text-[11px] font-black tracking-widest opacity-50 uppercase">
              <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
              <a href="#projects" className="hover:opacity-100 transition-opacity">Works</a>
              <button onClick={() => setViewMode('board')} className="hover:opacity-100 transition-opacity">Board</button>
              <button onClick={() => setViewMode('admin')} className="hover:opacity-100 transition-opacity">Admin</button>
              <button onClick={handleLogout} className="hover:opacity-100 transition-opacity">Logout</button>
            </div>
        </div>
      </nav>
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
      <Footer onOpenBoard={() => setViewMode('board')} />
    </div>
  );
};

export default App;
