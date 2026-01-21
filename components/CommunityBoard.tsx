
import React, { useState, useEffect } from 'react';
import { getSupabase } from '../supabaseClient';

interface Post {
  id: string;
  title: string;
  content: string;
  user_email: string;
  user_id: string;
  created_at: string;
  likes_count: number;
}

interface Comment {
  id: string;
  content: string;
  user_email: string;
  user_id: string;
  created_at: string;
}

export const CommunityBoard: React.FC<{ onBack: () => void; user: any }> = ({ onBack, user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [userLikedPosts, setUserLikedPosts] = useState<Set<string>>(new Set());
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentValue, setEditCommentValue] = useState('');

  const supabase = getSupabase();

  useEffect(() => {
    fetchPosts();
    fetchUserLikes();
  }, [user.id]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (!error) setPosts(data);
    setLoading(false);
  };

  const fetchUserLikes = async () => {
    const { data } = await supabase.from('likes').select('post_id').eq('user_id', user.id);
    if (data) {
      setUserLikedPosts(new Set(data.map(item => item.post_id)));
    }
  };

  const handleCreateOrUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode) {
      const { error } = await supabase.from('posts').update({ title, content }).eq('id', editMode);
      if (!error) {
        if (selectedPost?.id === editMode) {
          setSelectedPost(prev => prev ? { ...prev, title, content } : null);
        }
        setShowEditor(false);
        setEditMode(null);
        setTitle('');
        setContent('');
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from('posts').insert([{
        title, content, user_id: user.id, user_email: user.email
      }]);
      if (!error) {
        setTitle(''); setContent(''); setShowEditor(false); fetchPosts();
      }
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
    
    // 1. API 호출
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    
    if (!error) {
      // 2. UI 즉시 업데이트
      setSelectedPost(null);
      setPosts(prev => prev.filter(p => p.id !== postId));
    } else {
      console.error("Delete error details:", error);
      alert('삭제 권한이 없거나 오류가 발생했습니다.');
    }
  };

  const handleLike = async (postId: string) => {
    const isAlreadyLiked = userLikedPosts.has(postId);
    const nextLikedState = !isAlreadyLiked;
    
    // 1. 좋아요 상태 즉시 반영 (Optimistic)
    const nextLikedSet = new Set(userLikedPosts);
    if (nextLikedState) nextLikedSet.add(postId);
    else nextLikedSet.delete(postId);
    setUserLikedPosts(nextLikedSet);

    // 2. 카운트 즉시 반영
    const change = nextLikedState ? 1 : -1;
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: Math.max(0, (p.likes_count || 0) + change) } : p));
    if (selectedPost?.id === postId) {
      setSelectedPost(prev => prev ? { ...prev, likes_count: Math.max(0, (prev.likes_count || 0) + change) } : null);
    }

    // 3. 서버 요청
    if (isAlreadyLiked) {
      await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', user.id);
    } else {
      await supabase.from('likes').insert([{ post_id: postId, user_id: user.id }]);
    }
  };

  const fetchComments = async (postId: string) => {
    const { data } = await supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true });
    setComments(data || []);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentInput) return;
    const { error } = await supabase.from('comments').insert([{
      post_id: selectedPost.id, user_id: user.id, user_email: user.email, content: commentInput
    }]);
    if (!error) {
      setCommentInput('');
      fetchComments(selectedPost.id);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;
    const { error } = await supabase.from('comments').delete().eq('id', commentId);
    if (!error && selectedPost) fetchComments(selectedPost.id);
  };

  const handleUpdateComment = async (commentId: string) => {
    const { error } = await supabase.from('comments').update({ content: editCommentValue }).eq('id', commentId);
    if (!error && selectedPost) {
      setEditingCommentId(null);
      fetchComments(selectedPost.id);
    }
  };

  const openEditorForEdit = (post: Post) => {
    setEditMode(post.id);
    setTitle(post.title);
    setContent(post.content);
    setShowEditor(true);
  };

  return (
    <div className="min-h-screen bg-white p-8 md:p-16 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-20">
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 hover:text-gray-900 transition-colors">
            ← CLOSE BOARD
          </button>
          <div className="text-right">
             <p className="text-[10px] font-black tracking-[0.5em] text-pink-300 uppercase mb-1">STAY CONNECTED</p>
             <h1 className="text-3xl font-black outfit text-gray-900 tracking-tighter">방명록</h1>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8 pb-4 border-b-2 border-gray-900">
            <h2 className="text-xl font-bold text-gray-800">전체 소식 <span className="text-pink-400 ml-2">{posts.length}</span></h2>
            <button 
                onClick={() => { setEditMode(null); setTitle(''); setContent(''); setShowEditor(true); }}
                className="px-6 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-pink-400 transition-colors rounded-sm shadow-sm"
            >
                글쓰기
            </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-300 font-bold uppercase text-xs tracking-widest animate-pulse">로딩 중...</div>
        ) : (
          <div className="divide-y divide-gray-100 border-b border-gray-100 mb-20">
            <div className="hidden md:flex py-4 px-6 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                <div className="flex-1">제목</div>
                <div className="w-40 text-center">닉네임</div>
                <div className="w-32 text-right">날짜</div>
            </div>
            {posts.map((post) => (
                <div 
                    key={post.id} 
                    className="group flex flex-col md:flex-row md:items-center py-6 px-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => { setSelectedPost(post); fetchComments(post.id); }}
                >
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-800 group-hover:text-pink-500 transition-colors">
                            {post.title}
                            {post.likes_count > 0 && <span className="ml-2 text-xs text-pink-400 font-medium">♥ {post.likes_count}</span>}
                        </h3>
                    </div>
                    <div className="w-40 text-left md:text-center text-sm font-bold text-gray-500">{post.user_email.split('@')[0]}</div>
                    <div className="w-32 text-left md:text-right text-[11px] font-bold text-gray-300">{new Date(post.created_at).toLocaleDateString()}</div>
                </div>
            ))}
          </div>
        )}

        {showEditor && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/10 backdrop-blur-md animate-in zoom-in duration-300">
            <div className="w-full max-w-2xl p-10 bg-white border border-gray-100 shadow-2xl rounded-3xl">
              <h2 className="text-2xl font-black outfit mb-8 text-gray-900 border-b pb-4">{editMode ? '이야기 수정' : '이야기 작성'}</h2>
              <form onSubmit={handleCreateOrUpdatePost} className="space-y-4">
                <input 
                    placeholder="제목"
                    className="w-full px-5 py-4 bg-gray-50 border-none outline-none focus:ring-2 focus:ring-pink-100 text-sm rounded-xl transition-all"
                    value={title} onChange={e => setTitle(e.target.value)} required
                />
                <textarea 
                    placeholder="내용을 입력하세요..."
                    className="w-full px-5 py-4 bg-gray-50 border-none outline-none focus:ring-2 focus:ring-pink-100 h-64 resize-none text-sm rounded-xl transition-all"
                    value={content} onChange={e => setContent(e.target.value)} required
                />
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => { setShowEditor(false); setEditMode(null); }} className="px-8 py-4 text-gray-400 text-[10px] font-black uppercase hover:text-gray-900 transition-colors">취소</button>
                  <button type="submit" className="flex-1 py-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-pink-500 transition-colors">저장하기</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedPost && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-white/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="w-full max-w-4xl h-[90vh] flex flex-col md:flex-row bg-white border border-gray-100 shadow-2xl overflow-hidden rounded-3xl">
              <div className="flex-1 p-10 md:p-14 overflow-y-auto relative bg-white">
                <div className="flex justify-between items-start mb-10">
                  <button onClick={() => setSelectedPost(null)} className="text-[9px] font-black uppercase text-gray-300 hover:text-gray-900 transition-colors">← CLOSE VIEW</button>
                  {user.id === selectedPost.user_id && (
                    <div className="flex gap-4">
                      <button onClick={() => openEditorForEdit(selectedPost)} className="text-[9px] font-black text-blue-400 uppercase hover:underline">Edit</button>
                      <button onClick={() => handleDeletePost(selectedPost.id)} className="text-[9px] font-black text-pink-400 uppercase hover:underline">Delete</button>
                    </div>
                  )}
                </div>
                <div className="mb-8">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedPost.user_email.split('@')[0]} • {new Date(selectedPost.created_at).toLocaleDateString()}</span>
                    <h2 className="text-2xl md:text-3xl font-black outfit text-gray-900 mt-3 leading-tight tracking-tighter">{selectedPost.title}</h2>
                </div>
                <div className="text-gray-600 leading-[2] text-base whitespace-pre-wrap mb-12 py-10 border-y border-gray-50">{selectedPost.content}</div>
                
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleLike(selectedPost.id)}
                        className={`w-12 h-12 flex items-center justify-center rounded-full border border-pink-500 transition-all active:scale-90 shadow-md ${userLikedPosts.has(selectedPost.id) ? 'bg-pink-500 text-white' : 'bg-white text-pink-500'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${userLikedPosts.has(selectedPost.id) ? 'fill-white' : 'fill-pink-500'}`} viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      </button>
                      <span className="text-sm font-black text-pink-500">{selectedPost.likes_count || 0}</span>
                    </div>
                </div>
              </div>

              <div className="w-full md:w-[380px] bg-gray-50 flex flex-col border-l border-gray-100">
                <div className="p-8 border-b border-gray-100 bg-white">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Comments</h4>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {comments.length === 0 ? (
                    <p className="text-[10px] text-center text-gray-300 font-bold py-10 uppercase tracking-widest">첫 댓글을 남겨보세요</p>
                  ) : (
                    comments.map(c => (
                      <div key={c.id} className="group/comment">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black text-gray-800">{c.user_email.split('@')[0]}</span>
                          {user.id === c.user_id && !editingCommentId && (
                            <div className="flex gap-2 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                              <button onClick={() => {setEditingCommentId(c.id); setEditCommentValue(c.content);}} className="text-[8px] font-bold text-blue-400 hover:underline">Edit</button>
                              <button onClick={() => handleDeleteComment(c.id)} className="text-[8px] font-bold text-pink-400 hover:underline">Delete</button>
                            </div>
                          )}
                        </div>
                        {editingCommentId === c.id ? (
                          <div className="space-y-2 bg-white p-3 rounded-xl border border-pink-100 shadow-sm">
                            <textarea 
                                className="w-full p-2 text-sm rounded-lg border-none focus:ring-0 bg-gray-50" 
                                value={editCommentValue} 
                                onChange={e => setEditCommentValue(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <button onClick={() => handleUpdateComment(c.id)} className="flex-1 py-2 bg-gray-900 text-white text-[8px] rounded-lg font-black hover:bg-pink-500">Save</button>
                              <button onClick={() => setEditingCommentId(null)} className="flex-1 py-2 text-gray-400 text-[8px] font-black hover:bg-gray-100 rounded-lg">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600 bg-white p-4 rounded-2xl shadow-sm border border-white leading-relaxed">{c.content}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={handleAddComment} className="p-8 bg-white border-t border-gray-100">
                  <input 
                    placeholder="사유를 남겨주세요..." 
                    className="w-full px-4 py-4 bg-gray-50 border-none outline-none text-sm rounded-xl mb-3 focus:ring-2 focus:ring-pink-100 transition-all" 
                    value={commentInput} 
                    onChange={e => setCommentInput(e.target.value)} 
                    required
                  />
                  <button className="w-full py-4 bg-gray-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-pink-500 transition-colors shadow-md">Post Comment</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
