import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Brain, Navigation } from 'lucide-react';

const axes = [
  {
    id: 1,
    title: 'Vision',
    titleJa: '世界を理解する',
    description: 'Spatial AI & Recognition',
    icon: Eye,
    gradient: 'from-[#344F1F] to-[#4A6B2E]',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80', // Computer vision/AI
  },
  {
    id: 2,
    title: 'Robotics',
    titleJa: '世界に働きかける',
    description: 'Manipulation & Control',
    icon: Brain,
    gradient: 'from-[#344F1F] to-[#3D5A26]',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', // Robotic arm
  },
  {
    id: 3,
    title: 'Autonomous Driving',
    titleJa: '世界を自在に動く',
    description: 'Mobility & Navigation',
    icon: Navigation,
    gradient: 'from-[#344F1F] to-[#2D4219]',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80', // Autonomous vehicle
  },
];

export const ResearchAxes = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-32 bg-[#F9F5F0] relative overflow-hidden">
      {/* Simplified Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-[#F4991A]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#344F1F]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#344F1F] mb-4">
            3つの研究軸
          </h2>
          <p className="text-xl text-[#344F1F]/80">
            Three Core Research Axes
          </p>
        </motion.div>

        {/* Research Axes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {axes.map((axis, index) => {
            const Icon = axis.icon;
            const isHovered = hoveredCard === axis.id;

            return (
              <motion.div
                key={axis.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onHoverStart={() => setHoveredCard(axis.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl cursor-pointer h-[500px] focus-within:ring-2 focus-within:ring-[#F4991A] focus-within:ring-offset-2"
                tabIndex={0}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <motion.img
                    src={axis.image}
                    alt={`${axis.titleJa} - ${axis.description}の研究風景`}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isHovered ? 'grayscale-0' : 'grayscale'
                    }`}
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-t ${axis.gradient}`}
                    animate={{
                      opacity: isHovered ? 0.70 : 0.90,
                    }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      y: isHovered ? -10 : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#F4991A] flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    animate={{
                      y: isHovered ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#F9F5F0] mb-2">
                      {axis.title}
                    </h3>
                    <p className="text-xl text-[#F9F5F0]/90 mb-4">
                      {axis.titleJa}
                    </p>
                    <p className="text-lg text-[#F4991A] font-bold">
                      {axis.description}
                    </p>
                  </motion.div>

                  {/* Hover Indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                    className="h-1 bg-[#F4991A] mt-6"
                  ></motion.div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 border-4 border-[#F4991A] rounded-3xl pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
