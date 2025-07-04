import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { usePortfolioContent } from '../../hooks/usePortfolioContent';
import EditableText from '../Admin/EditableText';
import EditableImage from '../Admin/EditableImage';

const Hero: React.FC = () => {
  const { content, updateContent } = usePortfolioContent();
  const heroContent = content.hero;

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!heroContent) {
    return <div>Loading...</div>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-navy-50 via-platinum-50 to-gold-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-200 shadow-lg"
            >
              <EditableText
                value={heroContent.badge || 'AI Professional & Business Strategist'}
                onSave={(value) => updateContent('hero', 'badge', value)}
                className="text-sm font-medium text-navy-700"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-navy-900 leading-tight"
            >
              <EditableText
                value={heroContent.title}
                onSave={(value) => updateContent('hero', 'title', value)}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-500"
                multiline
              />
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-navy-600 leading-relaxed"
            >
              <EditableText
                value={heroContent.subtitle}
                onSave={(value) => updateContent('hero', 'subtitle', value)}
                multiline
              />
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-8"
            >
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-gold-600 to-gold-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <EditableText
                  value={heroContent.cta_text || "Let's Solve Problems With Me"}
                  onSave={(value) => updateContent('hero', 'cta_text', value)}
                  className="text-white"
                />
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.div>
              </button>
            </motion.div>
          </motion.div>

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Photo Circle */}
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm">
                <EditableImage
                  src={heroContent.image_url || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Profile Photo"
                  onSave={(imageUrl) => updateContent('hero', 'image_url', imageUrl)}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badge - Only the bottom one, removed the star */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-navy-600 text-white p-3 rounded-full shadow-lg"
              >
                <EditableText
                  value={heroContent.floating_badge || 'AI'}
                  onSave={(value) => updateContent('hero', 'floating_badge', value)}
                  className="text-sm font-bold text-white"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center space-y-2 text-navy-600 hover:text-gold-600 transition-colors group"
          >
            <EditableText
              value={heroContent.scroll_text || 'Discover More'}
              onSave={(value) => updateContent('hero', 'scroll_text', value)}
              className="text-sm font-medium"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;