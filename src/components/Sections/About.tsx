import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Target, Award } from 'lucide-react';
import { usePortfolioContent } from '../../hooks/usePortfolioContent';
import EditableText from '../Admin/EditableText';
import EditableVideo from '../Admin/EditableVideo';

const About: React.FC = () => {
  const { content, updateContent } = usePortfolioContent();
  const aboutContent = content.about;

  const highlights = [
    {
      icon: TrendingUp,
      title: 'Business Intelligence',
      description: 'BCom (Hons) foundation providing deep understanding of market dynamics and financial reasoning'
    },
    {
      icon: Brain,
      title: 'AI Expertise',
      description: 'Advanced machine learning and deep learning capabilities with real-world application focus'
    },
    {
      icon: Target,
      title: 'Strategic Thinking',
      description: 'Unique ability to align AI solutions with business objectives and measurable outcomes'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Track record of delivering AI projects that drive tangible business value and growth'
    }
  ];

  if (!aboutContent) {
    return <div>Loading...</div>;
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            <EditableText
              value={aboutContent.title}
              onSave={(value) => updateContent('about', 'title', value)}
            />
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            <EditableText
              value={aboutContent.subtitle}
              onSave={(value) => updateContent('about', 'subtitle', value)}
              multiline
            />
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-navy-900 mb-6">
              <EditableText
                value={aboutContent.journey_title || 'My Journey'}
                onSave={(value) => updateContent('about', 'journey_title', value)}
              />
            </h3>
            
            <div className="prose prose-lg text-navy-700 space-y-4">
              <EditableText
                value={aboutContent.content}
                onSave={(value) => updateContent('about', 'content', value)}
                multiline
                className="leading-relaxed"
              />
            </div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <div className="bg-gradient-to-br from-navy-50 to-gold-50 p-6 rounded-2xl">
                <h4 className="text-xl font-semibold text-navy-900 mb-4">
                  <EditableText
                    value={aboutContent.video_title || 'Personal Introduction'}
                    onSave={(value) => updateContent('about', 'video_title', value)}
                  />
                </h4>
                <div className="aspect-video">
                  <EditableVideo
                    src={aboutContent.video_url}
                    onSave={(videoUrl) => updateContent('about', 'video_url', videoUrl)}
                    className="w-full h-full rounded-xl"
                    placeholder="Upload your introduction video"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-navy-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100"
              >
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mb-4">
                  <highlight.icon className="w-6 h-6 text-gold-600" />
                </div>
                <h4 className="text-lg font-semibold text-navy-900 mb-2">
                  <EditableText
                    value={aboutContent[`highlight_${index + 1}_title`] || highlight.title}
                    onSave={(value) => updateContent('about', `highlight_${index + 1}_title`, value)}
                  />
                </h4>
                <p className="text-navy-600 text-sm leading-relaxed">
                  <EditableText
                    value={aboutContent[`highlight_${index + 1}_desc`] || highlight.description}
                    onSave={(value) => updateContent('about', `highlight_${index + 1}_desc`, value)}
                    multiline
                  />
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;