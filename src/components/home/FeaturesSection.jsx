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
import { HiSparkles } from 'react-icons/hi2';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FiMapPin className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: 'Hyperlocal Event Discovery',
      description:
        'Easily locate social service initiatives right in your neighborhood — from Mirpur 10 and Mohammadpur to Dhanmondi, Chittagong, and Sylhet.',
      badge: 'Location-Aware',
      borderColor: 'hover:border-brand-500/40',
      bgLight: 'bg-brand-50/70 dark:bg-brand-950/40',
    },
    {
      icon: <FiCheckCircle className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      title: 'One-Click Volunteer RSVP',
      description:
        'Join community drives with a single tap. Review your personal volunteer schedule sorted chronologically in your private dashboard.',
      badge: 'Instant Sync',
      borderColor: 'hover:border-sky-500/40',
      bgLight: 'bg-sky-50/70 dark:bg-sky-950/40',
    },
    {
      icon: <FiPlusSquare className="w-6 h-6 text-warm-500 dark:text-amber-400" />,
      title: 'Grassroots Drive Hosting',
      description:
        'Publish a community welfare drive in under two minutes with automated organizer attribution, future date validation, and photo presets.',
      badge: 'Quick Launch',
      borderColor: 'hover:border-warm-500/40',
      bgLight: 'bg-amber-50/70 dark:bg-amber-950/40',
    },
    {
      icon: <FiUsers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Real-Time Volunteer Rosters',
      description:
        'Inspect dynamic attendee headcounts and connect with fellow changemakers. Organizers gain complete visibility over expected volunteer turnout.',
      badge: 'Live Attendance',
      borderColor: 'hover:border-indigo-500/40',
      bgLight: 'bg-indigo-50/70 dark:bg-indigo-950/40',
    },
    {
      icon: <FiShield className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Strict Creator Ownership',
      description:
        'Event creators enjoy exclusive, secure rights to modify drive details, adjust logistics, or cancel drives, powered by stateless JWT authentication.',
      badge: 'Verified Security',
      borderColor: 'hover:border-blue-500/40',
      bgLight: 'bg-blue-50/70 dark:bg-blue-950/40',
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: 'Measurable Civic Impact',
      description:
        'Celebrate local civic milestones as collective volunteer hours, warm clothes distributions, and tree planting drives uplift underprivileged communities.',
      badge: 'Grassroots Metric',
      borderColor: 'hover:border-rose-500/40',
      bgLight: 'bg-rose-50/70 dark:bg-rose-950/40',
    },
  ];

  return (
    <section className="py-20 px-4 bg-base-200/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <HiSparkles className="w-4 h-4 text-warm-500" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight">
            Designed for Meaningful Civic Action
          </h2>
          <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
            Altru equips volunteers, student welfare clubs, and local humanitarian organizers with modern, reliable tools to coordinate impactful social service without friction.
          </p>
        </div>

        {/* 6 Features Responsive Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`group bg-base-100 rounded-3xl p-6 sm:p-7 border border-base-300/80 shadow-soft hover:shadow-xl ${feat.borderColor} hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${feat.bgLight} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-base-200 text-base-content/60 border border-base-300/50">
                    {feat.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-base sm:text-lg text-base-content group-hover:text-brand-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
