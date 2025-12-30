
import React from 'react';
import { motion } from 'motion/react';

const AnimatedHelix: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="w-full h-full opacity-35" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f)">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.5, 0.2],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            d="M-100 800 C 200 700, 400 300, 800 200 C 1200 100, 1400 400, 1600 500"
            stroke="url(#paint0_linear)"
            strokeWidth="120"
            strokeLinecap="round"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.3, 0.1],
              y: [0, 15, 0],
              rotate: [-1, 1, -1]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            d="M-50 750 C 300 650, 500 250, 900 150 C 1300 50, 1500 350, 1700 450"
            stroke="url(#paint1_linear)"
            strokeWidth="80"
            strokeLinecap="round"
          />
        </g>
        
        {/* Animated Helix Orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.2, 0.8],
              x: Math.random() * 1440,
              y: Math.random() * 900
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            r={2 + Math.random() * 4}
            fill="#3b82f6"
          />
        ))}

        <defs>
          <filter id="filter0_f" x="-200" y="-100" width="2000" height="1100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur"/>
          </filter>
          <linearGradient id="paint0_linear" x1="0" y1="800" x2="1600" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="0.5" stopColor="#818cf8" stopOpacity="0.6"/>
            <stop offset="1" stopColor="#60a5fa" stopOpacity="0.8"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="0" y1="750" x2="1700" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#93c5fd" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedHelix;
