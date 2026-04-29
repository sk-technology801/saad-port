'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send,
  Clock, CheckCircle, AlertCircle,
  MessageSquare, User, Briefcase,
  Linkedin, Github, Twitter, Instagram,
  Sparkles, Zap, Coffee, Target,
  ArrowRight, ExternalLink,
  Shield, Globe, Heart, Star,
  BookOpen, Award, Cpu, Terminal,
  Layers, Database, Cloud, Palette,
  Music, Camera, Video, Book,
  Code, Server, Smartphone, Lock,
  Rocket, TrendingUp, Users,
  Calendar,
  MessageCircle,
  X,
  Maximize2,
  RefreshCw,
  PictureInPicture,
  Layout
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyKey, setCalendlyKey] = useState(0);
  const [isCalendlyFullscreen, setIsCalendlyFullscreen] = useState(false);
  
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const calendlyRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Check if we're inside an iframe
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    // Detect if we're inside an iframe
    if (window.self !== window.top) {
      setIsInIframe(true);
      window.parent.postMessage({ type: 'iframeLoaded' }, '*');
    }
  }, []);

  // Handle Calendly iframe functions
  const openCalendly = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCalendly(true);
    setCalendlyKey(prev => prev + 1);
  }, []);

  const closeCalendly = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowCalendly(false);
    setIsCalendlyFullscreen(false);
  }, []);

  const toggleCalendlyFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      calendlyRef.current?.requestFullscreen?.();
      setIsCalendlyFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsCalendlyFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsCalendlyFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showCalendly) {
        closeCalendly();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showCalendly, closeCalendly]);

  // Main submission function
  const handleSubmitInternal = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    await new Promise(resolve => setTimeout(resolve, 1800));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    if (window.self !== window.top) {
      window.parent.postMessage({ 
        type: 'formSubmitted', 
        success: true 
      }, '*');
    }
    
    setTimeout(() => setSubmitStatus(null), 5000);
  }, []);

  // Final handleSubmit function
  const handleSubmit = useCallback(async (e) => {
    await handleSubmitInternal(e);
  }, [handleSubmitInternal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const floatingElements = useMemo(() => [
    { x: '10%', y: '20%', size: '120px', color: 'bg-blue-500/10', delay: 0 },
    { x: '85%', y: '60%', size: '180px', color: 'bg-green-500/10', delay: 1 },
    { x: '30%', y: '80%', size: '100px', color: 'bg-cyan-500/10', delay: 2 },
    { x: '70%', y: '25%', size: '150px', color: 'bg-emerald-500/10', delay: 1.5 },
  ], []);

  // UPDATED CONTACT CHANNELS - Schedule Call now opens iframe
  const contactChannels = useMemo(() => [
    {
      icon: Mail,
      title: 'Direct Email',
      value: 'hello@saadi.dev',
      description: 'For detailed inquiries and project discussions',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.1,
      action: 'mailto:hello@saadi.dev'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+92 123 456 7890',
      description: 'Instant messaging for quick discussions',
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.2,
      action: 'https://wa.me/921234567890'
    },
    {
      icon: Calendar,
      title: 'Schedule Call',
      value: 'Book Now',
      description: '30-minute strategy sessions',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.3,
      action: null,
      onClick: openCalendly // Opens Calendly iframe
    },
    
  ], [openCalendly]);

  
   

  const FloatingElement = ({ element }) => (
    <motion.div
      className={`absolute ${element.color} rounded-full blur-3xl`}
      style={{
        width: element.size,
        height: element.size,
        left: element.x,
        top: element.y,
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: element.delay,
        ease: "easeInOut"
      }}
    />
  );

  const ContactChannelCard = ({ channel }) => {
    const Icon = channel.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: channel.delay }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="group relative h-full"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 h-full flex flex-col min-h-[320px]">
          <div className={`absolute inset-0 bg-gradient-to-br ${channel.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          <div className="relative p-6 flex-1 flex flex-col">
            <div className="mb-5">
              <div className={`relative p-3 rounded-xl bg-gradient-to-br ${channel.gradient} bg-opacity-20 w-fit`}>
                <Icon className="w-6 h-6" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at center, currentColor 0%, transparent 70%)' }}
                />
              </div>
            </div>
            
            <div className="flex-1 mb-4">
              <h3 className="text-lg font-bold text-white mb-2">{channel.title}</h3>
              <div className="text-xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mb-3">
                {channel.value}
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {channel.description}
              </p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-800/50">
              {channel.action ? (
                <motion.a
                  href={channel.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {channel.title === 'WhatsApp' ? 'Message on WhatsApp' : 'Connect Now'}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              ) : channel.onClick ? (
                <button
                  onClick={channel.onClick}
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Schedule Now
                  <Calendar className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  Available for opportunities
                </div>
              )}
            </div>
          </div>

          <div className="absolute top-0 right-0 w-16 h-16">
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${channel.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
          </div>
        </div>
      </motion.div>
    );
  };

  const SocialProfileCard = ({ profile }) => {
    const Icon = profile.icon;
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        className="group h-full"
      >
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative block overflow-hidden rounded-2xl border border-gray-800 p-6 transition-all duration-500 ${profile.color} h-full`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          <div className="relative h-full flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${profile.gradient}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">{profile.name}</div>
                <div className="text-gray-300 text-sm">{profile.username}</div>
              </div>
            </div>
            
            <div className="mt-auto pt-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  <span className="font-semibold text-white">{profile.followers}</span> followers
                </div>
                <div className="text-gray-400">
                  <span className="font-semibold text-white">{profile.projects}</span>
                </div>
              </div>
              
              <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    );
  };

  const InputField = ({ label, icon: Icon, name, value, type = 'text', placeholder }) => {
    const handleFocus = () => {
      setActiveField(name);
    };

    const handleBlur = () => {
      setActiveField(null);
    };

    return (
      <div className="relative">
        <label className="block mb-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Icon className="w-4 h-4" />
            {label}
          </div>
        </label>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            rows="5"
            className={`w-full px-5 py-4 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
              activeField === name 
                ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                : 'border-gray-800 hover:border-gray-700'
            }`}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            className={`w-full px-5 py-4 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
              activeField === name 
                ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                : 'border-gray-800 hover:border-gray-700'
            }`}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Iframe Indicator */}
      {isInIframe && (
        <div className="fixed top-4 right-4 z-50">
          <div className="px-3 py-1.5 bg-green-900/80 backdrop-blur-sm rounded-full border border-green-700/50 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-400">Embedded</span>
          </div>
        </div>
      )}

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {floatingElements.map((element, index) => (
          <FloatingElement key={index} element={element} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Calendly Iframe Modal */}
      <AnimatePresence>
        {showCalendly && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCalendly}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className={`fixed z-50 ${isCalendlyFullscreen ? 'inset-0' : 'top-4 left-4 right-4 bottom-4 lg:top-20 lg:left-20 lg:right-20 lg:bottom-20'}`}
            >
              {/* Controls */}
              <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                <button
                  onClick={() => setCalendlyKey(prev => prev + 1)}
                  className="p-2.5 rounded-xl bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 transition-colors border border-gray-700/50"
                  title="Reload Calendly"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleCalendlyFullscreen}
                  className="p-2.5 rounded-xl bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 transition-colors border border-gray-700/50"
                  title={isCalendlyFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isCalendlyFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={closeCalendly}
                  className="p-2.5 rounded-xl bg-red-900/90 backdrop-blur-sm hover:bg-red-800 transition-colors border border-red-700/50"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Iframe Container */}
              <div className={`w-full h-full rounded-xl overflow-hidden ${!isCalendlyFullscreen ? 'border-2 border-purple-800/50 shadow-2xl' : ''}`}>
                <iframe
                  key={calendlyKey}
                  ref={calendlyRef}
                  src="https://cal.id/sardarsaadi-saadi"
                  className="w-full h-full"
                  title="Schedule a Call - Calendly"
                  allow="camera; microphone; autoplay"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  allowFullScreen
                />
              </div>

              {/* Instructions */}
              {!isCalendlyFullscreen && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-4 px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700/50">
                    <span className="text-sm text-gray-300">Press ESC to close • F11 for fullscreen</span>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-green-500/10 to-cyan-500/10 border border-blue-500/20 mb-8"
            >
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                  />
                ))}
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-300 via-green-300 to-cyan-300 bg-clip-text text-transparent tracking-wider">
                LET'S CREATE TOGETHER
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              <span className="block text-gray-300 mb-4">Get In</span>
              <motion.span
                animate={{ backgroundPosition: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                className="block bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Touch
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Ready to transform your ideas into exceptional digital experiences. 
              Let's collaborate on something remarkable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { value: '24h', label: 'Response Time', icon: Clock },
                { value: '100%', label: 'Satisfaction', icon: Star },
                { value: '50+', label: 'Projects', icon: Award },
                { value: '30+', label: 'Clients', icon: Users },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800"
                  >
                    <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Icon className="w-4 h-4" />
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
<div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Connect Through Your
              <span className="block bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                Preferred Channel
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg max-w-3xl mx-auto"
            >
              Choose the method that works best for you
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel) => (
              <ContactChannelCard key={channel.title} channel={channel} />
            ))}
          </div>

          {/* WhatsApp Quick Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm">
              <MessageCircle className="w-6 h-6 text-green-400" />
              <div className="text-left">
                <p className="text-gray-300 font-medium">
                  <span className="text-green-400">WhatsApp Available:</span> Quick responses for urgent inquiries
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Typically respond within minutes during business hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-black -z-10" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="relative overflow-hidden rounded-3xl p-12 bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800/30">
            <div className="relative text-center">
              <div className="inline-block mb-6">
                <Rocket className="w-16 h-16 text-cyan-400" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Launch Your
                <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Next Big Project?
                </span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Let's combine your vision with my technical expertise to create something 
                extraordinary. The first step is just a message away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
  onClick={openCalendly}
  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-green-600 to-cyan-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all"
>
  <Target className="w-5 h-5" />
  Schedule a Call
</button>

                <a
                  href="https://wa.me/921234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Quick Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default ContactPage;