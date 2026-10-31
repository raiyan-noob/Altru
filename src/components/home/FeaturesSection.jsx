"use client";
import React from 'react';
import {
  FiMapPin,
  FiCheckCircle,
  FiPlusSquare,
  FiUsers,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FiMapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Local Event Discovery',
      description:
        'Easily find upcoming social service and welfare events happening right in your city neighborhood — from Mirpur and Mohammadpur to Dhanmondi and Old Dhaka.',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      icon: <FiCheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      title: 'One-Click Volunteer RSVP',
      description:
        'Join community drives with a single click. Keep track of your joined events, volunteer meeting times, and coordination updates in your personal dashboard.',
      bg: 'bg-teal-50 dark:bg-teal-950/40',
    },
    {
      icon: <FiPlusSquare className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: 'Grassroots Event Hosting',
      description:
        'Organize an event in your local area in less than two minutes. Specify the location, date, volunteer goals, and instructions for your community initiative.',
      bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    },
    {
      icon: <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Real-Time Volunteer Roster',
      description:
        'View real-time attendee counts and connect with fellow changemakers. Organizers get full visibility over expected turnout for logistical planning.',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      icon: <FiShield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Strict Creator Management',
      description:
        'Event creators have exclusive authorization to update event dates, details, or cancel events, ensuring maximum data integrity and security.',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: 'Measurable Civic Impact',
      description:
        'Track community hours and collective impact metrics. Celebrate volunteer milestones as our collective network transforms local neighborhoods.',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-base-200/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-base-content tracking-tight">
            Designed for Meaningful Community Action
          </h2>
          <p className="text-sm sm:text-base text-base-content/70">
            Altru provides modern, intuitive tools for volunteers, youth clubs, and NGOs to coordinate impactful grassroots humanitarian work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-base-100 rounded-2xl p-6 border border-base-300/80 shadow-sm hover:shadow-lg hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.bg}`}>
                {feat.icon}
              </div>
              <h3 className="font-bold text-lg text-base-content">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
