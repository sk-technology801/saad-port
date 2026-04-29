
'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ExternalLink, Github,
  Code, Palette, Server, Smartphone,
  Database, Globe, Cloud, Lock,
  Calendar, Users, TrendingUp,
  Grid, List, Sparkles, Zap,
  Target, ChevronRight, Star,
  Eye, Clock, MessageSquare,
  Layers, Cpu, GitBranch,
  Briefcase, Award,
  FolderOpen, Filter,
  BarChart3, Rocket,
  Shield, Terminal,
  Wifi, Zap as Lightning,
  Cpu as Processor
} from 'lucide-react';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All Work', icon: FolderOpen, count: 6 },
    { id: 'web', label: 'Web Apps', icon: Globe, count: 2 },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, count: 1 },
    { id: 'fullstack', label: 'Full Stack', icon: Layers, count: 2 },
    { id: 'api', label: 'APIs', icon: Terminal, count: 1 },
    { id: 'design', label: 'UI/UX', icon: Palette, count: 1 },
  ];

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Quantum Analytics',
      subtitle: 'Intelligent Data Platform',
      description: 'Real-time analytics dashboard with AI-powered insights for business intelligence and decision-making.',
      category: 'fullstack',
      tags: ['Next.js', 'TypeScript', 'D3.js', 'WebSockets', 'Node.js'],
      status: 'Live',
      year: '2024',
      clients: 15,
      impact: 'High',
      complexity: 'Advanced',
      timeline: '4 months',
      features: ['Real-time data', 'AI predictions', 'Team collaboration', 'Custom reports'],
      colorScheme: {
        primary: '#3B82F6',
        secondary: '#06B6D4',
        gradient: 'from-blue-500 to-cyan-500',
        bg: 'bg-gradient-to-br from-blue-900/20 to-cyan-900/10'
      },
      github: '#',
      demo: '#',
      metrics: [
        { label: 'Performance', value: '95%', icon: Zap },
        { label: 'Scalability', value: 'High', icon: TrendingUp },
        { label: 'Uptime', value: '99.9%', icon: Shield }
      ]
    },
    {
      id: 2,
      title: 'Nexus Commerce',
      subtitle: 'Headless E-commerce',
      description: 'Modern e-commerce platform with real-time inventory, AI recommendations, and seamless payment integration.',
      category: 'web',
      tags: ['React', 'Stripe', 'MongoDB', 'Redis', 'AWS'],
      status: 'Live',
      year: '2023',
      clients: 8,
      impact: 'Medium',
      complexity: 'Advanced',
      timeline: '5 months',
      features: ['Real-time inventory', 'AI recommendations', 'Payment processing', 'Admin dashboard'],
      colorScheme: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        gradient: 'from-purple-500 to-pink-500',
        bg: 'bg-gradient-to-br from-purple-900/20 to-pink-900/10'
      },
      github: '#',
      demo: '#',
      metrics: [
        { label: 'Conversion', value: '+25%', icon: BarChart3 },
        { label: 'Transactions', value: '10K+', icon: TrendingUp },
        { label: 'Load Time', value: '1.2s', icon: Lightning }
      ]
    },
    {
      id: 3,
      title: 'Aurora Connect',
      subtitle: 'Social Platform',
      description: 'Social media platform with real-time messaging, content sharing, and community features.',
      category: 'mobile',
      tags: ['React Native', 'GraphQL', 'Firebase', 'Socket.io'],
      status: 'In Progress',
      year: '2024',
      clients: 3,
      impact: 'Medium',
      complexity: 'Intermediate',
      timeline: '3 months',
      features: ['Real-time chat', 'Media sharing', 'Community groups', 'Push notifications'],
      colorScheme: {
        primary: '#10B981',
        secondary: '#06B6D4',
        gradient: 'from-emerald-500 to-teal-500',
        bg: 'bg-gradient-to-br from-emerald-900/20 to-teal-900/10'
      },
      github: '#',
      demo: '#',
      metrics: [
        { label: 'Users', value: '10K+', icon: Users },
        { label: 'Satisfaction', value: '95%', icon: Star },
        { label: 'Engagement', value: 'High', icon: TrendingUp }
      ]
    },
    {
      id: 4,
      title: 'Secure Vault API',
      subtitle: 'Enterprise Security',
      description: 'Enterprise-grade authentication and encryption API with advanced security features.',
      category: 'api',
      tags: ['Node.js', 'JWT', 'Redis', 'OAuth', 'Docker'],
      status: 'Live',
      year: '2023',
      clients: 12,
      impact: 'High',
      complexity: 'Advanced',
      timeline: '6 months',
      features: ['Multi-factor auth', 'End-to-end encryption', 'Audit logging', 'Rate limiting'],
      colorScheme: {
        primary: '#F59E0B',
        secondary: '#EF4444',
        gradient: 'from-amber-500 to-orange-500',
        bg: 'bg-gradient-to-br from-amber-900/20 to-orange-900/10'
      },
      github: '#',
      demo: '#',
      metrics: [
        { label: 'Security', value: '100%', icon: Shield },
        { label: 'Uptime', value: '99.99%', icon: Clock },
        { label: 'Breaches', value: '0', icon: Lock }
      ]
    },
    {
      id: 5,
      title: 'Design System Pro',
      subtitle: 'Component Library',
      description: 'Comprehensive design system with reusable components and accessibility compliance.',
      category: 'design',
      tags: ['Figma', 'Storybook', 'React', 'TypeScript', 'Tailwind'],
      status: 'Completed',
      year: '2023',
      clients: 6,
      impact: 'High',
      complexity: 'Intermediate',
      timeline: '2 months',
      features: ['Component library', 'Design tokens', 'Accessibility audit', 'Documentation'],
      colorScheme: {
        primary: '#F43F5E',
        secondary: '#EC4899',
        gradient: 'from-rose-500 to-pink-500',
        bg: 'bg-gradient-to-br from-rose-900/20 to-pink-900/10'
      },
      github: '#',
      demo: '#',
      metrics: [
        { label: 'Dev Time', value: '-60%', icon: Clock },
        { label: 'Consistency', value: '+85%', icon: Layers },
        { label: 'Accessibility', value: 'AAA', icon: Shield }
      ]
    },
    {
      id: 6,
      title: 'Cloud Migration',
      subtitle: 'Infrastructure Suite',
      description: 'Toolkit for seamless cloud migration with automated deployment and monitoring.',
      category: 'web',
      tags: ['AWS', 'Docker', 'Terraform', 'Python', 'Kubernetes'],
      status: 'Live',
      year: '2024',
      clients: 5,
      impact: 'Medium',
      complexity: 'Advanced',
      timeline: '4 months',
      features: ['Auto deployment', 'Cost tracking', 'Performance monitoring', 'Security scanning'],
      colorScheme: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        gradient: 'from-indigo-500 to-purple-500',
        bg: 'bg-gradient-to-br from-indigo-900/20 to-purple-900/10'
      },
      github: '#',
      demo: '#',
      metrics: [
        { label: 'Cost Saving', value: '-35%', icon: TrendingUp },
        { label: 'Deployment', value: '5x Faster', icon: Rocket },
        { label: 'Downtime', value: '-90%', icon: Clock }
      ]
    },
  ], []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(project => project.category === activeFilter);
  }, [activeFilter, projects]);

  const searchedProjects = useMemo(() => {
    if (!searchQuery) return filteredProjects;
    const query = searchQuery.toLowerCase();
    return filteredProjects.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [filteredProjects, searchQuery]);

  const stats = [
    { value: projects.length, label: 'Total Projects', icon: Briefcase },
    { value: projects.filter(p => p.status === 'Live').length, label: 'Live Projects', icon: Zap },
    { value: projects.reduce((acc, p) => acc + p.clients, 0), label: 'Clients Served', icon: Users },
    { value: '100%', label: 'Success Rate', icon: Award },
  ];

  const FilterButton = ({ filter }) => {
    const Icon = filter.icon;
    const isActive = activeFilter === filter.id;
    
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveFilter(filter.id)}
        className={`relative group flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-gray-900 to-black border border-gray-800 shadow-lg'
            : 'hover:bg-gray-900/50 border border-transparent'
        }`}
      >
        <div className={`p-2 rounded-lg ${isActive ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gray-800'}`}>
          <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
        </div>
        <div className="text-left">
          <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
            {filter.label}
          </div>
          <div className="text-xs text-gray-500">{filter.count} projects</div>
        </div>
        {isActive && (
          <motion.div
            layoutId="activeFilter"
            className="absolute inset-0 rounded-xl border border-blue-500/30"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.button>
    );
  };

  const ProjectCard = ({ project }) => {
    const Icon = {
      'fullstack': Layers,
      'web': Globe,
      'mobile': Smartphone,
      'api': Terminal,
      'design': Palette,
    }[project.category] || Globe;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        className="group relative"
      >
        <div className={`relative overflow-hidden rounded-2xl border border-gray-800 ${project.colorScheme.bg} h-full`}>
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16">
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${project.colorScheme.gradient} opacity-10`} />
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${project.colorScheme.gradient} bg-opacity-20`}>
                  <Icon className="w-5 h-5" style={{ color: project.colorScheme.primary }} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    {project.category.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <div className="text-sm text-gray-400">{project.subtitle}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">Completed</div>
                <div className="text-sm font-medium text-white">{project.year}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {project.metrics.map((metric, idx) => {
                const MetricIcon = metric.icon;
                return (
                  <div key={idx} className="text-center p-3 rounded-lg bg-gray-900/50">
                    <MetricIcon className="w-4 h-4 text-gray-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-xs text-gray-500">{metric.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-900 text-gray-300 text-xs rounded-lg border border-gray-800"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-3 py-1.5 bg-gray-900 text-gray-400 text-xs rounded-lg border border-gray-800">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'Live' ? 'bg-green-500 animate-pulse' :
                    project.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <span className="text-xs text-gray-400">{project.status}</span>
                </div>
                <div className="w-px h-4 bg-gray-800" />
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-400">{project.clients} clients</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link
                  href={project.github}
                  className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                </Link>
                <Link
                  href={project.demo}
                  className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-black border border-gray-800 hover:border-gray-700 transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-white">Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${project.colorScheme.primary}15, transparent 50%)`,
            }}
          />
        </div>
      </motion.div>
    );
  };

  const ProjectDetailModal = () => {
    if (!selectedProject) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 rotate-45" />
            </button>

            {/* Modal content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedProject.colorScheme.gradient} bg-opacity-20`}>
                    {(() => {
                      const Icon = {
                        'fullstack': Layers,
                        'web': Globe,
                        'mobile': Smartphone,
                        'api': Terminal,
                        'design': Palette,
                      }[selectedProject.category] || Globe;
                      return <Icon className="w-6 h-6" style={{ color: selectedProject.colorScheme.primary }} />;
                    })()}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      {selectedProject.category.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                    <div className="text-lg text-gray-400">{selectedProject.subtitle}</div>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-gray-900/50">
                  <div className="text-sm text-gray-500 mb-1">Timeline</div>
                  <div className="text-lg font-bold text-white">{selectedProject.timeline}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/50">
                  <div className="text-sm text-gray-500 mb-1">Complexity</div>
                  <div className="text-lg font-bold text-white">{selectedProject.complexity}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/50">
                  <div className="text-sm text-gray-500 mb-1">Impact</div>
                  <div className="text-lg font-bold text-white">{selectedProject.impact}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/50">
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div className="text-lg font-bold text-white">{selectedProject.status}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Project Overview</h3>
                <p className="text-gray-400 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedProject.colorScheme.primary }} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <Link
                  href={selectedProject.github}
                  target="_blank"
                  className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>View Code</span>
                </Link>
                <Link
                  href={selectedProject.demo}
                  target="_blank"
                  className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
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
            className="text-center"
          >
            {/* Subtle badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <span className="text-sm text-gray-500 font-mono tracking-wider">PORTFOLIO</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-gray-300 mb-4">Selected</span>
              <span className="block">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Work
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              A curated selection of projects showcasing technical expertise, 
              innovative solutions, and measurable business impact.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <Icon className="w-4 h-4" />
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-10 bg-black/80 backdrop-blur-xl border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full lg:w-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full lg:w-80 px-4 py-3 pl-11 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                />
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <FilterButton key={filter.id} filter={filter} />
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-gray-900 text-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gray-900 text-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Results count */}
          <div className="mb-8 text-sm text-gray-500">
            Showing <span className="text-white font-medium">{searchedProjects.length}</span> projects
            {searchQuery && ` for "${searchQuery}"`}
          </div>

          {/* Projects */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {searchedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No results */}
          {searchedProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-900 flex items-center justify-center">
                <FolderOpen className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-12 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Build Together?
              </h2>
              <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Have a project in mind? Let's discuss how we can create something exceptional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    Start a Project
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-transparent border border-gray-700 text-white font-semibold hover:border-gray-500 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal />
    </div>
  );
};

export default ProjectsPage;