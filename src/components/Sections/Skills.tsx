import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Code, Database, TrendingUp, Zap } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      skills: [
        { name: 'Machine Learning', level: 95 },
        { name: 'Deep Learning', level: 90 },
        { name: 'Natural Language Processing', level: 88 },
        { name: 'Computer Vision', level: 85 },
        { name: 'MLOps', level: 82 }
      ]
    },
    {
      title: 'Business Analytics',
      icon: BarChart3,
      color: 'from-gold-500 to-orange-600',
      skills: [
        { name: 'Financial Modeling', level: 92 },
        { name: 'Business Intelligence', level: 90 },
        { name: 'Decision Optimization', level: 88 },
        { name: 'Market Analysis', level: 85 },
        { name: 'Strategic Planning', level: 87 }
      ]
    },
    {
      title: 'Technical Stack',
      icon: Code,
      color: 'from-green-500 to-teal-600',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'TensorFlow/PyTorch', level: 90 },
        { name: 'SQL/NoSQL', level: 88 },
        { name: 'Cloud Platforms', level: 85 },
        { name: 'Data Visualization', level: 87 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-navy-50 to-platinum-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Core <span className="text-gold-600">Expertise</span>
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            A unique blend of technical mastery and business acumen that drives exceptional results
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-navy-700 font-medium">{skill.name}</span>
                      <span className="text-navy-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-navy-100 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-gold-600 to-gold-500 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">What Sets Me Apart</h3>
            <p className="text-gold-100 max-w-2xl mx-auto">
              The rare combination of deep technical expertise and business strategic thinking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Business-First Approach</h4>
              <p className="text-gold-100 text-sm">Every AI solution is designed with clear ROI and business impact in mind</p>
            </div>
            <div className="text-center">
              <Database className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">End-to-End Delivery</h4>
              <p className="text-gold-100 text-sm">From concept to deployment, ensuring scalable and maintainable solutions</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Rapid Innovation</h4>
              <p className="text-gold-100 text-sm">Quick adaptation to emerging technologies while maintaining quality standards</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;