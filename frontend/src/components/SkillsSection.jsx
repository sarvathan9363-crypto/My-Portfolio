import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Palette, Server, Smartphone, Globe } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Code className="w-8 h-8" />,
      skills: [
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'JavaScript', level: 88 },
        { name: 'React', level: 85 },
        // { name: 'TypeScript', level: 80 },
        // { name: 'Tailwind CSS', level: 85 },
      ]
    },
    {
      title: 'Backend',
      icon: <Server className="w-8 h-8" />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'C', level: 75 },
        { name: 'C++', level: 70 },
        // { name: 'Express.js', level: 80 },
        // { name: 'REST APIs', level: 85 },
      ]
    },
    {
      title: 'Database',
      icon: <Database className="w-8 h-8" />,
      skills: [
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MySQL', level: 75 },
        // { name: 'Redis', level: 70 },
        // { name: 'Firebase', level: 80 },
        // { name: 'Supabase', level: 75 },
      ]
    },
    // {
    //   title: 'Design',
    //   icon: <Palette className="w-8 h-8" />,
    //   skills: [
    //     { name: 'UI/UX Design', level: 85 },
    //     { name: 'Figma', level: 80 },
    //     { name: 'Adobe XD', level: 75 },
    //     { name: 'Photoshop', level: 70 },
    //     { name: 'Responsive Design', level: 90 },
    //     { name: 'Design Systems', level: 80 },
    //   ]
    // },
    // {
    //   title: 'Mobile',
    //   icon: <Smartphone className="w-8 h-8" />,
    //   skills: [
    //     { name: 'React Native', level: 75 },
    //     { name: 'Flutter', level: 70 },
    //     { name: 'iOS Development', level: 65 },
    //     { name: 'Android Development', level: 65 },
    //     { name: 'PWA', level: 80 },
    //     { name: 'Hybrid Apps', level: 75 },
    //   ]
    // },
    // {
    //   title: 'Tools & Others',
    //   icon: <Globe className="w-8 h-8" />,
    //   skills: [
    //     { name: 'Git', level: 90 },
    //     { name: 'Docker', level: 75 },
    //     { name: 'AWS', level: 70 },
    //     { name: 'Vercel', level: 85 },
    //     { name: 'Webpack', level: 75 },
    //     { name: 'Vite', level: 85 },
    //   ]
    // },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-dark-bg to-dark-card relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-gradient mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="text-neon-cyan mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                      <span className="text-neon-cyan text-sm font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-neon-cyan to-neon-purple h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-300 mb-6">
              I'm constantly exploring new technologies and frameworks to stay ahead of the curve.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['AI/ML', 'Blockchain', 'WebGL', 'Three.js', 'GraphQL', 'Microservices'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-full text-white text-sm border border-neon-cyan/30"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
