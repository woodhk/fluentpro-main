"use client";

import React from 'react';
import { Download } from 'lucide-react';
import html2pdf from 'jspdf-html2canvas';

interface PDFOptions {
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  filename?: string;
  image?: {
    type: string;
    quality: number;
  };
  html2canvas?: {
    scale?: number;
    useCORS?: boolean;
  };
  jsPDF?: {
    unit?: 'pt' | 'mm' | 'cm' | 'in';
    format?: string;
    orientation?: 'portrait' | 'p' | 'l' | 'landscape';
  };
}

const ExecutiveSummary = () => {
  const handleDownloadPDF = async () => {
    const element = document.getElementById('executive-summary');
    if (!element) return;
    
    try {
      const button = document.getElementById('download-button') as HTMLButtonElement | null;
      if (button) {
        button.textContent = 'Creating your PDF...';
        button.setAttribute('disabled', 'true');
      }

      // Update margin to be an object with top/right/bottom/left
      const pdfOptions: PDFOptions = {
        margin: { top: 10, right: 10, bottom: 10, left: 10 },
        filename: 'FluentPro-Executive-Summary.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2,
          useCORS: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      };

      await html2pdf(element, pdfOptions);

      if (button) {
        button.textContent = 'Download PDF';
        button.removeAttribute('disabled');
      }

    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('We ran into a small hiccup creating your PDF. Want to try that again?');
      
      const button = document.getElementById('download-button') as HTMLButtonElement | null;
      if (button) {
        button.textContent = 'Download PDF';
        button.removeAttribute('disabled');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Download Button */}
      <div className="sticky top-4 z-50 max-w-4xl mx-auto px-4 mb-6">
        <button
          id="download-button"
          onClick={handleDownloadPDF}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-5 w-5" />
          <span className="font-medium">Download PDF</span>
        </button>
      </div>

      {/* Main Content */}
      <div id="executive-summary" className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">FluentPro</h1>
          <h2 className="text-2xl text-gray-600">Business English Training Solution</h2>
          <p className="text-lg text-gray-500 mt-2">Prepared for HR Leadership</p>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            OVERVIEW
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Let's talk about why traditional English training isn't working for your team. The problem? 
            It's not teaching them the English they actually need for their roles. We discovered this 
            30 years ago while training global leaders at HSBC, Hutchison, and Bank of China. That's 
            why we created FluentPro - a completely different approach to Business English training.
          </p>
        </section>

        {/* Core Value Proposition */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            WHAT MAKES US DIFFERENT
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Think about your team's daily challenges. They need English that works in real business 
            situations, right now. That's exactly what FluentPro delivers. We've taken our decades 
            of teaching experience and combined it with AI technology to create something special. 
            Starting with our successful in-person courses, we evolved to our digital platform WETE, 
            and in late 2022, we added AI capabilities. The result? A learning solution that adapts 
            to each person's role and needs.
          </p>
        </section>

        {/* Key Differentiators */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            KEY BENEFITS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Practical Skills First</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Focus on real business communication, not textbook English</li>
                <li>• Learn to lead meetings, close deals, and work globally</li>
                <li>• Content tailored to your industry - finance, hospitality, tech, and more</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Smart Technology</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• AI tutor that understands your role and adapts to your needs</li>
                <li>• Practice in realistic business scenarios</li>
                <li>• Easy to use on any device, anywhere, anytime</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
              FOR YOUR TEAM
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Learn at their own pace, any time that works for them</li>
              <li>• No more scheduling hassles or group training delays</li>
              <li>• Everyone gets the same high-quality experience</li>
              <li>• Progress at their own speed, focused on their needs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
              LEARNING EXPERIENCE
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Practice without pressure - no client meetings at stake</li>
              <li>• Get helpful feedback right when you need it</li>
              <li>• Stay engaged with interactive, real-world scenarios</li>
              <li>• Learn from anywhere - office, home, or on the go</li>
            </ul>
          </section>
        </div>

        {/* Implementation Advantages */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            EASY TO IMPLEMENT
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Grows With You</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Works for teams of any size - from 5 to 5,000</li>
                <li>• Everyone gets the same great experience</li>
                <li>• Train multiple departments at once</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Makes Life Easier</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Less work for your HR team</li>
                <li>• No need to manage external trainers</li>
                <li>• Fits around your team's schedule</li>
                <li>• See exactly how everyone's improving</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Strategic Alignment */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            WHY IT MATTERS
          </h2>
          <p className="text-gray-700 leading-relaxed">
            In today's global business world, your team needs to communicate effectively across 
            borders and cultures. FluentPro isn't just another training program - it's an 
            investment in your team's success. We make it easy to give everyone the English 
            skills they need, without disrupting your business.
          </p>
        </section>

        {/* Future Development */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            WHAT'S NEXT
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We're always working on making FluentPro even better. New features and capabilities 
            are on the way, and we'll show you all about them in our upcoming videos. We're 
            excited to keep helping your team succeed in global business.
          </p>
        </section>

        {/* Recommendation */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            READY TO START?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            FluentPro is the smart choice for companies that want to improve their Business 
            English capabilities without the usual headaches. It brings together everything 
            we've learned about effective language training with modern technology that makes 
            it work for everyone. Perfect for companies of any size, anywhere in the world.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 italic">
            Want to learn more? This is just the start. We'll show you all the details and 
            implementation strategies in our next training videos. Your team's journey to 
            better Business English begins here.
          </p>
          <div className="mt-4 text-center text-gray-400 text-sm">
            Generated with FluentPro Executive Summary Generator
            <div className="text-xs mt-1">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ExecutiveSummary;