'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Terminal, Cpu, Zap } from 'lucide-react';

const PortfolioHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();

  // Handle mouse move for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = useMemo(() => [
    { 
      name: 'Home', 
      path: '/', 
      color: 'from-blue-500 to-cyan-400',
      icon: <Sparkles className="w-3 h-3" />
    },
    { 
      name: 'Projects', 
      path: '/projects', 
      color: 'from-purple-500 to-pink-500',
      icon: <Terminal className="w-3 h-3" />
    },
    { 
      name: 'About', 
      path: '/about', 
      color: 'from-emerald-500 to-teal-400',
      icon: <Cpu className="w-3 h-3" />
    },
     { 
      name: 'Blogs', 
      path: '/blogs', 
      color: 'from-emerald-500 to-teal-400',
      icon: <Cpu className="w-3 h-3" />
    },
    { 
      name: 'Contact', 
      path: '/contact', 
      color: 'from-amber-500 to-orange-400',
      icon: <Zap className="w-3 h-3" />
    },
  ], []);

  const isActive = useCallback((path) => pathname === path, [pathname]);

  // Animated grid background effect
  const GridPattern = () => (
    <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(59, 130, 246, 0.2) 0px, transparent 50px)`,
          transition: 'background-image 0.1s ease-out'
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#222_1px,transparent_1px),linear-gradient(180deg,#222_1px,transparent_1px)] bg-[size:20px_20px]" />
    </div>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 w-full z-50"
      >
        <div className="relative">
          {/* Animated border effect */}
          <div className="absolute inset-x-0 bottom-0 h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30 blur-sm" />
          </div>
          
          <div className="relative bg-black/40 backdrop-blur-xl border-b border-white/10">
            <GridPattern />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between">
                {/* Logo with binary effect */}
                <Link href="/" className="group relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative">
                      {/* Binary code animation */}
                      <div className="absolute -left-2 -top-1 text-[8px] text-blue-400/30 font-mono">
                        01101000
                      </div>
                      <div className="absolute -right-2 -bottom-1 text-[8px] text-purple-400/30 font-mono">
                        10101101
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative px-4 py-2 bg-black/80 rounded-xl border border-white/10 group-hover:border-blue-500/30 transition-colors duration-300">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent">
                              Saadi.dev
                            </span>
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse" />
                          </div>
                          <div className="absolute -bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Tagline with typing effect */}
                    <div className="hidden md:block pl-3 border-l border-gray-800/50">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-gray-400 font-mono">
                          const developer = new Developer();
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                {/* Desktop Navigation with connector lines */}
                <nav className="hidden lg:flex items-center gap-0">
                  {navItems.map((item, index) => (
                    <div key={item.path} className="flex items-center">
                      {index > 0 && (
                        <div className="w-6 h-px bg-gradient-to-r from-gray-800 to-gray-700" />
                      )}
                      <Link
                        href={item.path}
                        onMouseEnter={() => setActiveHover(item.path)}
                        onMouseLeave={() => setActiveHover(null)}
                        className="relative px-4 py-3"
                      >
                        <div className="relative z-10 flex items-center gap-2 group">
                          <div className={`transition-transform duration-300 ${
                            isActive(item.path) || activeHover === item.path 
                              ? 'scale-110 rotate-12' 
                              : 'scale-100'
                          }`}>
                            {item.icon}
                          </div>
                          <span className={`font-medium tracking-wide ${
                            isActive(item.path) 
                              ? 'text-white' 
                              : 'text-gray-400 group-hover:text-white'
                          }`}>
                            {item.name}
                          </span>
                        </div>
                        
                        {/* Animated indicator */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                          <motion.div
                            initial={false}
                            animate={{
                              width: isActive(item.path) || activeHover === item.path ? '100%' : '0%',
                            }}
                            transition={{ duration: 0.3 }}
                            className={`h-0.5 bg-gradient-to-r ${item.color} rounded-full`}
                          />
                        </div>
                        
                        {/* Hover glow effect */}
                        <motion.div
                          initial={false}
                          animate={{
                            opacity: activeHover === item.path ? 0.1 : 0,
                            scale: activeHover === item.path ? 1.2 : 1,
                          }}
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-lg blur-md`}
                        />
                      </Link>
                    </div>
                  ))}
                </nav>

                {/* Mobile Menu Toggle with circuit board effect */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden relative p-2 rounded-lg bg-black/50 border border-gray-800 hover:border-blue-500/50 transition-colors duration-300"
                  aria-label="Toggle menu"
                >
                  {/* Circuit lines */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute top-0 left-2 w-0.5 h-1 bg-blue-500/50" />
                    <div className="absolute top-0 right-2 w-0.5 h-1 bg-purple-500/50" />
                    <div className="absolute bottom-0 left-2 w-0.5 h-1 bg-cyan-500/50" />
                    <div className="absolute bottom-0 right-2 w-0.5 h-1 bg-emerald-500/50" />
                  </div>
                  
                  <div className="relative">
                    <Menu className={`w-5 h-5 text-gray-300 transition-all duration-500 ${menuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                    <X className={`absolute top-0 left-0 w-5 h-5 text-gray-300 transition-all duration-500 ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Holographic Interface */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Holographic background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
            
            {/* Scan lines */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
              style={{
                backgroundImage: `linear-gradient(0deg, transparent 50%, rgba(0, 255, 255, 0.1) 50%)`,
                backgroundSize: '100% 4px'
              }}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-b from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-3xl border-l border-blue-500/20"
            >
              {/* Terminal-like header */}
              <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-sm text-gray-400 font-mono">terminal://menu</span>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="p-8 h-full overflow-y-auto">
                {/* Menu Links with terminal style */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="block group"
                      >
                        <div className={`relative p-5 rounded-xl border transition-all duration-300 ${
                          isActive(item.path)
                            ? 'border-blue-500/30 bg-gradient-to-r from-blue-500/5 to-transparent'
                            : 'border-gray-800/50 hover:border-blue-500/20 hover:bg-white/5'
                        }`}>
                          {/* Binary code decoration */}
                          <div className="absolute top-2 right-3 text-xs text-gray-600 font-mono">
                            {index.toString(2).padStart(4, '0')}
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} opacity-80`}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className={`text-xl font-bold ${
                                  isActive(item.path)
                                    ? 'text-white'
                                    : 'text-gray-300 group-hover:text-white'
                                }`}>
                                  {item.name}
                                </span>
                                <motion.div
                                  animate={{ opacity: isActive(item.path) ? 1 : 0 }}
                                  className="text-xs text-blue-400 font-mono bg-blue-900/30 px-2 py-1 rounded"
                                >
                                  {isActive(item.path) && 'ACTIVE'}
                                </motion.div>
                              </div>
                              <div className="mt-2 h-px w-full bg-gradient-to-r from-gray-800 to-transparent" />
                            </div>
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              isActive(item.path) 
                                ? 'bg-gradient-to-r from-blue-400 to-cyan-400 scale-125' 
                                : 'bg-gray-700 group-hover:bg-blue-500/50'
                            }`} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Status footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-mono">STATUS:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-400">ONLINE</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Building the future, one line at a time.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioHeader;