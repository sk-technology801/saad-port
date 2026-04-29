'use client';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useInView } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Eye,
  Star,
  Zap,
  Layers,
  BookOpen,
  Tags,
  Calendar,
  Search,
  Mail,
  ChevronDown,
  TrendingUp,
  Bookmark,
  Share2,
  Users,
  BarChart,
  Filter,
  Sparkles,
  MousePointerClick,
  RefreshCw,
  ChevronUp,
  Heart,
  MessageCircle,
  BookmarkPlus,
  X,
  ExternalLink,
  Code,
  User,
  ThumbsUp,
  BookmarkCheck,
  Send,
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Mock data - expanded with more content
const mockBlogPosts = [
  {
    id: '1',
    title: 'Building a Real-time AI Dashboard with Next.js & Vercel AI SDK',
    excerpt: 'Learn how to create dynamic, streaming AI interfaces with server components, edge functions and real-time updates without WebSockets. Includes code samples and deployment tips.',
    content: `
      <h2>Introduction to Real-time AI Dashboards</h2>
      <p>In today's fast-paced world, real-time data visualization is crucial for AI applications. This guide walks you through building an AI dashboard that updates in real-time without WebSockets.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Server Components for better performance</li>
        <li>Edge Functions for global distribution</li>
        <li>Vercel AI SDK integration</li>
        <li>Real-time updates using Server-Sent Events</li>
      </ul>
      
      <pre><code>// Example code snippet
const Dashboard = () => {
  const { data, isLoading } = useAIStream();
  
  return (
    <div className="dashboard">
      {data.map(item => (
        <DataCard key={item.id} data={item} />
      ))}
    </div>
  );
};</code></pre>
      
      <p>This approach eliminates the need for complex WebSocket setups while maintaining real-time capabilities.</p>
    `,
    date: 'Jan 12, 2026',
    readTime: '8 min',
    category: 'AI & Machine Learning',
    featured: true,
    tags: ['Next.js', 'AI SDK', 'Real-time'],
    views: 1245,
    likes: 245,
    comments: 42,
    bookmarks: 89,
    image: '/blog/ai-dashboard.jpg',
    author: {
      name: 'Alex Chen',
      role: 'Senior AI Engineer',
      avatar: '/avatars/alex.jpg'
    },
    relatedPosts: ['2', '3']
  },
  {
    id: '2',
    title: 'Advanced Framer Motion Patterns for 2026 Interfaces',
    excerpt: 'Deep dive into scroll-linked animations, view-timeline, layout animations, shared layouts and gesture-driven experiences. With interactive demos and optimization strategies.',
    content: `
      <h2>Mastering Framer Motion in 2026</h2>
      <p>Animation has become an essential part of modern web interfaces. This article explores advanced patterns that will dominate 2026.</p>
      
      <h3>Scroll-Linked Animations</h3>
      <p>Learn how to create animations that sync perfectly with scroll position using the new View Timeline API.</p>
      
      <pre><code>// Scroll-linked animation
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/></code></pre>
      
      <h3>Gesture-Driven Experiences</h3>
      <p>Create interfaces that respond to user gestures like swipe, pinch, and rotate for more immersive experiences.</p>
      
      <p>These patterns help create more engaging and performant user interfaces.</p>
    `,
    date: 'Dec 28, 2025',
    readTime: '12 min',
    category: 'Animation',
    featured: false,
    tags: ['Framer Motion', 'Animations', 'UI/UX'],
    views: 892,
    likes: 187,
    comments: 31,
    bookmarks: 67,
    image: '/blog/animations.jpg',
    author: {
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      avatar: '/avatars/sarah.jpg'
    },
    relatedPosts: ['1', '4']
  },
  // Add more posts...
];

const categories = [
  'All',
  'AI & Machine Learning',
  'Animation',
  'React',
  'Performance',
  'TypeScript',
  'Design Systems',
  'DevOps',
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(mockBlogPosts.slice(0, 12));
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [email, setEmail] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [pulseElements, setPulseElements] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'John Doe', text: 'Great article! Loved the code examples.', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', text: 'Very helpful for my current project.', time: '1 day ago' },
  ]);
  
  const { scrollYProgress } = useScroll();
  const progressRef = useRef(null);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const modalRef = useRef(null);

  // Scroll progress bar
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (progressRef.current) {
      progressRef.current.style.width = `${latest * 100}%`;
    }
    setShowScrollTop(latest > 0.3);
  });

  // Mouse move effect for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive particle effect on mouse move
  useEffect(() => {
    const createParticle = () => {
      if (pulseElements.length < 5 && Math.random() > 0.7) {
        const id = Date.now();
        setPulseElements(prev => [...prev, id]);
        setTimeout(() => {
          setPulseElements(prev => prev.filter(item => item !== id));
        }, 1000);
      }
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, [pulseElements.length]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  // Open blog post modal
  const openBlogPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
    // Increment view count
    const updatedPosts = mockBlogPosts.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    );
    // Update visible posts
    setVisiblePosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    ));
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedPost(null), 300); // Wait for animation to complete
  };

  // Load more posts
  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisiblePosts((prev) => [
        ...prev,
        ...mockBlogPosts.map(post => ({
          ...post,
          id: `${post.id}-${prev.length}`
        })).slice(0, 6)
      ]);
      setLoadingMore(false);
      
      if (gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 1200);
  };

  // Save post to bookmarks
  const toggleSavePost = (postId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  // Like a post
  const toggleLikePost = (postId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Update local state for demo
    const updatedPosts = visiblePosts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + (post.likes < 500 ? 1 : 0) } : post
    );
    setVisiblePosts(updatedPosts);
    
    // Update selected post if open
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        likes: prev.likes + 1
      }));
    }
  };

  // Add comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: 'You',
        text: commentText,
        time: 'Just now'
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  // Share post
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedPost.title,
        text: selectedPost.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Filter and sort posts
  const filteredPosts = visiblePosts
    .filter((p) => (activeCategory === 'All' || p.category === activeCategory))
    .filter((p) => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

  // Newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    const button = e.currentTarget.querySelector('button');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Subscribed! 🎉';
      button.classList.add('bg-green-600');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600');
      }, 2000);
    }
    setEmail('');
  };

  // Interactive background particles
  const renderParticles = () => {
    return pulseElements.map((id) => (
      <motion.div
        key={id}
        className="absolute w-2 h-2 rounded-full bg-cyan-400/30"
        initial={{ 
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0,
          opacity: 1
        }}
        animate={{ 
          scale: [0, 2, 0],
          opacity: [1, 0.5, 0]
        }}
        transition={{ duration: 1.5 }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Enhanced floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-1/4 left-[15%] w-96 h-96 rounded-full blur-3xl"
          animate={{ 
            y: [-40, 40, -40], 
            scale: [1, 1.12, 1],
            backgroundColor: ['rgba(0,255,255,0.05)', 'rgba(128,0,255,0.05)', 'rgba(0,255,255,0.05)'],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
        />
        
        {renderParticles()}
      </div>

      {/* Reading progress bar */}
      <div ref={progressRef} className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 z-50 origin-left" style={{ width: '0%' }} />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-600 to-purple-600 flex items-center justify-center z-40 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick stats floating panel */}
     
      <div className="relative z-10">
        {/* Hero section */}
        <section ref={heroRef} className="pt-32 pb-20 px-5 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-950/50 to-purple-950/40 border border-cyan-900/50 mb-8 shadow-[0_0_15px_rgba(0,255,255,0.08)] relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-cyan-300/90 relative">Insights & Deep Dives</span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Thoughts. Patterns. Innovations.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10"
              >
                Exploring the frontiers of web dev, AI, animations, and scalable systems with code, case studies, and forward-thinking ideas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center gap-8 flex-wrap"
              >
                {[
                  { label: 'Total Articles', value: '250+', icon: BookOpen, color: 'text-cyan-400' },
                  { label: 'Monthly Readers', value: '45K+', icon: Users, color: 'text-purple-400' },
                  { label: 'Categories', value: '12+', icon: Layers, color: 'text-pink-400' },
                  { label: 'Avg. Read Time', value: '7 min', icon: Clock, color: 'text-yellow-400' },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Header */}
        <section ref={headerRef} className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-b border-gray-900/90 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {categories.map((cat, idx) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                      activeCategory === cat
                        ? 'bg-gradient-to-r from-cyan-600/40 to-purple-600/40 border-cyan-500/50 text-white shadow-[0_0_25px_rgba(34,211,238,0.2)]'
                        : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:border-gray-600 hover:text-white'
                    } border`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                        layoutId="activeCategory"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsGridView(!isGridView)}
                  className="p-2.5 rounded-full bg-gray-900/60 border border-gray-800 text-gray-300 hover:text-white transition-all"
                >
                  {isGridView ? <Layers className="w-5 h-5" /> : <BarChart className="w-5 h-5" />}
                </motion.button>

                <div className="relative">
                  <motion.input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 sm:w-64 pl-10 pr-4 py-2.5 bg-gray-900/70 border border-gray-800 rounded-full text-sm text-gray-300 focus:border-cyan-500/50 focus:outline-none transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>

                <div className="relative">
                  <motion.select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    whileHover={{ scale: 1.02 }}
                    className="appearance-none pl-4 pr-8 py-2.5 bg-gray-900/70 border border-gray-800 rounded-full text-sm text-gray-300 focus:border-cyan-500/50 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="views">Sort by Views</option>
                    <option value="likes">Sort by Likes</option>
                  </motion.select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section ref={gridRef} className="py-16 px-5 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className={`${isGridView ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4' : 'space-y-8'} gap-8`}>
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: idx * 0.05,
                      type: "spring",
                      stiffness: 100 
                    }}
                    className={`${isGridView ? 'break-inside-avoid mb-8' : ''} group relative cursor-pointer`}
                    whileHover={{ scale: isGridView ? 1.02 : 1.01, transition: { duration: 0.3 } }}
                    onClick={() => openBlogPost(post)}
                  >
                    <div
                      className={`relative p-0 border transition-all duration-500 group-hover:border-gray-500/90
                        ${post.featured ? 'border-cyan-500/40 bg-gradient-to-b from-gray-950 via-black to-gray-950 shadow-[0_0_30px_rgba(0,255,255,0.1)]' : 'border-gray-800/80 bg-gray-950/70'}
                        backdrop-blur-md shadow-2xl shadow-black/50 group-hover:shadow-[0_0_40px_rgba(147,51,234,0.15)] rounded-2xl overflow-hidden`}
                    >
                      <motion.div
                        className="absolute inset-0 pointer-events-none z-0"
                        initial={false}
                        whileHover={{
                          background: 'radial-gradient(circle at var(--x) var(--y), rgba(34,211,238,0.1), transparent 60%)',
                        }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          e.currentTarget.style.setProperty('--x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                          e.currentTarget.style.setProperty('--y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
                        }}
                      />

                      {post.featured && (
                        <motion.div
                          className="absolute top-4 right-4 z-20"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-6 h-6 text-yellow-400" />
                        </motion.div>
                      )}

                      <div className="h-60 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
                        
                        <motion.button
                          onClick={(e) => toggleSavePost(post.id, e)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all"
                        >
                          <BookmarkPlus className={`w-5 h-5 ${savedPosts.includes(post.id) ? 'fill-cyan-400 text-cyan-400' : 'text-gray-300'}`} />
                        </motion.button>
                      </div>

                      <div className="p-7 relative z-10">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 rounded-full bg-gray-800/80 text-cyan-300/90 text-xs font-medium group-hover:bg-cyan-900/50 transition-colors"
                          >
                            {post.category}
                          </motion.span>
                          
                          <div className="flex gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <motion.span
                                key={tag}
                                whileHover={{ scale: 1.05 }}
                                className="px-2.5 py-1 rounded-full bg-gray-900/50 text-gray-400 text-xs cursor-default"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </motion.div>
                          </div>
                          <div className="flex items-center gap-4">
                            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5">
                              <Eye className="w-4 h-4" />
                              {post.views.toLocaleString()}
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5">
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </motion.div>
                          </div>
                        </div>

                        <motion.h2
                          className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors mb-3 line-clamp-2"
                          whileHover={{ x: 5 }}
                        >
                          {post.title}
                        </motion.h2>

                        <motion.p
                          className="text-gray-300 text-base leading-relaxed line-clamp-3 mb-6"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {post.excerpt}
                        </motion.p>

                        <div className="flex items-center justify-between">
                          <motion.div
                            className="flex items-center gap-2 text-gray-400 group-hover:text-cyan-300 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                            <span className="text-sm">Read article</span>
                          </motion.div>

                          <div className="flex items-center gap-2">
                            <motion.button
                              onClick={(e) => toggleLikePost(post.id, e)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 text-center"
            >
              {loadingMore ? (
                <motion.div
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900/70 rounded-xl border border-gray-800 shadow-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <motion.div
                    className="w-6 h-6 border-3 border-t-cyan-400 border-gray-700 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="text-gray-300 font-medium">Loading more content...</span>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,211,238,0.2)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={loadMore}
                  className="px-12 py-5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-cyan-900/50 hover:to-purple-900/50 border border-gray-700 hover:border-cyan-500/40 rounded-xl font-medium transition-all duration-400 shadow-xl shadow-black/40 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="relative flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Load More Articles
                  </span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 px-5 sm:px-8 lg:px-12 bg-gradient-to-b from-transparent via-black/50 to-transparent">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-10 rounded-3xl bg-gradient-to-br from-gray-950 to-black border border-gray-800/80 shadow-2xl shadow-cyan-950/20 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 50%, rgba(34,211,238,0.1), transparent 50%)',
                    'radial-gradient(circle at 70% 50%, rgba(147,51,234,0.1), transparent 50%)',
                    'radial-gradient(circle at 30% 50%, rgba(34,211,238,0.1), transparent 50%)',
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-3">Stay Ahead of the Curve</h2>
                  <p className="text-gray-400 text-lg">Get exclusive articles, code snippets, and updates delivered to your inbox monthly.</p>
                </div>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <motion.input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="flex-1 px-6 py-4 bg-gray-900/70 border border-gray-800 rounded-full text-gray-300 focus:border-cyan-500/50 focus:outline-none transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-300"
                  >
                    Subscribe
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-20 px-5 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  Trending This Week
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mockBlogPosts.filter(p => p.featured).map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    onClick={() => openBlogPost(post)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-cyan-500/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-bold text-cyan-400">{idx + 1}</div>
                      <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.category}</span>
                      <span>🔥 {post.views} views</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Blog Post Modal - Opens on same page */}
      <AnimatePresence>
        {showModal && selectedPost && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-4 md:inset-8 lg:inset-12 z-50 overflow-hidden"
              ref={modalRef}
            >
              <div className="h-full bg-gradient-to-br from-gray-950 to-black border border-gray-800/80 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-gray-900/30">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                      className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-gray-800/80 text-cyan-300/90 text-xs font-medium">
                        {selectedPost.category}
                      </span>
                      {selectedPost.featured && (
                        <span className="px-3 py-1 rounded-full bg-yellow-900/40 text-yellow-300 text-xs font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSavePost(selectedPost.id)}
                      className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                    >
                      {savedPosts.includes(selectedPost.id) ? (
                        <BookmarkCheck className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShare}
                      className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="max-w-4xl mx-auto p-6 md:p-8">
                    {/* Hero Image */}
                    <div className="h-64 md:h-80 rounded-2xl overflow-hidden mb-8 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                          {selectedPost.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {selectedPost.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {selectedPost.readTime} read
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {selectedPost.views.toLocaleString()} views
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mb-8 p-4 bg-gray-900/50 rounded-2xl">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{selectedPost.author?.name || 'Anonymous'}</div>
                        <div className="text-sm text-gray-400">{selectedPost.author?.role || 'Writer'}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert max-w-none mb-12">
                      <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full bg-gray-800/50 text-gray-300 text-sm hover:bg-gray-700/50 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between p-6 bg-gray-900/30 rounded-2xl mb-8">
                      <div className="flex items-center gap-6">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleLikePost(selectedPost.id)}
                          className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                          <span>{selectedPost.likes}</span>
                        </motion.button>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MessageCircle className="w-5 h-5" />
                          <span>{selectedPost.comments}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Bookmark className="w-5 h-5" />
                          <span>{selectedPost.bookmarks}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleShare}
                          className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-sm"
                        >
                          Share Article
                        </motion.button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mb-12">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Comments ({comments.length})
                      </h3>
                      
                      {/* Add Comment */}
                      <form onSubmit={handleAddComment} className="mb-8">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-300 focus:border-cyan-500/50 focus:outline-none transition-all"
                          />
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all"
                          >
                            <Send className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </form>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="p-4 bg-gray-900/30 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
                              <div>
                                <div className="font-medium">{comment.user}</div>
                                <div className="text-xs text-gray-400">{comment.time}</div>
                              </div>
                            </div>
                            <p className="text-gray-300">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Posts */}
                    <div>
                      <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedPost.relatedPosts?.map((relatedId) => {
                          const relatedPost = mockBlogPosts.find(p => p.id === relatedId);
                          if (!relatedPost) return null;
                          return (
                            <motion.div
                              key={relatedPost.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => {
                                setSelectedPost(relatedPost);
                                // Scroll to top of modal
                                if (modalRef.current) {
                                  modalRef.current.scrollTop = 0;
                                }
                              }}
                              className="p-4 bg-gray-900/30 rounded-xl hover:bg-gray-800/30 transition-colors cursor-pointer"
                            >
                              <h4 className="font-semibold mb-2">{relatedPost.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span>{relatedPost.category}</span>
                                <span>•</span>
                                <span>{relatedPost.readTime}</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
        
        /* Custom scrollbar for modal */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
        
        /* Prose styling for blog content */
        .prose {
          color: #d1d5db;
        }
        
        .prose h2 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        
        .prose ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose pre {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .prose code {
          color: #93c5fd;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;