'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Calendar,
  MapPin,
  Globe,
  Phone,
  ChevronUp,
  Heart,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AiOutlineWhatsApp } from 'react-icons/ai';

const MinimalFooter = () => {
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative bg-black overflow-hidden border-t border-blue-500/20">
      {/* Animated glow line (header jaisa) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(90deg,#222_1px,transparent_1px),linear-gradient(180deg,#222_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">

          {/* LOGO (same futuristic vibe) */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative max-w-sm"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl rounded-xl" />
            <div className="relative p-5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent">
                Saadi.dev
              </h2>
              <p className="text-xs text-gray-400 font-mono mt-1">
                const future = build();
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-blue-400" />
+92 308 4931083                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-purple-400" />
saaddst21@gmail.com
                </div>
              </div>
            </div>
          </motion.div>

          {/* NAV (same underline logic as header) */}
          <nav className="flex flex-wrap gap-6 items-center">
            {navLinks.map((link, i) => (
              <div
                key={link.name}
                onMouseEnter={() => setActiveHover(i)}
                onMouseLeave={() => setActiveHover(null)}
                className="relative"
              >
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  {link.name}
                </Link>

                <motion.span
                  animate={{
                    width: activeHover === i ? '100%' : 0,
                    opacity: activeHover === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                />
              </div>
            ))}
          </nav>

          SOCIAL (neon hover)
          <div className="flex gap-4">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.15, y: -3 }}
                className="relative p-3 rounded-xl bg-black/60 border border-gray-800 hover:border-blue-500/50"
                href="#"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg opacity-0 hover:opacity-100 transition" />
                <Icon size={18} className="relative text-gray-300" />
              </motion.a>
            ))}
          </div>
        </div>

       

       

        {/* LOVE */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Made with <Heart size={12} className="inline text-pink-500" /> using code saadi
        </div>
      </div>
  {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-black-900">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Saadi.dev. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                "Privacy Policy",
                "Terms of Service",
              ].map((link) => (
                <a
                  key={link}
                  href="/connect"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Globe size={16} className="text-cyan-400" />
              <span>Global Presence: Saudi Arabia • USA • UK • UAE</span>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL TOP */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 p-3 rounded-full
                     bg-gradient-to-r from-blue-500 to-cyan-400
                     text-black shadow-xl hover:scale-110 transition"
        >
          <ChevronUp size={22} />
        </button>
      )}

      {/* WHATSAPP */}
      <a
        href="https://wa.me/447944447879"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full
                   bg-green-500 hover:bg-green-400
                   shadow-2xl transition hover:scale-110"
      >
        <AiOutlineWhatsApp size={26} />
      </a>
    </footer>
  );
};

export default MinimalFooter;
