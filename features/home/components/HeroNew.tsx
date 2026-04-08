import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../../../components/ui/button';
import { Sparkles, ChevronDown } from 'lucide-react';

interface HeroNewProps {
  onNavigate?: (page: string) => void;
}

export const HeroNew = ({ onNavigate }: HeroNewProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#344F1F] pt-20 min-h-[85vh] flex items-center justify-center">
      {/* Simplified Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #F4991A 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Subtle Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #F4991A 0%, transparent 50%)',
        }}
      />

      {/* Floating Geometric Shapes - Reduced */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 border-2 border-[#F4991A] opacity-20 hidden md:block"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          x: mousePosition.x * 0.3,
          y: mousePosition.y * 0.3,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4991A]/20 border border-[#F4991A] mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#F4991A]" />
          <span className="text-[#F4991A] text-sm font-bold">Robot Vision × Spatial AI</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          <span>見る。考える。</span>
          <br />
          <span className="text-[#F4991A]">そして、動く。</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          映像から現実を理解し、自律的に行動するロボット。
          <br className="hidden sm:block" />
          人と機械が共存する世界の実現を目指します。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => onNavigate?.('research')}
              className="bg-[#F4991A] hover:bg-[#D88615] text-white px-8 py-6 text-lg font-bold rounded-full shadow-lg focus:ring-2 focus:ring-[#F4991A] focus:ring-offset-2"
            >
              研究内容を見る
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => onNavigate?.('contact')}
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-6 text-lg font-bold rounded-full focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              お問い合わせ
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="w-8 h-8 text-[#F4991A]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};