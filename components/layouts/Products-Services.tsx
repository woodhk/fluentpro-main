import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  isNew: boolean;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  isNew, 
  title, 
  description, 
  features, 
  imageUrl,
  index 
}) => {
  const isEven = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-100/50 to-violet-100/50 transform group-hover:scale-[1.02] transition-transform duration-300" />
      <Card className="relative p-6 overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className={`flex flex-col lg:flex-row gap-8 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image Section */}
          <div className="relative w-full lg:w-2/5">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
              <img 
                src="/api/placeholder/400/300"
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {isNew && (
                <div className={`absolute top-4 ${isEven ? 'right-4' : 'left-4'}`}>
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-lg">
                    NEW
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
            
            {/* Features List */}
            <ul className="space-y-3 mt-4">
              {features.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (idx * 0.1) }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className={`flex ${isEven ? 'justify-start' : 'justify-start'}`}>
              <Button 
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white group relative overflow-hidden"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

interface Product {
  isNew: boolean;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

const ProductsServices: React.FC = () => {
  const products: Product[] = [
    {
      isNew: true,
      title: "FluentPro",
      description: "Bring your organization an advanced AI language training solution that adapts to each learner's needs and goals.",
      features: [
        "Real-World Business Scenarios",
        "Personalized Learning Path",
        "On-Demand Reports + Analytics"
      ],
      imageUrl: "/products/fluent-pro.jpg"
    },
    {
      isNew: false,
      title: "In House Courses + Workshops",
      description: "A ONE-STOP tailored solution to your company's English training needs through in-house sessions.",
      features: [
        "Expert-Led Sessions",
        "Soft skills and specific aspects of language",
        "Tailored Course Design to Meet Objectives"
      ],
      imageUrl: "/products/in-house.jpg"
    },
    {
      isNew: true,
      title: "Recruitment Test",
      description: "Level Assessment for employees specific job type and role with advanced AI-powered evaluation.",
      features: [
        "Conducted by AI, Marked by Senior Examiners",
        "Proficiency Comparison to popular frameworks (IELTS, CEFR, TOEFL)",
        "Detailed Assessment Reports"
      ],
      imageUrl: "/products/recruitment.jpg"
    },
    {
      isNew: false,
      title: "Workplace English Training E-Platform",
      description: "Comprehensive library of business English lessons accessible through a content management system.",
      features: [
        "2600+ downloadable training resources",
        "Challenging interactive content",
        "Detailed study notes"
      ],
      imageUrl: "/products/e-platform.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Corporate Training Products & Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Comprehensive solutions designed to elevate your team's English language proficiency
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsServices;