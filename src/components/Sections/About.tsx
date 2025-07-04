import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Target, Award } from 'lucide-react';
import { useContentSections } from '../../hooks/useContent';
import EditableContent from '../Admin/EditableContent';
import EditableVideo from '../Admin/EditableVideo';

const About: React.FC = () => {
  const { content, saveContent } = useContentSections([
    'about_title',
    'about_subtitle',
    'about_content',
    'about_journey_title',
    'about_video_title',
    'about_video_url'
  ]);

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
            <EditableContent
              name="about_title"
              defaultContent="Where Business Meets Innovation"
            />
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            <EditableContent
              name="about_subtitle"
              defaultContent="The intersection of business intelligence and machine learning is where I thrive."
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
              <EditableContent
                name="about_journey_title"
                defaultContent="My Journey"
              />
            </h3>
            
            <div className="prose prose-lg text-navy-700 space-y-4">
              <EditableContent
                name="about_content"
                defaultContent="My journey began in the world of commerce, where I developed a deep appreciation for analytical rigor and strategic thinking. The BCom (Hons) foundation taught me to see patterns in data, understand market dynamics, and most importantly—translate complex insights into actionable business decisions."
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
                  <EditableContent
                    name="about_video_title"
                    defaultContent="Personal Introduction"
                  />
                </h4>
                <div className="aspect-video">
                  <EditableVideo
                    src={content.about_video_url}
                    onSave={(videoUrl) => saveContent('about_video_url', videoUrl)}
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
                  <EditableContent
                    name={`about_highlight_${index + 1}_title`}
                    defaultContent={highlight.title}
                  />
                </h4>
                <p className="text-navy-600 text-sm leading-relaxed">
                  <EditableContent
                    name={`about_highlight_${index + 1}_desc`}
                    defaultContent={highlight.description}
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