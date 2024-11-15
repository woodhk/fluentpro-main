import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Clock, Award, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

const PlatformFeatures = () => {
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('features-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsInView(isVisible);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-7 w-7" />,
      title: "Real-World Simulations",
      description: "Master business communication through authentic workplace scenarios",
      color: "from-rose-400 to-pink-600",
      lightColor: "from-rose-50 to-pink-50",
      gradient: "group-hover:from-rose-500/20 group-hover:to-pink-500/20"
    },
    {
      icon: <Clock className="h-7 w-7" />,
      title: "Instant Feedback",
      description: "Receive real-time AI-powered suggestions to refine your communication",
      color: "from-blue-400 to-cyan-600",
      lightColor: "from-blue-50 to-cyan-50",
      gradient: "group-hover:from-blue-500/20 group-hover:to-cyan-500/20"
    },
    {
      icon: <LineChart className="h-7 w-7" />,
      title: "Personalized Learning Path",
      description: "Follow a custom curriculum tailored to your industry and proficiency",
      color: "from-violet-400 to-purple-600",
      lightColor: "from-violet-50 to-purple-50",
      gradient: "group-hover:from-violet-500/20 group-hover:to-purple-500/20"
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Certificate of Completion",
      description: "Validate your business English proficiency with an official certification",
      color: "from-emerald-400 to-teal-600",
      lightColor: "from-emerald-50 to-teal-50",
      gradient: "group-hover:from-emerald-500/20 group-hover:to-teal-500/20"
    }
  ];

  return (
    <section 
      id="features-section"
      className="relative w-full py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient shapes */}
        <div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-100/40 via-violet-100/40 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-gradient-to-l from-pink-100/40 via-rose-100/40 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-ping" />
          <div className="absolute top-40 right-1/3 w-3 h-3 bg-purple-400/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-pink-400/30 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.8)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,.8)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"
          style={{
            backgroundSize: '50px 50px',
            opacity: 0.4
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(255,255,255,0.1),rgba(255,255,255,0.8))]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          className="relative max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold tracking-tight mb-6">
          Replacing Traditional English Training With{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FluentPro
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200/50 to-purple-200/50 -z-10 transform -skew-x-12" />
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Save thousands on tutoring costs with FluentPro. Our AI, built on 30+ years of Business English training experience, provides your employees with personalized learning paths, feedback, and real-world scenario simulations—all without the need for physical classes.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="group relative h-full backdrop-blur-sm bg-white/80 border border-white/20 hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glass morphism effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br opacity-0 transition-opacity duration-300 ${feature.gradient}" />
                
                {/* Content Container */}
                <div className="relative p-6 h-full flex flex-col">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${feature.color} transform group-hover:scale-105 transition-all duration-300 shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3 transform group-hover:translate-y-[-2px] transition-all duration-300">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Accent line */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} transition-all duration-500 rounded-b-lg`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;