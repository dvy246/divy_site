import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Brain, BarChart3, Code, Database, TrendingUp, Zap } from 'lucide-react';
const Skills = () => {
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
    return (_jsx("section", { id: "skills", className: "py-20 bg-gradient-to-br from-navy-50 to-platinum-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold text-navy-900 mb-6", children: ["Core ", _jsx("span", { className: "text-gold-600", children: "Expertise" })] }), _jsx("p", { className: "text-xl text-navy-600 max-w-3xl mx-auto", children: "A unique blend of technical mastery and business acumen that drives exceptional results" })] }), _jsx("div", { className: "grid lg:grid-cols-3 gap-8", children: skillCategories.map((category, categoryIndex) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: categoryIndex * 0.2, duration: 0.8 }, viewport: { once: true }, className: "bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`, children: _jsx(category.icon, { className: "w-6 h-6 text-white" }) }), _jsx("h3", { className: "text-xl font-bold text-navy-900", children: category.title })] }), _jsx("div", { className: "space-y-4", children: category.skills.map((skill, skillIndex) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, transition: { delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.6 }, viewport: { once: true }, className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-navy-700 font-medium", children: skill.name }), _jsxs("span", { className: "text-navy-500 text-sm", children: [skill.level, "%"] })] }), _jsx("div", { className: "w-full bg-navy-100 rounded-full h-2", children: _jsx(motion.div, { initial: { width: 0 }, whileInView: { width: `${skill.level}%` }, transition: { delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3, duration: 1 }, viewport: { once: true }, className: `h-2 rounded-full bg-gradient-to-r ${category.color}` }) })] }, skill.name))) })] }, category.title))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.8 }, viewport: { once: true }, className: "mt-16 bg-gradient-to-r from-gold-600 to-gold-500 rounded-2xl p-8 text-white", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: "text-2xl font-bold mb-4", children: "What Sets Me Apart" }), _jsx("p", { className: "text-gold-100 max-w-2xl mx-auto", children: "The rare combination of deep technical expertise and business strategic thinking" })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx(TrendingUp, { className: "w-8 h-8 mx-auto mb-3" }), _jsx("h4", { className: "font-semibold mb-2", children: "Business-First Approach" }), _jsx("p", { className: "text-gold-100 text-sm", children: "Every AI solution is designed with clear ROI and business impact in mind" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Database, { className: "w-8 h-8 mx-auto mb-3" }), _jsx("h4", { className: "font-semibold mb-2", children: "End-to-End Delivery" }), _jsx("p", { className: "text-gold-100 text-sm", children: "From concept to deployment, ensuring scalable and maintainable solutions" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Zap, { className: "w-8 h-8 mx-auto mb-3" }), _jsx("h4", { className: "font-semibold mb-2", children: "Rapid Innovation" }), _jsx("p", { className: "text-gold-100 text-sm", children: "Quick adaptation to emerging technologies while maintaining quality standards" })] })] })] })] }) }));
};
export default Skills;
