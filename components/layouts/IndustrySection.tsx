import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  Ship, 
  TrendingUp,
  Banknote,
  Store,
  Landmark,
  Building,
  PlaneLanding,
  Wifi,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const initialIndustries = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Accounting, Banking & Finance",
    description: "Enhance financial communication skills and regulatory compliance expertise.",
    color: "from-blue-500/10 to-blue-600/10",
    hoverColor: "group-hover:from-blue-500/20 group-hover:to-blue-600/20"
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Insurance",
    description: "Master policy explanations and client relationship management.",
    color: "from-purple-500/10 to-purple-600/10",
    hoverColor: "group-hover:from-purple-500/20 group-hover:to-purple-600/20"
  },
  {
    icon: <Ship className="w-6 h-6" />,
    title: "Shipping & Logistics",
    description: "Improve international communication and documentation processes.",
    color: "from-emerald-500/10 to-emerald-600/10",
    hoverColor: "group-hover:from-emerald-500/20 group-hover:to-emerald-600/20"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Trading",
    description: "Develop precise market analysis and trading terminology skills.",
    color: "from-rose-500/10 to-rose-600/10",
    hoverColor: "group-hover:from-rose-500/20 group-hover:to-rose-600/20"
  }
];

const newIndustries = [
  {
    icon: <Store className="w-6 h-6" />,
    title: "Retail",
    description: "Perfect customer service communication and sales terminology.",
    color: "from-orange-500/10 to-orange-600/10",
    hoverColor: "group-hover:from-orange-500/20 group-hover:to-orange-600/20"
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "Public Services & Government",
    description: "Enhance administrative and public communication skills.",
    color: "from-cyan-500/10 to-cyan-600/10",
    hoverColor: "group-hover:from-cyan-500/20 group-hover:to-cyan-600/20"
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Property Management",
    description: "Master real estate terminology and client interactions.",
    color: "from-teal-500/10 to-teal-600/10",
    hoverColor: "group-hover:from-teal-500/20 group-hover:to-teal-600/20"
  },
  {
    icon: <PlaneLanding className="w-6 h-6" />,
    title: "Hotels, Leisure & Travel",
    description: "Improve hospitality and tourism communication.",
    color: "from-indigo-500/10 to-indigo-600/10",
    hoverColor: "group-hover:from-indigo-500/20 group-hover:to-indigo-600/20"
  }
];

const IndustrySection = () => {
  const [showNewIndustries, setShowNewIndustries] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!isAnimating) {
      setShowNewIndustries(!showNewIndustries);
    }
  };

  const currentIndustries = showNewIndustries ? newIndustries : initialIndustries;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Whatever Your Industry,{' '}
            <span className="text-blue-600">We Can Help You</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Specialized Business English training tailored to your industry's unique terminology and
            communication requirements
          </p>
        </div>

        {/* Industries Grid with Navigation */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={showNewIndustries ? 'new' : 'initial'}
              initial={{ opacity: 0, x: showNewIndustries ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: showNewIndustries ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {currentIndustries.map((industry, index) => (
                <div
                  key={industry.title}
                  className="group relative h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.color} ${industry.hoverColor} transition-all duration-300`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-4 inline-block rounded-xl bg-white p-3 shadow-sm">
                      <div className="text-blue-600">
                        {industry.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {industry.title}
                    </h3>
                    <p className="mb-4 text-gray-600">
                      {industry.description}
                    </p>
                    
                    {/* Learn More Button */}
                    <button className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                      <span className="font-medium">Learn more</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Button */}
          <button
            onClick={handleToggle}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors z-10"
            disabled={isAnimating}
          >
            {showNewIndustries ? (
              <ChevronLeft className="w-6 h-6" />
            ) : (
              <ChevronRight className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setShowNewIndustries(false)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              !showNewIndustries ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
          <button
            onClick={() => setShowNewIndustries(true)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              showNewIndustries ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;