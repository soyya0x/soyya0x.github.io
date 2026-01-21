
import React, { useState } from 'react';
import { getSupabase } from '../supabaseClient';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getSupabase();
    if (!client) {
      setMessage("인증 서버 초기화 실패. 설정을 확인해주세요.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await client.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('인증 이메일이 발송되었습니다. 메일함에서 확인 후 로그인해주세요.');
      }
    } catch (err: any) {
      // 한국어 에러 메시지 대응
      let errorMsg = err.message;
      if (errorMsg.includes('Invalid login credentials')) {
        errorMsg = '이메일 또는 비밀번호가 일치하지 않습니다.';
      } else if (errorMsg.includes('User already registered')) {
        errorMsg = '이미 가입된 이메일입니다.';
      } else if (errorMsg.includes('Password should be at least 6 characters')) {
        errorMsg = '비밀번호는 최소 6자 이상이어야 합니다.';
      }
      setMessage(errorMsg || "오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F8F9FF] p-6">
      <div className="glass-card w-full max-w-md p-10 md:p-14 border-white shadow-2xl bg-white/70 backdrop-blur-3xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-200 to-blue-200 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-inner">
            <span className="text-2xl">🌌</span>
          </div>
          <h2 className="text-4xl font-black outfit tracking-tighter text-gray-900 mb-2">
            {isLogin ? 'YM PORTAL' : 'JOIN SPACE'}
          </h2>
          <p className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase">
            {isLogin ? '사유의 공간으로 다시 오신 것을 환영합니다' : '새로운 여정의 시작을 함께하세요'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">이메일 주소</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-[24px] bg-white border border-gray-50 focus:border-pink-200 outline-none transition-all text-sm shadow-sm"
              placeholder="example@email.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">비밀번호</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-[24px] bg-white border border-gray-50 focus:border-blue-200 outline-none transition-all text-sm shadow-sm"
              placeholder="••••••••"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-2xl text-[11px] font-bold text-center animate-bounce ${message.includes('발송') ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}`}>
              {message}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full py-5 rounded-[24px] bg-gray-900 text-white font-black text-[12px] tracking-[0.3em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg mt-4"
          >
            {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입 시작')}
          </button>
        </form>

        <div className="mt-10 text-center pt-6 border-t border-gray-100">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
          >
            {isLogin ? "아직 회원이 아니신가요? 가입하기" : "이미 계정이 있으신가요? 로그인"}
          </button>
        </div>
      </div>
    </div>
  );
};
