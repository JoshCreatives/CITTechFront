"use client";
import { useLayoutEffect, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Search,
  ChevronRight,
  BookOpen,
  Award,
  Users,
} from "lucide-react";
import supabaseClient from "../services/supabaseClient";
import moment from "moment";

const categories = [
  "All",
  "Academic News",
  "Student Life",
  "Events",
  "Research",
  "Alumni Stories",
  "Campus Updates",
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [blogsList, setBlogsList] = useState<any>([]);
  const [featuredBlogPost, setFeaturedBlogPost] = useState<any>(null);

  useLayoutEffect(() => {
    fetchBlogs();
    
    // Set up real-time subscription
    const subscription = supabaseClient
      .channel('blogs-real-time')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'blogs' }, 
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchBlogs(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchBlogs = async () => {
    try {
      console.log("Fetching blogs...");
      const blogsResponse = await supabaseClient.from("blogs").select().order('created_at', { ascending: false });
      
      if (blogsResponse.error) {
        console.error("Error fetching blogs:", blogsResponse.error);
        return;
      }
      
      const featuredBlogResponse = await supabaseClient
        .from("blogs")
        .select()
        .eq("is_featured", true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      setBlogsList(blogsResponse.data || []);
      setFeaturedBlogPost(featuredBlogResponse.data || blogsResponse.data?.[0] || null);
      
      console.log("Blogs fetched successfully:", blogsResponse.data?.length);
    } catch (error) {
      console.error("Error in fetchBlogs:", error);
    }
  };

  const filteredPosts = blogsList.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const highlights = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Latest Research",
      count: "50+",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Student Achievements",
      count: "200+",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Alumni Stories",
      count: "1000+",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src="/Hero1.jpg"
          alt="CIT Blog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/75 dark:from-gray-900/90 dark:to-gray-900/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-6">CIT Blog</h1>
              <p className="text-xl text-white/90 mb-8">
                Stay updated with the latest news, events, and stories from our
                vibrant academic community.
              </p>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="bg-maroon-600 p-3 rounded-full text-white">
                  {item.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-maroon-600 dark:text-maroon-500">
                    {item.count}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-maroon-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {featuredBlogPost && (
          <motion.div
            key={featuredBlogPost.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-12 border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img
                  src={featuredBlogPost.image_url || "/default-blog.jpg"}
                  alt={featuredBlogPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-maroon-600 text-white px-3 py-1 rounded-full text-sm">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8">
                <span className="inline-block bg-maroon-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {featuredBlogPost.category || "General"}
                </span>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  <a
                    href={`/blog/${featuredBlogPost.id}`}
                    className="hover:text-maroon-600 dark:hover:text-maroon-500 transition-colors"
                  >
                    {featuredBlogPost.title}
                  </a>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {featuredBlogPost.excerpt || featuredBlogPost.content?.substring(0, 150) + '...'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredBlogPost.author || "Admin"}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {moment(featuredBlogPost.created_at).format(
                        "MMMM Do YYYY"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48">
                <img
                  src={post.image_url || "/default-blog.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-maroon-600 text-white px-3 py-1 rounded-full text-sm">
                    {post.category || "General"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white hover:text-maroon-600 dark:hover:text-maroon-500 transition-colors">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt || post.content?.substring(0, 100) + '...'}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author || "Admin"}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {moment(post.created_at).format(
                      "MMMM Do YYYY"
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-maroon-600 dark:text-maroon-500 hover:text-maroon-800 dark:hover:text-maroon-300 font-medium transition-colors"
                  >
                    Read More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No blog posts found.</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-maroon-600 rounded-lg shadow-lg p-8 text-white"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-6">
              Get the latest updates from CIT delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-white text-maroon-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;