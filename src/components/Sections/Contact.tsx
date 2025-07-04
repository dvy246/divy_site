import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { usePortfolioContent } from '../../hooks/usePortfolioContent';
import EditableText from '../Admin/EditableText';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();
  const { content, updateContent } = usePortfolioContent();
  const contactContent = content.contact;

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! I\'ll get back to you within 24 hours.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!contactContent) {
    return <div>Loading...</div>;
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-navy-50 to-platinum-50">
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
              value={contactContent.title}
              onSave={(value) => updateContent('contact', 'title', value)}
            />
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            <EditableText
              value={contactContent.subtitle}
              onSave={(value) => updateContent('contact', 'subtitle', value)}
              multiline
            />
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-6">
                <EditableText
                  value={contactContent.section_title || 'Get in Touch'}
                  onSave={(value) => updateContent('contact', 'section_title', value)}
                />
              </h3>
              <EditableText
                value={contactContent.content}
                onSave={(value) => updateContent('contact', 'content', value)}
                multiline
                className="text-navy-600 leading-relaxed mb-8"
              />
            </div>

            {/* Contact Details - NOW FULLY EDITABLE */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <Mail className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-navy-500 font-medium">Email</p>
                  <EditableText
                    value={contactContent.email || 'your.email@example.com'}
                    onSave={(value) => updateContent('contact', 'email', value)}
                    className="text-navy-900 font-semibold"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <Phone className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-navy-500 font-medium">Phone</p>
                  <EditableText
                    value={contactContent.phone || '+1 (555) 123-4567'}
                    onSave={(value) => updateContent('contact', 'phone', value)}
                    className="text-navy-900 font-semibold"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <MapPin className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-navy-500 font-medium">Location</p>
                  <EditableText
                    value={contactContent.location || 'Your City, Country'}
                    onSave={(value) => updateContent('contact', 'location', value)}
                    className="text-navy-900 font-semibold"
                  />
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-navy-900 mb-4">
                <EditableText
                  value={contactContent.social_title || 'Connect With Me'}
                  onSave={(value) => updateContent('contact', 'social_title', value)}
                />
              </h4>
              <div className="flex space-x-4">
                <motion.a
                  href={contactContent.linkedin_url || 'https://linkedin.com/in/yourprofile'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-navy-600 hover:text-blue-600 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={contactContent.github_url || 'https://github.com/yourprofile'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-navy-600 hover:text-gray-800 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={contactContent.twitter_url || 'https://twitter.com/yourprofile'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-navy-600 hover:text-blue-400 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
              
              {/* Editable Social Links */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="text-navy-500 w-20">LinkedIn:</span>
                  <EditableText
                    value={contactContent.linkedin_url || 'https://linkedin.com/in/yourprofile'}
                    onSave={(value) => updateContent('contact', 'linkedin_url', value)}
                    className="text-navy-700 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-navy-500 w-20">GitHub:</span>
                  <EditableText
                    value={contactContent.github_url || 'https://github.com/yourprofile'}
                    onSave={(value) => updateContent('contact', 'github_url', value)}
                    className="text-navy-700 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-navy-500 w-20">Twitter:</span>
                  <EditableText
                    value={contactContent.twitter_url || 'https://twitter.com/yourprofile'}
                    onSave={(value) => updateContent('contact', 'twitter_url', value)}
                    className="text-navy-700 flex-1"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-navy-900 mb-6">
              <EditableText
                value={contactContent.form_title || 'Start a Conversation'}
                onSave={(value) => updateContent('contact', 'form_title', value)}
              />
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    <EditableText
                      value={contactContent.name_label || 'Full Name *'}
                      onSave={(value) => updateContent('contact', 'name_label', value)}
                    />
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full px-4 py-3 border border-navy-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    <EditableText
                      value={contactContent.email_label || 'Email Address *'}
                      onSave={(value) => updateContent('contact', 'email_label', value)}
                    />
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-navy-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  <EditableText
                    value={contactContent.company_label || 'Company/Organization'}
                    onSave={(value) => updateContent('contact', 'company_label', value)}
                  />
                </label>
                <input
                  {...register('company')}
                  type="text"
                  className="w-full px-4 py-3 border border-navy-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  <EditableText
                    value={contactContent.message_label || 'Project Details *'}
                    onSave={(value) => updateContent('contact', 'message_label', value)}
                  />
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  className="w-full px-4 py-3 border border-navy-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project, challenges, and goals."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <EditableText
                      value={contactContent.button_text || 'Send Message'}
                      onSave={(value) => updateContent('contact', 'button_text', value)}
                      className="text-white"
                    />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm text-navy-500">
              <EditableText
                value={contactContent.footer_text || 'I typically respond within 24 hours. For urgent matters, feel free to call directly.'}
                onSave={(value) => updateContent('contact', 'footer_text', value)}
                multiline
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;