import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Award } from 'lucide-react';
import ProfilePhoto from './professtional photo.jpg';

const AboutSection = () => {
  const stats = [
    { icon: <Award className="w-6 h-6" />, label: 'Experience', value: 'Student' },
    { icon: <User className="w-6 h-6" />, label: 'Projects Completed', value: '0 (Learning)' },
    { icon: <MapPin className="w-6 h-6" />, label: 'College', value: 'PSG Tech' },
    { icon: <Calendar className="w-6 h-6" />, label: 'Availability', value: 'Open to Learn' },
  ];

  return (
    <section id="about" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl"></div>
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
            About Me
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A student eager to learn, explore, and grow in technology.
          </p>
        </motion.div>

        {/* Layout Updated - Image Left, Content Right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-12">


          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6 flex-1"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Hi, I'm Sarvathan</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I am currently pursuing <span className="text-neon-cyan font-semibold">B.E. Electrical and Electronics Engineering (SW)</span> at 
                <span className="text-neon-purple font-semibold"> PSG College of Technology</span>.  
                As a student, I am passionate about learning and exploring different areas of technology.
              </p>
              <p classasName="text-gray-300 leading-relaxed mb-6">
                I have a strong interest in <span className="text-neon-cyan">web development</span>, 
                <span className="text-neon-purple"> IoT</span>, and <span className="text-neon-cyan">AI-integrated projects</span>.  
                I am familiar with <span className="text-neon-purple">HTML, CSS, JavaScript</span>, and have programming knowledge in 
                <span className="text-neon-cyan"> C, C++</span>, along with basic coding skills in other areas.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I am still building my foundation and have not yet completed professional projects.  
                However, I am continuously learning, practicing, and looking forward to applying my skills to real-world challenges.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-neon-cyan mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                  
              ))}
            </div>
          </motion.div>
                    {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg lg:h-[100%] lg:w-auto">
              <img
                src={ProfilePhoto}
                alt="Sarvathan"
                className="h-full w-auto max-h-[700px] object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;