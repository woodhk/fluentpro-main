import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Users, Clock, CheckCircle, X } from 'lucide-react';

interface LandingCtaProps {
  maxSpots?: number;
  waitlistUsers?: {
    names: string[];
    count: number;
  };
}

const LandingCta: React.FC<LandingCtaProps> = ({
  maxSpots = 100,
  waitlistUsers = {
    names: ["Sarah", "Michael", "David"],
    count: 48
  }
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setEmail('');
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    { 
      icon: <Users className="w-6 h-6" />,
      title: "Limited Spots",
      description: `Only ${maxSpots} spots available`
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Premium Support",
      description: "Personalized attention & feedback"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Join Others",
      description: `${waitlistUsers.count}+ already waiting`
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white overflow-hidden">
      {/* Fixed position success alert */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 right-4 left-4 z-50 flex justify-center"
          >
            <Alert className="bg-green-50 border-green-200 text-green-800 max-w-md shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <AlertDescription className="font-medium">
                  You've successfully joined the waitlist! We'll notify you when a spot becomes available.
                </AlertDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-green-800 hover:text-green-900 hover:bg-green-100"
                  onClick={() => setShowSuccess(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        </div>

        {/* Main Content */}
        <div className="relative flex flex-col items-center text-center w-full">
          {/* Headings */}
          <motion.div className="space-y-6 mb-12" variants={itemVariants}>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-blue-600 leading-tight pb-2">
              Learn Business English
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 pt-1">
              with FluentPro
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto pt-2">
              Reserve Your Spot Today – Spaces Are Limited
            </p>
          </motion.div>

          {/* Waitlist Card */}
          <motion.div 
            className="w-full max-w-2xl mb-16 px-4"
            variants={itemVariants}
          >
            <div className="p-8 md:p-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-semibold mb-6">Join Our Waitlist</h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span>
                    Join {waitlistUsers.names.join(", ")} and {waitlistUsers.count} others
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 text-lg border-2"
                  required
                />
                
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Joining...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Join Waitlist
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              <p className="mt-4 text-sm text-gray-500 text-center">
                We'll notify you as soon as a spot becomes available
              </p>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
            variants={itemVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-blue-600 mb-3 flex justify-center">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingCta;