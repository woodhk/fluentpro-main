import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Calendar, PhoneCall, Users, ArrowRight } from 'lucide-react';

const BusinessEnglishCTA = () => {
  const features = [
    "Conducted by AI, Marked by Senior Examiners",
    "Proficiency Comparison to popular frameworks (IELTS, CEFR, TOEFL)",
    "Results delivered within 5 days"
  ];

  const companies = [
    { name: 'Adidas', initial: 'A' },
    { name: 'Deloitte', initial: 'D' },
    { name: 'PWC', initial: 'P' },
    { name: 'HSBC', initial: 'H' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 relative">
        {/* Main Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full"
                >
                  <span className="animate-pulse w-2 h-2 bg-blue-600 rounded-full mr-2" />
                  <span className="text-blue-600 text-sm font-medium">Limited Time Offer</span>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                >
                  Free Business English Assessment
                </motion.h2>

                <p className="text-lg text-gray-600">
                  Evaluate your team's business English proficiency with our comprehensive assessment
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-200" />
                <Button 
                  className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 h-auto"
                >
                  <span className="flex items-center justify-center gap-2">
                    Claim Your Free Assessment
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {companies.map((company, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-white"
                    >
                      <span className="text-sm font-medium text-blue-800">{company.initial}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Trusted by leading companies worldwide
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg space-y-6">
                <div className="space-y-6">
                  {[
                    { icon: <Calendar className="w-5 h-5" />, title: "Easy Scheduling", desc: "Book at your convenience" },
                    { icon: <PhoneCall className="w-5 h-5" />, title: "Personal Support", desc: "Dedicated account manager" },
                    { icon: <Users className="w-5 h-5" />, title: "Team Assessment", desc: "Comprehensive evaluation" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        {React.cloneElement(item.icon, { className: "w-5 h-5 text-blue-600" })}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-700">
                    "The assessment provided valuable insights into our team's English proficiency. Highly recommended!"
                  </p>
                  <p className="text-sm font-medium text-blue-600 mt-2">
                    - HR Director, Fortune 500 Company
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessEnglishCTA;