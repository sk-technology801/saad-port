'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  User, MapPin, Calendar, Briefcase,
  Code, Palette, Server, Smartphone,
  Award, Star, Users, Zap,
  MessageSquare, ArrowRight, Mail,
  Github, Linkedin, Twitter,
  BookOpen, Coffee, Target,
  Cpu, Database, Globe, Lock,
  Terminal, Sparkles, Rocket,
  ChevronRight, ExternalLink,
  Heart, Brain, Eye,
  TrendingUp, Clock, Shield,
  Cloud
} from 'lucide-react';

// Import the JSON data
import techExpertiseData from '@/data/techExpertise.json';

const AboutPage = () => {
  const [activeTimeline, setActiveTimeline] = useState('journey');

  const timelineData = {
    journey: [
      { year: '2019', title: 'Started Coding', description: 'Began learning web development fundamentals', icon: Code },
      { year: '2020', title: 'First Freelance Project', description: 'Built a website for a local business', icon: Briefcase },
      { year: '2021', title: 'Full-Stack Focus', description: 'Specialized in React & Node.js ecosystems', icon: Server },
      { year: '2022', title: 'Team Leadership', description: 'Led development teams on enterprise projects', icon: Users },
      { year: '2023', title: 'Advanced Architecture', description: 'Designed scalable microservices', icon: Cpu },
      { year: '2024', title: 'Current Focus', description: 'AI integration & performance optimization', icon: Rocket },
    ],
    education: [
      { year: '2018', title: 'Computer Science Degree', description: 'University of Lahore', icon: BookOpen },
      { year: '2019', title: 'Web Development Bootcamp', description: 'Advanced JavaScript & React', icon: Code },
      { year: '2020', title: 'Cloud Certification', description: 'AWS Solutions Architect', icon: Cloud },
      { year: '2021', title: 'Security Training', description: 'Application Security Fundamentals', icon: Shield },
      { year: '2022', title: 'Performance Optimization', description: 'Advanced Frontend Techniques', icon: Zap },
      { year: '2023', title: 'Continuous Learning', description: 'Latest frameworks & best practices', icon: Brain },
    ]
  };

  const principles = useMemo(() => [
    {
      icon: Eye,
      title: 'User-Centric Design',
      description: 'Always prioritize the end-user experience above everything else.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Quality First',
      description: 'Never compromise on code quality, security, or performance.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Brain,
      title: 'Continuous Learning',
      description: 'Stay updated with emerging technologies and best practices.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Collaborative Approach',
      description: 'Work closely with clients to understand their vision and goals.',
      color: 'from-amber-500 to-orange-500'
    }
  ], []);

  // Use data from JSON file
  const techExpertise = techExpertiseData.technicalExpertise;

  // Map icon names to actual components
  const iconMap = {
    Code: Code,
    Server: Server,
    Database: Database,
    Cloud: Cloud,
    Smartphone: Smartphone,
    Palette: Palette,
    Shield: Shield,
    Terminal: Terminal
  };

  const stats = useMemo(() => [
    { value: '5+', label: 'Years Experience', icon: Calendar },
    { value: '50+', label: 'Projects Delivered', icon: Briefcase },
    { value: '100%', label: 'Client Satisfaction', icon: Star },
    { value: '30+', label: 'Happy Clients', icon: Users },
  ], []);

  const hobbies = [
    { icon: BookOpen, title: 'Reading Tech Blogs', description: 'Stay updated with industry trends' },
    { icon: Coffee, title: 'Coffee & Coding', description: 'Perfect pair for productive sessions' },
    { icon: Terminal, title: 'Open Source', description: 'Contributing to community projects' },
    { icon: Heart, title: 'Fitness', description: 'Balancing work with physical health' },
  ];

  const TimelineItem = ({ item, index, isJourney }) => {
    const Icon = item.icon;
    return (
      <motion.div
        initial={{ opacity: 0, x: isJourney ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="flex gap-6">
          {/* Year */}
          <div className="flex-shrink-0 w-20 text-right">
            <div className="text-sm font-medium text-gray-400">{item.year}</div>
          </div>
          
          {/* Content */}
          <div className="flex-1 pb-8">
            {/* Connector line */}
            <div className="absolute left-20 top-6 bottom-0 w-px bg-gradient-to-b from-gray-800 via-gray-700 to-transparent" />
            
            {/* Dot */}
            <div className="absolute left-[76px] top-6 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 z-10" />
            
            {/* Card */}
            <div className="ml-8 p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-800">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            {/* Left Column - Introduction */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-cyan-300 font-medium">ABOUT ME</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="block text-gray-300">I'm</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Saadi
                  </span>
                </h1>

                {/* Subtitle */}
                <div className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Full-Stack Developer based in Lahore, Pakistan, 
                  crafting digital experiences that blend innovation with purpose.
                </div>

                {/* Bio */}
                <div className="space-y-4 mb-10">
                  <p className="text-gray-300 leading-relaxed">
                    With over 5 years of experience in web development, I specialize in 
                    creating scalable, performant applications that solve real-world problems. 
                    My approach combines technical expertise with creative problem-solving.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    I believe in writing clean, maintainable code and building products 
                    that not only meet but exceed user expectations.
                  </p>
                </div>

                {/* Location & Contact */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-900">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">Lahore, Pakistan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-900">
                      <Briefcase className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="font-medium">Available for projects</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      <span className="flex items-center gap-2">
                        Get In Touch
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </Link>
                  <Link href="/projects">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg bg-transparent border border-gray-700 text-white font-medium hover:border-gray-500 transition-colors"
                    >
                      View My Work
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Stats & Social */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800"
                      >
                        <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-400" />
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Connect With Me</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: Github, label: 'GitHub', url: 'https://github.com', color: 'hover:bg-gray-800' },
                      { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:bg-blue-900/20' },
                      { icon: Twitter, label: 'Twitter', url: 'https://twitter.com', color: 'hover:bg-blue-400/20' },
                      { icon: Mail, label: 'Email', url: 'mailto:hello@saadi.dev', color: 'hover:bg-red-900/20' },
                    ].map((social) => {
                      const Icon = social.icon;
                      return (
                        <Link
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 ${social.color} transition-colors`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm">{social.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Current Focus */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Current Focus</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Building scalable SaaS applications with Next.js 14, TypeScript, 
                    and modern cloud infrastructure.
                  </p>
                  <div className="text-sm text-gray-400">
                    <span className="text-emerald-400">●</span> Available for select projects
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">My Principles</h2>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The core values that guide my work and approach to development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 h-full">
                    {/* Icon */}
                    <div className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${principle.color} bg-opacity-20 w-fit`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-4">{principle.title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">{principle.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Section - Updated to use JSON data */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-purple-400" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Technical Expertise</h2>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Skills and technologies I work with to build exceptional digital products
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techExpertise.map((category, index) => {
              const Icon = iconMap[category.icon] || Code;
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-800">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                      </div>
                      <div className="text-sm text-gray-400">{category.level}%</div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4">{category.description}</p>

                    {/* Skills */}
                    <div className="space-y-3">
                      {category.skills.map((skill) => (
                        <div key={skill} className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">{skill}</span>
                          <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.min(category.level + Math.random() * 5, 95)}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              viewport={{ once: true }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            />
                          </div>
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

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">My Journey</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              A timeline of my professional development and growth
            </p>
            
            {/* Timeline Toggle */}
            <div className="inline-flex rounded-lg bg-gray-900 p-1 mb-12">
              <button
                onClick={() => setActiveTimeline('journey')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTimeline === 'journey'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Professional Journey
              </button>
              <button
                onClick={() => setActiveTimeline('education')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTimeline === 'education'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Education & Learning
              </button>
            </div>
          </motion.div>

          {/* Timeline Content */}
          <div className="relative">
            {timelineData[activeTimeline].map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
                isJourney={activeTimeline === 'journey'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies & Interests */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-rose-400" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Beyond Code</h2>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              What I enjoy when I'm not building digital experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => {
              const Icon = hobby.icon;
              return (
                <motion.div
                  key={hobby.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gray-800">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{hobby.title}</h3>
                    </div>
                    <p className="text-gray-400">{hobby.description}</p>
                  </div>
                </motion.div>
              );
            })}
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Let's Build Something Great
              </h2>
              <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Have a project in mind or just want to chat about tech? 
                I'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    <span className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5" />
                      Start a Conversation
                    </span>
                  </motion.button>
                </Link>
                <Link href="/projects">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-transparent border border-gray-700 text-white font-semibold hover:border-gray-500 transition-colors"
                  >
                    Browse My Work
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;