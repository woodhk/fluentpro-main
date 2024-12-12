import React, { useState } from 'react';
import { Play, Volume2, Download, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

const VideoSection1 = () => {
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    position: '',
    company: '',
    staffCount: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = () => {
    const filesToDownload = [
      { filename: 'training-1.pdf', path: '/training-pdfs/training-1.pdf' },
      { filename: 'training-presentation-1.pdf', path: '/training-pdfs/training-presentation-1.pdf' },
    ];

    filesToDownload.forEach(file => {
      const link = document.createElement('a');
      link.href = file.path;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setShowEarlyAccess(false);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B69] to-[#1E1145] z-0">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
        
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 left-4 z-50 flex justify-center">
          <Alert className="bg-green-50 border-green-200 text-green-800 max-w-md shadow-lg">
            <AlertDescription className="font-medium">
              You've successfully joined the early access list! We'll be in touch soon.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-200/80">
              <div className="h-px flex-1 bg-purple-200/20"></div>
              <span className="text-sm font-medium uppercase tracking-wider">Training Series 1/4</span>
              <div className="h-px flex-1 bg-purple-200/20"></div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Meet FluentPro
            </h1>
            <p className="text-lg md:text-xl text-purple-200/80 text-center">
              The go-to solution for banks, hotels, airline companies, and many other industry leaders.
            </p>
          </div>

          {/* Video Container */}
          <div className="group relative">
            <div className="aspect-video w-full bg-black/30 rounded-xl backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 hover:border-white/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group-hover:scale-105 transition-transform duration-300 flex items-center gap-4 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20">
                  <Play className="w-6 h-6 text-white" />
                  <span className="text-white font-medium">Play Video</span>
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-4 text-white/80">
                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-purple-400 rounded-full"></div>
                </div>
                <Volume2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Video Info and Buttons */}
          <div className="space-y-6">
            <div className="flex justify-center gap-8 text-sm text-purple-200/60">
              <span>Duration: 5:00</span>
              <span>Module 1 of 4</span>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={() => setShowEarlyAccess(true)}
              >
                <span className="font-semibold">Join Early Access</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 text-white"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Download Handouts</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Early Access Dialog */}
      <Dialog open={showEarlyAccess} onOpenChange={setShowEarlyAccess}>
        <DialogContent className="bg-white p-6 rounded-xl max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Join FluentPro Early Access</h2>
            <Button
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-gray-100"
              onClick={() => setShowEarlyAccess(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <Input
                  required
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  required
                  type="email"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Position</label>
                <Input
                  required
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company</label>
                <Input
                  required
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Number of Staff</label>
                <Input
                  required
                  type="number"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={formData.staffCount}
                  onChange={(e) => setFormData({...formData, staffCount: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <Input
                  required
                  type="tel"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>Request Early Access</span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoSection1;