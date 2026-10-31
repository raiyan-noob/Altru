"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiHeart,
  FiArrowUp,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-base-200/90 border-t border-base-300 text-base-content mt-auto">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-glow">
                <HiSparkles className="w-5 h-5 text-amber-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  Altru
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 -mt-1">
                  Civic Network Bangladesh
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              Altru is a community-driven social development events platform connecting compassionate volunteers and youth organizers to drive positive social change across Bangladesh.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: <FiFacebook className="w-4 h-4" />, href: '#', label: 'Facebook' },
                { icon: <FiInstagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
                { icon: <FiTwitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
                { icon: <FiLinkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-xl bg-base-100 border border-base-300/80 flex items-center justify-center text-base-content/70 hover:text-brand-600 hover:border-brand-500/50 hover:bg-base-200 transition-all duration-200 shadow-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/50">
              Community Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-brand-600 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-brand-600 transition-colors">
                  Upcoming Community Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-brand-600 transition-colors">
                  Host a Service Event
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-brand-600 transition-colors">
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-brand-600 transition-colors">
                  My Joined Volunteer Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Action Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/50">
              Active Focus Areas
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-base-content/75">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-warm-500"></span>
                <span>Winter Clothes & Blanket Relief</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                <span>Urban Lake & Park Cleanups</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                <span>Community Tree Plantations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Free Medical & Dental Camps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Emergency Flood & Crisis Food Relief</span>
              </li>
            </ul>
          </div>

          {/* Headquarters Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/50">
              Dhaka Headquarters
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-base-content/75">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                <span>Level 4, House 28, Road 11, Banani, Dhaka-1213, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>+880 1712-000000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-warm-500 flex-shrink-0" />
                <span>contact@altru-bangladesh.org</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                Altru Civic Grid Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="border-t border-base-300/80 bg-base-300/40 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-base-content/60">
          <p>© {new Date().getFullYear()} Altru Bangladesh. Built for community impact.</p>
          <div className="flex items-center gap-1 text-xs">
            <span>Powered by volunteers uniting for solidarity</span>
            <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 z-40"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <FiArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
