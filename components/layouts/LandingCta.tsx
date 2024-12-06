import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Users, Clock, CheckCircle, X, ArrowUpRight, RefreshCw } from 'lucide-react';

interface LandingCtaProps {
  maxSpots?: number;
  waitlistUsers?: {
    names: string[];
    count: number;
  };
}

interface FormData {
  email: string;
  fullName: string;
  position: string;
  company: string;
  staffCount: string;
  phoneNumber: string;
  captcha: string;
}

const LandingCta: React.FC<LandingCtaProps> = ({
  maxSpots = 100,
  waitlistUsers = {
    names: ["Amy", "David", "Lucy"],
    count: 2
  }
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    position: '',
    company: '',
    staffCount: '',
    phoneNumber: '',
    captcha: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [captchaText, setCaptchaText] = useState('');

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.position) {
      newErrors.position = 'Position is required';
    }
    if (!formData.company) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.staffCount || isNaN(Number(formData.staffCount))) {
      newErrors.staffCount = 'Valid staff count is required';
    }
    if (!formData.phoneNumber || !/^\+?[\d\s-]{8,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Valid phone number is required';
    }
    if (formData.captcha.toUpperCase() !== captchaText) {
      newErrors.captcha = 'Incorrect CAPTCHA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setFormData({
      email: '',
      fullName: '',
      position: '',
      company: '',
      staffCount: '',
      phoneNumber: '',
      captcha: ''
    });
    generateCaptcha();
    setShowSuccess(true);
    
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
      title: "Intelligently Tailored",
      description: "Curriculum Designed by Business English Language Scientists"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Admin Portal",
      description: "Onboard learners, and track outcomes effortlessly."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Business English Focused",
      description: "Tailored for Hong Kong + Chinese learners."
    }
  ];

  const avatarColors = [
    'bg-blue-100 text-blue-600',
    'bg-purple-100 text-purple-600',
    'bg-green-100 text-green-600',
    'bg-pink-100 text-pink-600'
  ];

  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  const renderFormField = (
    name: keyof FormData,
    label: string,
    type: string = 'text',
    placeholder: string
  ) => (
    <div className="space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`h-12 text-base border-2 ${errors[name] ? 'border-red-300' : ''}`}
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderCaptcha = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div 
            className="font-mono text-xl tracking-wider text-blue-800 select-none"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '0.5em'
            }}
          >
            {captchaText}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={generateCaptcha}
          className="p-2 hover:bg-blue-50"
        >
          <RefreshCw className="h-5 w-5 text-blue-600" />
        </Button>
      </div>
      <div className="space-y-1">
        <Input
          type="text"
          name="captcha"
          value={formData.captcha}
          onChange={handleInputChange}
          placeholder="Enter the code above"
          className={`h-12 text-base border-2 ${errors.captcha ? 'border-red-300' : ''}`}
        />
        {errors.captcha && (
          <p className="text-sm text-red-500 mt-1">{errors.captcha}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">
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
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        </div>

        <div className="relative flex flex-col items-center text-center w-full">
          <div className="relative text-center space-y-12 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center rounded-full px-6 py-2 border border-blue-200 bg-blue-50/80 backdrop-blur-sm">
                <span className="text-sm font-semibold leading-6 text-blue-700">
                  Early Access Now Open
                </span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowUpRight className="ml-2 h-4 w-4 text-blue-600" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
                <span className="text-gray-900">
                  Assess and Train
                  <br />
                  at Scale with
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 bg-clip-text text-transparent text-6xl sm:text-7xl md:text-8xl">
                  FluentPro
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Reserve Your Spot Today – Spaces Are Limited
            </motion.p>
          </div>

          <motion.div 
            className="w-full max-w-2xl mb-16 px-4"
            variants={itemVariants}
          >
            <div className="p-8 md:p-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-semibold mb-6">Join Our Waitlist For Early Access</h3>
              
              <div className="mb-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center">
                    <div className="flex -space-x-3">
                      {waitlistUsers.names.map((name, index) => (
                        <motion.div
                          key={name}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 border-white ${avatarColors[index % avatarColors.length]}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.1, zIndex: 10 }}
                        >
                          {getInitials(name)}
                        </motion.div>
                      ))}
                      <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 border-white bg-gray-100 text-gray-600"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                      >
                        +{waitlistUsers.count}
                      </motion.div>
                    </div>
                  </div>
                  <motion.p
                    className="text-sm text-gray-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Join {waitlistUsers.count + waitlistUsers.names.length} early adopters on the waitlist
                  </motion.p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderFormField('fullName', 'Full Name', 'text', 'Enter your full name')}
                    {renderFormField('email', 'Email Address', 'email', 'Enter your email')}
                    {renderFormField('position', 'Position', 'text', 'Enter your position')}
                    {renderFormField('company', 'Company', 'text', 'Enter your company name')}
                    {renderFormField('staffCount', 'Number of Staff', 'number', 'Enter total staff count')}
                    {renderFormField('phoneNumber', 'Phone Number', 'tel', 'Enter your phone number')}
                  </div>
                  
                  <div className="pt-4">
                    {renderCaptcha()}
                  </div>
                  
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
                        Sign-Up for Early Access
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>

                  <p className="mt-4 text-sm text-gray-500 text-center">
                    We'll notify you as soon as a spot becomes available
                  </p>
                </form>
              </div>
            </motion.div>

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