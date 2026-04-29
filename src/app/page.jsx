'use client';

import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Zap, Rocket, 
  Code, Server, 
  Star, Quote, Target,
  Cpu, 
  Coffee,
   Type,
  Layers, 
  Shield, Clock,
  Brain, Eye,
  
} from 'lucide-react';

// Import JSON data
import homeData from '../data/homeData.json';
import sectionTitles from '../data/sectionTitles.json';

// Icon mapping - updated with all icons
const iconMap = {
  Brain, Code, Eye, Shield,
  Clock, Layers, Star, Cpu,
  ArrowRight, Coffee, Target,
  Zap, Rocket, Quote, Server,
  Type
};

const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Destructure data
  const { hero, stats, services, techStack, projects, testimonials, cta } = homeData;
  const { services: servicesTitle, techStack: techTitle, projects: projectsTitle, testimonials: testimonialsTitle, cta: ctaTitle } = sectionTitles;

  // Typewriter effect
  useEffect(() => {
    const currentText = hero.typedTexts[textIndex];
    const speed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText.length === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % hero.typedTexts.length);
      } else {
        setTypedText(
          isDeleting 
            ? currentText.substring(0, typedText.length - 1)
            : currentText.substring(0, typedText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex, hero.typedTexts]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Floating animation for background elements
  const FloatingElement = ({ delay, size, color, position }) => (
    <motion.div
      className={`absolute ${position} ${color} rounded-full blur-3xl`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );

  // Updated AnimatedCounter component with counter animation
  const AnimatedCounter = ({ stat, index }) => {
    // Get the icon component from the iconMap
    const Icon = iconMap[stat.icon];
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    
    useEffect(() => {
      let start = 0;
      const duration = 1800;
      const increment = stat.number / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.number) {
          setCount(stat.number);
          clearInterval(timer);
          setHasAnimated(true);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [stat.number]);

    return (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: 'rgba(30, 41, 59, 0.5)'
        }}
        className="text-center p-6 rounded-2xl 
                   bg-gradient-to-br from-gray-900/50 to-gray-800/30 
                   backdrop-blur-sm border border-gray-800
                   transition-all duration-300 cursor-default"
      >
        {/* Icon */}
        {Icon ? (
          <div className="flex justify-center mb-4">
            <Icon className="text-cyan-400" size={32} />
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <Star className="text-cyan-400" size={32} />
          </div>
        )}

        {/* Number with animation */}
        <div className="text-3xl md:text-4xl font-bold text-white mb-2 min-h-[3rem] flex items-center justify-center">
          {hasAnimated ? (
            <motion.span
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {count}
              {stat.label.toLowerCase().includes('retention') ? '%' : '+'}
            </motion.span>
          ) : (
            <span className="text-gray-500">{count}</span>
          )}
        </div>

        {/* Label */}
        <div className="text-gray-400 font-medium text-sm md:text-base">
          {stat.label}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingElement 
          delay={0} 
          size="400px" 
          color="bg-blue-500/5" 
          position="top-1/4 left-10%" 
        />
        <FloatingElement 
          delay={2} 
          size="500px" 
          color="bg-purple-500/5" 
          position="bottom-1/3 right-10%" 
        />
        <FloatingElement 
          delay={4} 
          size="300px" 
          color="bg-cyan-500/5" 
          position="top-3/4 left-60%" 
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-300 font-mono">{hero.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block text-gray-300 mb-4">Hello, I'm</span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-white mb-6"
              >
                {hero.name}
              </motion.span>
              <div className="h-20 sm:h-24 lg:h-28">
                <span className="block text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {hero.title}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            >
              {hero.ctaButtons.map((button, index) => (
                <Link key={index} href={button.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
                      button.variant === 'primary'
                        ? 'bg-white text-black hover:bg-gray-100'
                        : 'bg-transparent border border-gray-700 text-white hover:border-gray-500'
                    }`}
                  >
                    {button.text}
                    {button.variant === 'primary' && (
                      <ArrowRight className="inline ml-2 w-5 h-5" />
                    )}
                  </motion.button>
                </Link>
              ))}
            </motion.div>

            {/* Updated Stats Section */}
            
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {servicesTitle.title}
              </h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {servicesTitle.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                    {/* Gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:opacity-0 transition-opacity duration-300" />
                    
                    {/* Icon */}
                    <div className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20 w-fit`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-gray-300 text-sm">
                          <div className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-black/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {techTitle.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {techTitle.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{tech.name}</span>
                  <span className="text-sm text-gray-400">{tech.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-gray-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {projectsTitle.title}
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-gray-600 to-transparent" />
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {projectsTitle.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-gray-600 transition-all duration-300 h-full">
                  {/* Category badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs mb-4">
                    {project.category}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full hover:bg-gray-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                      <span className="text-sm text-gray-400">{project.status}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <button className="px-8 py-4 bg-transparent border border-gray-700 text-white font-semibold rounded-lg hover:border-gray-500 transition-colors duration-300">
                View All Projects
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {testimonialsTitle.title}
            </h2>
            <p className="text-lg text-gray-400">
              {testimonialsTitle.subtitle}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800">
                {/* Client info */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].company}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Quote */}
                <p className="text-gray-300 text-lg italic leading-relaxed">
                  "{testimonials[activeTestimonial].quote}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeTestimonial 
                    ? 'bg-white w-10' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-12 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
            <div className="text-center">
              {/* Icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Target className="w-12 h-12 text-cyan-400" />
              </motion.div>
              
              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {ctaTitle.title}
              </h2>
              
              {/* Description */}
              <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                {ctaTitle.subtitle}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {cta.buttons.map((button, index) => {
                  const Icon = iconMap[button.icon];
                  return (
                    <Link key={index} href={button.link}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
                          button.variant === 'primary'
                            ? 'bg-white text-black hover:bg-gray-100'
                            : 'bg-transparent border border-gray-700 text-white hover:border-gray-500'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {Icon && <Icon className="w-5 h-5" />}
                          {button.text}
                        </span>
                      </motion.button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;