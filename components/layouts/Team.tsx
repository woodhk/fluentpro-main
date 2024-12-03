"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LinkedinIcon, Mail, ArrowUpRight } from 'lucide-react';

const teamMembers = [
  {
    name: 'Fion Lee',
    role: 'Client Relationship Manager',
    bio: 'Bringing over 15 years of experience in building lasting client partnerships and strategic relationship management.',
    linkedin: '#',
    email: 'fion.lee@fluentpro.com'
  },
  {
    name: 'Alex Wood',
    role: 'Director of Sales and Product Development',
    bio: 'Leading product innovation and sales strategies with a focus on delivering exceptional learning solutions.',
    linkedin: '#',
    email: 'alex.wood@fluentpro.com'
  },
  {
    name: 'Tom Crawford',
    role: 'Director of Training',
    bio: 'Expert in curriculum development and training methodologies with a passion for transformative learning experiences.',
    linkedin: '#',
    email: 'tom.crawford@fluentpro.com'
  },
  {
    name: 'David Phair',
    role: 'Senior Corporate Trainer',
    bio: 'Specialized in delivering high-impact corporate training programs tailored to diverse business needs.',
    linkedin: '#',
    email: 'david.phair@fluentpro.com'
  }
];

const TeamMemberCard = ({ member, index }: { member: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-600 to-purple-600" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_70%)]" />

      <div className="relative p-6 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden bg-gray-100 group-hover:shadow-lg transition-all duration-300">
          <img
            src="/api/placeholder/400/300"
            alt={member.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
          <p className="text-blue-600 font-medium mb-4">{member.role}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>

          {/* Contact Links */}
          <div className="mt-auto flex items-center gap-4">
            <a
              href={member.linkedin}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm group/link"
            >
              <LinkedinIcon className="w-5 h-5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
            </a>
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm group/link"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-lg transform -translate-x-1/2 translate-y-1/2" />
      </div>
    </motion.div>
  );
};

export default function Team() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Introducing Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600">
            Meet the experienced professionals dedicated to transforming business communication through innovative language learning solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}