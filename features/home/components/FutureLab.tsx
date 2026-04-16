import { motion } from 'motion/react';

const labImages = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', // Robot in lab
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80', // Robotic arm working
  'https://images.unsplash.com/photo-1563191911-e65f8655ebf9?w=600&q=80', // Student with robot
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', // Technology visualization
  'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&q=80', // AR/VR workspace
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80', // Research team
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
            理論から現実へ
          </h2>
          <p className="text-xl sm:text-2xl text-[#F9F5F0]/80 max-w-3xl mx-auto">
            Theory to Reality
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
                  x: [0, -1800],
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
            実験の「楽しさ」と「混沌」を体験しよう。きれいな結果だけでなく、プロセスこそが研究の醍醐味です。
          </p>
          <p className="text-md sm:text-lg text-[#F4991A] mt-4 font-bold">
            Experience the fun and chaos of experimentation. The process is the essence of research.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
