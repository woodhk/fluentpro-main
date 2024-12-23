"use client";

import React from 'react';
import Image from 'next/image';
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
        <div className="mb-12 flex items-center">
          <div className="mr-4">
            <Image
              src="/icons/logo.png"
              alt="FluentPro Logo"
              width={180}
              height={45}
              className="h-auto w-auto"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl text-gray-600">Overcoming Traditional English Training Challenges</h2>
            <p className="text-lg text-gray-500 mt-2">Executive Summary</p>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            FluentPro is a modern solution designed to address the key challenges faced by professionals 
            learning English for work. Traditional training methods often fail to provide the specific 
            skills employees need for their jobs. FluentPro uses AI to deliver personalized, practical, 
            and cost-effective training, ensuring staff are better prepared for their roles.
          </p>
        </section>

        {/* Key Challenges */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            Key Challenges in Traditional English Training
          </h2>
          
          <div className="space-y-8">
            {/* Challenge 1 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Lack of Personalized Learning Paths
              </h3>
              <p className="text-gray-700 mb-4">
                Traditional training often focuses on general content that does not align with employees' 
                job responsibilities. This approach results in wasted time and disengaged learners. For 
                example, professionals in finance need vocabulary related to reports and strategies, not 
                casual phrases they will never use.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Solution with FluentPro:</h4>
                <p className="text-gray-700">
                  FluentPro's AI-powered onboarding process creates a learning plan tailored to each 
                  employee's role. By understanding their specific job requirements, FluentPro ensures 
                  all lessons are directly relevant to their daily tasks.
                </p>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Limitations of Online Training
              </h3>
              <p className="text-gray-700 mb-4">
                Online courses are convenient but often lack two essential elements for success:
                practice in real-world business scenarios and immediate, actionable feedback.
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-600 mb-2">Real World Example:</h4>
                <p className="text-gray-700">
                  Ana, a sales leader, completed an online course but struggled to communicate clearly 
                  during a client meeting. Despite finishing all the modules, she was unable to 
                  confidently apply what she had learned to her work.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Solution with FluentPro:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Instant feedback to correct mistakes and improve responses</li>
                  <li>• Practice tailored to specific work situations</li>
                  <li>• A focus on building confidence and communication skills</li>
                </ul>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Challenges with Classroom Training and Tutoring
              </h3>
              <p className="text-gray-700 mb-4">
                Classroom training and private tutoring can provide effective feedback and speaking 
                practice, but they come with significant challenges:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• High costs for individual sessions</li>
                <li>• Difficulties in scheduling for both teachers and staff</li>
              </ul>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Solution with FluentPro:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Flexible, self-paced learning for busy schedules</li>
                  <li>• Personalized feedback similar to one-on-one tutoring</li>
                  <li>• Practical, role-specific conversations at a more affordable cost</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The FluentPro Advantage */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            The FluentPro Advantage
          </h2>
          <p className="text-gray-700 mb-4">
            FluentPro addresses the weaknesses of traditional and online training by offering:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li>• <span className="font-semibold">Convenience:</span> Staff can train anytime, anywhere</li>
                <li>• <span className="font-semibold">Customization:</span> Lessons are designed specifically for their job roles</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li>• <span className="font-semibold">Effectiveness:</span> Realistic practice with instant feedback</li>
                <li>• <span className="font-semibold">Affordability:</span> A cost-effective solution that does not compromise on quality</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-700 mt-4">
            FluentPro prepares employees for real-world communication in their roles, helping them 
            perform better and achieve results that benefit the entire organization.
          </p>
        </section>

        {/* What's Next */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-100 pb-2">
            What's Next?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            In the next session, we'll demonstrate FluentPro's reporting and analytics tools, which 
            allow HR managers to track progress and measure success.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ExecutiveSummary;