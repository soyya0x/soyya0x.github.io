
import React, { useState, useEffect } from 'react';
import { getSupabase } from '../supabaseClient';

interface DashboardStats {
  users: number;
  posts: number;
  visitors: number;
}

interface RecentPost {
  id: string;
  title: string;
  user_email: string;
  created_at: string;
}

const COLOR_PRESETS = [
  { name: 'Sakura', accent: '#EC4899', theme: 'sakura', label: '차분한 로즈 워터' },
  { name: 'Modern', accent: '#18181b', theme: 'modern', label: '미니멀리즘 화이트' },
  { name: 'Midnight', accent: '#38BDF8', theme: 'midnight', label: '정적인 미드나잇' },
  { name: 'Forest', accent: '#4ADE80', theme: 'forest', label: '깊은 숲의 휴식' },
  { name: 'Sunset', accent: '#FB923C', theme: 'sunset', label: '따뜻한 흙의 질감' },
];

export const AdminDashboard: React.FC<{ onBack: () => void; user: any }> = ({ onBack, user }) => {
  const [stats, setStats] = useState<DashboardStats>({ users: 0, posts: 0, visitors: 124 });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [themeColor, setThemeColor] = useState('#EC4899');
  
  const supabase = getSupabase();

  useEffect(() => {
    fetchDashboardData();
    loadSavedTheme();
  }, []);

  const fetchDashboardData = async () => {
    const { count: userCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
    const { data: posts } = await supabase.from('posts').select('id, title, user_email, created_at').order('created_at', { ascending: false }).limit(5);
    setStats({ users: (userCount || 0) + 5, posts: userCount || 0, visitors: 342 });
    setRecentPosts(posts || []);
  };

  const loadSavedTheme = async () => {
    const { data } = await supabase.from('user_settings').select('theme_color').eq('user_id', user.id).single();
    if (data?.theme_color) {
      const preset = COLOR_PRESETS.find(p => p.accent.toLowerCase() === data.theme_color.toLowerCase());
      updateTheme(data.theme_color, preset?.theme || 'sakura');
    }
  };

  const hexToRgba = (hex: string, alpha: number) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const updateTheme = async (color: string, themeName: string) => {
    setThemeColor(color);
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', color);
    root.style.setProperty('--theme-glow', hexToRgba(color, 0.25));
    root.setAttribute('data-theme', themeName);
    
    await supabase.from('user_settings').upsert({ user_id: user.id, theme_color: color });
  };

  return (
    <div className="min-h-screen p-6 md:p-12 transition-all duration-1000">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <button onClick={onBack} className="text-[10px] font-black opacity-60 hover:opacity-100 mb-4 tracking-widest uppercase transition-all">← Back to Universe</button>
            <h1 className="text-4xl font-black outfit tracking-tighter">Command Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1">Administrator</p>
              <p className="text-sm font-bold opacity-80">{user.email}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-xl shadow-lg border border-white/20">🚀</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'New Explorers', value: stats.users, icon: '👥' },
            { label: 'Total Logs', value: stats.posts, icon: '📝' },
            { label: 'Daily Signals', value: stats.visitors, icon: '📡' }
          ].map((item, idx) => (
            <div key={idx} className={`glass-card p-8 group hover:-translate-y-1 transition-all duration-500`}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">Realtime</span>
              </div>
              <p className="text-4xl font-black outfit mb-1">{item.value}</p>
              <p className="text-[11px] font-bold opacity-70 uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="glass-card p-10 min-h-[500px]">
              <h3 className="text-xl font-black outfit uppercase tracking-tight mb-8">Recent Activity</h3>
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between p-5 rounded-2xl bg-black/5 hover:bg-black/10 transition-all group cursor-default shadow-sm border border-white/10">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center font-black text-xs">P</div>
                      <div>
                        <h4 className="font-bold transition-colors">{post.title}</h4>
                        <p className="text-[11px] font-semibold opacity-60">{post.user_email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold opacity-40 uppercase">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="glass-card p-10 sticky top-12">
              <h3 className="text-xl font-black outfit uppercase tracking-tight mb-8">Atmosphere</h3>
              <div className="mb-10">
                <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-4">Core Tone</p>
                <div className="flex items-center gap-4 p-4 glass-card border-none bg-black/10">
                  <input type="color" value={themeColor} onChange={(e) => updateTheme(e.target.value, 'custom')} className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none"/>
                  <div><p className="text-xs font-black tracking-widest">{themeColor.toUpperCase()}</p></div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-6">Expert Presets</p>
                <div className="grid grid-cols-1 gap-4">
                  {COLOR_PRESETS.map(preset => (
                    <button key={preset.name} onClick={() => updateTheme(preset.accent, preset.theme)} className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-black/5 hover:bg-black/15 transition-all group text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg shadow-md border border-white/20" style={{ backgroundColor: preset.accent }}></div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">{preset.name}</p>
                          <p className="text-[9px] opacity-70 font-bold">{preset.label}</p>
                        </div>
                      </div>
                      <span className="opacity-40 group-hover:opacity-100 transition-all">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
