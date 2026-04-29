"use client";

import { useState, useRef, useEffect } from 'react';
import { RefreshCw, Maximize2, X, ExternalLink, Info } from 'lucide-react';

const CylinderContactPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [origin, setOrigin] = useState('');

  const iframeRef = useRef(null);

  // Set origin safely on client side
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle iframe loaded message
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'iframeLoaded') {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Reload iframe
  const reloadIframe = () => {
    setIframeKey(Date.now());
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Contact Page Embed
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Embedded contact page for Cylinder integration
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-900/30 rounded-full border border-green-800/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-400">LIVE</span>
              </div>
              
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Open Directly</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Page Status</p>
                <p className="text-lg font-bold text-green-400">Active</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Integration</p>
                <p className="text-lg font-bold text-cyan-400">Cylinder Ready</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <div className="text-cyan-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Security</p>
                <p className="text-lg font-bold text-blue-400">Encrypted</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Iframe Container */}
        <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'rounded-2xl overflow-hidden border-2 border-gray-800/50'}`}>
          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={reloadIframe}
              className="p-2.5 rounded-xl bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 transition-colors border border-gray-700/50"
              title="Reload iframe"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 transition-colors border border-gray-700/50"
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950/95 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-gray-800 rounded-full"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Loading Contact Page</h3>
                <p className="text-gray-400">Preparing your embedded contact form...</p>
                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src="/contact"
            className={`w-full ${isFullscreen ? 'h-screen' : 'h-[800px]'}`}
            title="Contact Page"
            allow="camera; microphone; clipboard-write"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            allowFullScreen
            loading="eager"
          />
        </div>

        {/* Information Panel */}
        {!isFullscreen && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Embed Instructions */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Info className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Embed Instructions</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">For Cylinder Integration:</p>
                  <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 overflow-x-auto">
                    <pre className="text-sm text-gray-300 font-mono whitespace-pre">
{`<iframe 
  src="${origin || 'https://yourdomain.com'}/contact" 
  width="100%" 
  height="800" 
  style={{ border: "none" }}
  allow="camera; microphone; clipboard-write"
  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
  title="Contact Form"
></iframe>`}
                    </pre>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <p className="text-xs text-gray-400">Width</p>
                    <p className="font-medium text-white">100%</p>
                  </div>
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <p className="text-xs text-gray-400">Height</p>
                    <p className="font-medium text-white">800px</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features Included */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Features Included</h3>
              </div>
              
              <ul className="space-y-3">
                {[
                  'WhatsApp Direct Integration',
                  'Contact Form with Validation',
                  'Social Media Links',
                  'Schedule Call Feature',
                  'Secure & Encrypted',
                  'Mobile Responsive',
                  'Animated UI Elements',
                  'Real-time Status Updates'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        {!isFullscreen && (
          <footer className="mt-8 pt-6 border-t border-gray-800/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Embedded Contact Page. Designed for Cylinder integration.
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  This page is optimized for iframe embedding with all features working correctly.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.open('/contact', '_blank')}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  View Standalone
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Copy Embed URL
                </button>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default CylinderContactPage;