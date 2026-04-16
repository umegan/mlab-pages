import { motion } from 'motion/react';
import agentImg from '../../research/images/agent.png';
import aiWorkerImg from '../../research/images/ai_worker.png';
import atFactoryImg from '../../research/images/at_factory.png';
import cmcCrackImg from '../../research/images/cmc_crack.png';
import columnDetectionImg from '../../research/images/column-detection.png';
import drive1Img from '../../research/images/drive1.png';
import map1Img from '../../research/images/map1.png';

const labImages = [
  agentImg,
  aiWorkerImg,
  atFactoryImg,
  cmcCrackImg,
  columnDetectionImg,
  drive1Img,
  map1Img,
];

export const FutureLab = () => {
  return (
    <section className="relative py-20 sm:py-32 bg-[#344F1F] overflow-hidden">
      {/* Simplified Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#F4991A 1px, transparent 1px), linear-gradient(90deg, #F4991A 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Subtle Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F4991A] rounded-full blur-[120px] opacity-10"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F4991A] tracking-tight inline-block">
              FUTURE LAB
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F9F5F0] mb-6">
            私たちの研究テーマ
          </h2>
          <p className="text-xl sm:text-2xl text-[#F9F5F0]/80 max-w-3xl mx-auto">
            Our Research Areas
          </p>
        </motion.div>

        {/* Responsive Gallery */}
        <div className="relative">
          {/* Desktop: Horizontal Scroll */}
          <div className="hidden md:block">
            {/* Gradient Overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#344F1F] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#344F1F] to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <motion.div
                animate={{
                  x: [0, -2968],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 40,
                    ease: 'linear',
                  },
                }}
                className="flex gap-6"
              >
                {/* First set of images */}
                {labImages.map((image, index) => (
                  <motion.div
                    key={`img-1-${index}`}
                    className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={image}
                      alt={`研究室での活動風景 ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#344F1F] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Corner Frame */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#F4991A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#F4991A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
                {/* Duplicate set for seamless loop */}
                {labImages.map((image, index) => (
                  <motion.div
                    key={`img-2-${index}`}
                    className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={image}
                      alt={`研究室での活動風景 ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#344F1F] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Corner Frame */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#F4991A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#F4991A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Mobile: Grid Layout */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {labImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-2xl overflow-hidden relative"
              >
                <img
                  src={image}
                  alt={`研究室での活動風景 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#344F1F] via-transparent to-transparent opacity-40" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg sm:text-xl text-[#F9F5F0]/80 max-w-4xl mx-auto leading-relaxed">
            自動運転・画像認識・AIロボティクスを軸に、現実の課題を解く技術を探求しています。
          </p>
          <p className="text-md sm:text-lg text-[#F4991A] mt-4 font-bold">
            Exploring technologies to solve real-world problems — from autonomous driving to AI robotics.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
