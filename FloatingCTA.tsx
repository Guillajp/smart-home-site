import React from 'react';

const FloatingCTA: React.FC = () => {
  return (
    <a
      href="#apply"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:from-blue-500 hover:to-indigo-500 sm:top-6 sm:right-6 sm:px-6 sm:py-3 sm:text-base max-w-[calc(100vw-2rem)]"
      aria-label="Get Pre-Approved for Credit"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="shrink-0"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <path d="m11 15 2 2 4-4" />
      </svg>
      <span className="truncate">Get Pre-Approved</span>
    </a>
  );
};

export default FloatingCTA;
