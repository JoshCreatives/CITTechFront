import { useLayoutEffect, useState, useEffect } from 'react';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Clock, 
  Share2, 
  MessageCircle,
  ArrowUp,
  Send,
  Edit3,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import supabaseClient from '../services/supabaseClient';
import { useTheme } from '../hooks/useTheme';
import { getDeviceId } from '../utils/deviceFingerprint';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  image_url: string;
  content: any;
  read_time: number;
  comments: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  avatar: string;
  device_id?: string;
  canEdit?: boolean;
  isEditing?: boolean;
  editContent?: string;
}

const BlogPostView = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [deviceId, setDeviceId] = useState<string>('');
  const [postingComment, setPostingComment] = useState(false);
  const { theme } = useTheme();

  const postId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || '1' : '1';

  // Initialize device ID on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = getDeviceId();
      setDeviceId(id);
    }
  }, []);

  const fetchPost = async () => {
    setLoading(true); 
    try {
      const { data, error } = await supabaseClient
        .from("blogs")
        .select()
        .eq("id", postId)
        .single();
      
      if (error) {
        console.error("Error fetching post:", error);
        return;
      }
      
      setPost(data);
      
      // Fetch comments for this post
      await fetchComments();
      
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch post when deviceId is available
  useEffect(() => {
    if (deviceId) {
      fetchPost();
    }
  }, [deviceId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('blog_comments')
        .select('*')
        .eq('blog_id', postId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }
      
      if (data) {
        // Format comments for display
        const formattedComments = data.map(comment => ({
          id: comment.id,
          author: comment.author,
          content: comment.content,
          date: formatDate(comment.created_at),
          likes: comment.likes || 0,
          avatar: comment.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=random`,
          device_id: comment.device_id,
          canEdit: comment.device_id === deviceId,
          isEditing: false,
          editContent: comment.content
        }));
        
        setComments(formattedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Just now';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.content.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentAuthor.trim() || postingComment) return;
    
    setPostingComment(true);
    
    try {
      console.log('Attempting to add comment:', { blog_id: postId, author: commentAuthor, content: newComment, device_id: deviceId });
      
      // Insert comment into Supabase - simplified structure
      const { data, error } = await supabaseClient
        .from('blog_comments')
        .insert({
          blog_id: postId,
          author: commentAuthor,
          content: newComment,
          device_id: deviceId
        })
        .select();
      
      console.log('Insert response:', { data, error });
      
      if (error) {
        console.error('Supabase error adding comment:', error);
        alert(`Error posting comment: ${error.message}. Please check the console for details.`);
        return;
      }
      
      if (data && data.length > 0) {
        const newCommentObj = data[0];
        
        // Add the new comment to the state
        setComments(prevComments => [
          ...prevComments,
          {
            id: newCommentObj.id,
            author: newCommentObj.author,
            content: newCommentObj.content,
            date: 'Just now',
            likes: newCommentObj.likes || 0,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCommentObj.author)}&background=random`,
            device_id: newCommentObj.device_id,
            canEdit: newCommentObj.device_id === deviceId,
            isEditing: false,
            editContent: newCommentObj.content
          }
        ]);
        
        // Clear the form
        setNewComment('');
        setCommentAuthor('');
        
        console.log('Comment added successfully');
      }
    } catch (error) {
      console.error('Unexpected error adding comment:', error);
      alert('Unexpected error posting comment. Please try again.');
    } finally {
      setPostingComment(false);
    }
  };

  const handleEditComment = async (commentId: string, newContent: string) => {
    try {
      // Update comment in Supabase (only if device ID matches)
      const { error } = await supabaseClient
        .from('blog_comments')
        .update({ 
          content: newContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', commentId)
        .eq('device_id', deviceId); // Ensure only the creating device can edit
      
      if (error) {
        console.error('Error updating comment:', error);
        alert('You can only edit your own comments from this device.');
        return false;
      }
      
      // Update local state
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId 
            ? { 
                ...comment, 
                content: newContent, 
                isEditing: false,
                date: 'Just now (edited)'
              }
            : comment
        )
      );
      
      return true;
    } catch (error) {
      console.error('Error updating comment:', error);
      return false;
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      // Delete comment from Supabase (only if device ID matches)
      const { error } = await supabaseClient
        .from('blog_comments')
        .delete()
        .eq('id', commentId)
        .eq('device_id', deviceId); // Ensure only the creating device can delete
      
      if (error) {
        console.error('Error deleting comment:', error);
        alert('You can only delete your own comments from this device.');
        return;
      }
      
      // Update local state
      setComments(prevComments => 
        prevComments.filter(comment => comment.id !== commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const startEditing = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, isEditing: true, editContent: comment.content }
          : comment
      )
    );
  };

  const cancelEditing = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, isEditing: false }
          : comment
      )
    );
  };

  const updateEditContent = (commentId: string, content: string) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, editContent: content }
          : comment
      )
    );
  };

  const saveEdit = async (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment || !comment.editContent?.trim()) return;
    
    const success = await handleEditComment(commentId, comment.editContent);
    if (!success) {
      // Reset editing state if update failed
      cancelEditing(commentId);
    }
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-600 dark:border-maroon-400 mb-4"></div>
            <div className="text-xl text-gray-800 dark:text-gray-200">Fetching post...</div>
          </div>
        </div>
      ) : (
        <>
          {post ? (
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">

              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] md:h-[600px]"
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end z-20">
                  <div className="max-w-7xl mx-auto px-4 w-full pb-16">
                    <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="max-w-3xl"
                    >
                      <span className="inline-flex items-center bg-maroon-600 dark:bg-maroon-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {post.category}
                      </span>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                        {post.title}
                      </h1>
                      <div className="flex flex-wrap items-center text-white/80 gap-4 md:gap-6">
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          <span>{post.read_time || 5} min read</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <motion.a
                      href="/blog"
                      className="inline-flex items-center text-maroon-600 dark:text-white hover:text-maroon-700 dark:hover:text-maroon-500 transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Blog
                    </motion.a>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleShare}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      >
                        <Share2 className="h-5 w-5" />
                        <span className="sr-only">Share</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8 prose prose-lg max-w-none 
                    prose-headings:text-gray-900 dark:prose-headings:text-white 
                    prose-p:text-gray-700 dark:prose-p:text-gray-300 
                    prose-a:text-maroon-600 dark:prose-a:text-maroon-400 
                    prose-strong:text-gray-900 dark:prose-strong:text-white 
                    prose-blockquote:border-l-maroon-600 dark:prose-blockquote:border-l-maroon-400 
                    prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800
                    prose-img:rounded-xl prose-img:shadow-lg">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  {/* Post engagement section */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span>{comments.length} comments</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Share:</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={handleShare}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                          >
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment section */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments ({comments.length})</h3>
                    
                    {/* Add comment form */}
                    <form onSubmit={handleAddComment} className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="author"
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter your name"
                          required
                          disabled={postingComment}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Comment
                        </label>
                        <textarea
                          id="comment"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Share your thoughts..."
                          required
                          disabled={postingComment}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={postingComment}
                        className="inline-flex items-center px-4 py-2 bg-maroon-600 hover:bg-maroon-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {postingComment ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Posting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Post Comment
                          </>
                        )}
                      </button>
                    </form>
                    
                    {/* Comments list or empty state */}
                    {comments.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <MessageCircle className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <h4 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                          No comments yet
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          Be the first to share your thoughts!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {comments.map((comment) => (
                          <div key={comment.id} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-start gap-4">
                              <img
                                src={comment.avatar}
                                alt={comment.author}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {comment.author}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      {comment.date}
                                    </span>
                                    {comment.canEdit && (
                                      <div className="flex gap-2 ml-2">
                                        {comment.isEditing ? (
                                          <>
                                            <button 
                                              onClick={() => saveEdit(comment.id)}
                                              className="text-sm text-green-600 dark:text-green-400 hover:underline"
                                            >
                                              Save
                                            </button>
                                            <button 
                                              onClick={() => cancelEditing(comment.id)}
                                              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                                            >
                                              Cancel
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button 
                                              onClick={() => startEditing(comment.id)}
                                              className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                                              title="Edit comment"
                                            >
                                              <Edit3 className="h-4 w-4" />
                                            </button>
                                            <button 
                                              onClick={() => handleDeleteComment(comment.id)}
                                              className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                                              title="Delete comment"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {comment.isEditing ? (
                                  <div className="mt-2">
                                    <textarea
                                      value={comment.editContent || ''}
                                      onChange={(e) => updateEditContent(comment.id, e.target.value)}
                                      rows={3}
                                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                  </div>
                                ) : (
                                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                                    {comment.content}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Scroll to top button */}
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={scrollToTop}
                  className="fixed bottom-6 right-6 p-3 bg-maroon-600 dark:bg-maroon-500 text-white rounded-full shadow-lg hover:bg-maroon-700 dark:hover:bg-maroon-400 transition-colors z-30"
                >
                  <ArrowUp className="h-5 w-5" />
                  <span className="sr-only">Scroll to top</span>
                </motion.button>
              )}
            </div>
          ) : (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Post not found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
                <a 
                  href="/blog" 
                  className="inline-flex items-center text-maroon-600 dark:text-white hover:text-maroon-700 dark:hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </a>
              </div>
            </div>
          )}
        </>
      )} 
    </>
  );
};

export default BlogPostView;