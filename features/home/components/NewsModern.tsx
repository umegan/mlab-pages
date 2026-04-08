import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { getAllNews } from '../../news/data/loader';
import { categoryColors, getCategoryIcon } from '../../news/types';

export const NewsModern = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Get latest 6 news items from data loader
  const allNews = getAllNews();
  const newsItems = allNews.slice(0, 6);

  const handleNewsClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-20 sm:py-32 bg-[#F9F5F0] relative overflow-hidden">
      {/* Simplified Background */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4991A]/5 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
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
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#344F1F] mb-2">
              最新情報
            </h2>
            <p className="text-xl text-[#344F1F]/80">
              News & Topics
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // This will be replaced with proper navigation when routing is implemented
              window.location.hash = '#news';
            }}
            className="hidden sm:flex items-center gap-2 text-[#344F1F] hover:text-[#F4991A] transition-colors font-bold group focus:outline-2 focus:outline-[#F4991A] rounded px-2 py-1"
          >
            View All
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Uniform Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => {
            const Icon = getCategoryIcon(item.category);
            const isHovered = hoveredItem === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ y: -8 }}
                onClick={() => handleNewsClick(item.link)}
                className={`group ${item.link ? 'cursor-pointer' : 'cursor-default'} focus-within:ring-2 focus-within:ring-[#F4991A] focus-within:ring-offset-2 rounded-2xl`}
                tabIndex={item.link ? 0 : undefined}
              >
                <motion.div
                  className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md border border-[#344F1F]/10 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Simplified Image Section */}
                  <div className="relative overflow-hidden h-48">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#344F1F] to-[#4A6B2E] flex items-center justify-center">
                        <Icon className="w-16 h-16 text-[#F4991A]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${categoryColors[item.category]} text-white border-0 px-3 py-1 font-bold shadow-lg`}>
                        {item.category}
                      </Badge>
                    </div>

                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F9F5F0] flex items-center justify-center opacity-90">
                      <Icon className="w-5 h-5 text-[#344F1F]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-[#344F1F]/70 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-[#344F1F] mb-2 text-lg group-hover:text-[#F4991A] transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    {item.summary && (
                      <p className="text-sm text-[#344F1F]/70 mb-4 line-clamp-2">
                        {item.summary}
                      </p>
                    )}

                    {/* Read More */}
                    {item.link && (
                      <div className="flex items-center gap-2 text-[#F4991A] font-bold text-sm">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#F4991A] rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center sm:hidden"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#news';
            }}
            className="inline-flex items-center gap-2 bg-[#F4991A] hover:bg-[#D88615] text-white px-8 py-4 rounded-full font-bold transition-colors focus:ring-2 focus:ring-[#F4991A] focus:ring-offset-2"
          >
            View All News
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
