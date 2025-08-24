import { useLayoutEffect, useState } from 'react';
import { Calendar, User, ArrowLeft, } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import supabaseClient from '../services/supabaseClient';
import { useTheme } from '../hooks/useTheme';

interface BlogPost {
  title: string;
  author: string;
  date: string;
  category: string;
  image_url: string;
  content: any;
}

const BlogPostView = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const postId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || '1' : '1';

  const fetchPost = async () => {
    setLoading(true); 
    const postResponse: any = await supabaseClient.from("blogs").select().eq("id", postId).single();
    setPost(postResponse.data);
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-xl text-gray-800 dark:text-gray-200">Fetching post...</div>
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
                className="relative h-[500px]"
              >
                <div className="absolute inset-0 bg-black/30 z-10" />
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end z-20">
                  <div className="max-w-7xl mx-auto px-4 w-full pb-16">
                    <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="max-w-3xl"
                    >
                      <span className="inline-block bg-maroon-600 dark:bg-maroon-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {post.category}
                      </span>
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {post.title}
                      </h1>
                      <div className="flex items-center text-white/80 gap-6">
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                  <motion.a
                    href="/blog"
                    className="inline-flex items-center text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 mb-8 transition-colors"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </motion.a>

                  <div className="space-y-8 prose prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-maroon-600 dark:prose-a:text-maroon-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-blockquote:border-l-maroon-600 dark:prose-blockquote:border-l-maroon-400 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className="text-xl text-gray-800 dark:text-gray-200">Post not found</div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BlogPostView;
