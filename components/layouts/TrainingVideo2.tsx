import React from 'react';
import { Play, Volume2, Download } from 'lucide-react';

const VideoSection2 = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B69] to-[#1E1145] z-0">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
        
        {/* Decorative Blurs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-200/80">
              <div className="h-px flex-1 bg-purple-200/20"></div>
              <span className="text-sm font-medium uppercase tracking-wider">Training Series 2/4</span>
              <div className="h-px flex-1 bg-purple-200/20"></div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              The Science Behing FluentPro
            </h1>
            <p className="text-lg md:text-xl text-purple-200/80 text-center">
              Transform Staffs' Business English speaking skills with personalized learning paths, instant feedback, and role-specific practice
            </p>
          </div>

          {/* Video Container */}
          <div className="group relative">
            {/* Video Frame */}
            <div className="aspect-video w-full bg-black/30 rounded-xl backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 hover:border-white/20">
              {/* Placeholder Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Play Button */}
                <button className="group-hover:scale-105 transition-transform duration-300 flex items-center gap-4 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20">
                  <Play className="w-6 h-6 text-white" />
                  <span className="text-white font-medium">Play Video</span>
                </button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-4 text-white/80">
                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-purple-400 rounded-full"></div>
                </div>
                <Volume2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="flex justify-center gap-8 text-sm text-purple-200/60">
            <span>Duration: 6:00</span>
            <span>Module 2 of 4</span>
          </div>
          
          {/* Download Button - Centered */}
          <div className="flex justify-center pt-2">
            <button 
              className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 text-white"
              onClick={() => console.log('Download handouts')}
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="font-medium">Download Handouts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection2;