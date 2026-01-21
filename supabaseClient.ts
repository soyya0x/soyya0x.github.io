
import { createClient } from '@supabase/supabase-js';

// --- [고정된 Supabase 정보] ---
const SUPABASE_URL = 'https://dkseienljfshxltvezvp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ObAKwnve5VX_CgApew5HNA_mdHx3b9J';
// -----------------------------

let client: any = null;

/**
 * Supabase 클라이언트를 초기화하고 반환합니다.
 * 싱글톤 패턴을 사용하여 중복 생성을 방지합니다.
 */
export const getSupabase = () => {
  if (client) return client;
  
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error("Supabase 설정값이 누락되었습니다.");
      return null;
    }
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return client;
  } catch (error) {
    console.error("Supabase 초기화 중 치명적 에러 발생:", error);
    return null;
  }
};

// 기본 인스턴스 내보내기
export const supabase = getSupabase();
