import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../../../components/ui/button';
import { Sparkles, ChevronDown } from 'lucide-react';
import heroImage from '../images/all-1.png';

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
    <section className="relative overflow-hidden bg-[#344F1F] pt-28 min-h-screen flex items-center justify-center">

      {/* ── Background image ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          draggable={false}
        />
      </div>

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-[#344F1F]/72" />

      {/* ── Dot pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #F4991A 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Floating shape ── */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 border-2 border-[#F4991A] opacity-20 hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: mousePosition.x * 0.3, y: mousePosition.y * 0.3 }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">

        {/* Badge — frosted glass for readability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#F4991A]" />
          <span className="text-white text-sm font-bold tracking-wide">Robot Vision × Spatial AI</span>
        </motion.div>

        {/* Heading */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onNavigate?.('research')}
              className="bg-[#F4991A] hover:bg-[#D88615] text-white px-8 py-6 text-lg font-bold rounded-full shadow-lg"
            >
              研究内容を見る
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onNavigate?.('contact')}
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-6 text-lg font-bold rounded-full"
            >
              お問い合わせ
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator — section底部に固定 ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 text-[#F4991A]" />
        </motion.div>
      </motion.div>

    </section>
  );
};
