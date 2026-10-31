"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHandsHelping } from 'react-icons/fa';
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
    <footer className="relative bg-base-200/80 border-t border-base-300/80 text-base-content mt-auto">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <FaHandsHelping className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Altru
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              Altru is a community-driven social development events platform connecting compassionate volunteers and civic organizers to drive positive social change across Bangladesh.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { icon: <FiFacebook className="w-4 h-4" />, href: '#' },
                { icon: <FiInstagram className="w-4 h-4" />, href: '#' },
                { icon: <FiTwitter className="w-4 h-4" />, href: '#' },
                { icon: <FiLinkedin className="w-4 h-4" />, href: '#' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  className="w-8 h-8 rounded-lg bg-base-300/70 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-base-content/70 transition-all duration-200"
                  aria-label="Social Link"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-base-content mb-4">
              Service Pillars
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-base-content/70">
              <li>
                <Link href="/events?type=Donation" className="hover:text-emerald-600 transition-colors">
                  Winter Clothes & Blanket Drives
                </Link>
              </li>
              <li>
                <Link href="/events?type=Cleanup" className="hover:text-emerald-600 transition-colors">
                  Urban Clean & Green Campaigns
                </Link>
              </li>
              <li>
                <Link href="/events?type=Plantation" className="hover:text-emerald-600 transition-colors">
                  Tree Plantations & Reforestation
                </Link>
              </li>
              <li>
                <Link href="/events?type=Food+Drive" className="hover:text-emerald-600 transition-colors">
                  Hot Meals & Food Relief
                </Link>
              </li>
              <li>
                <Link href="/events?type=Healthcare" className="hover:text-emerald-600 transition-colors">
                  Free Medical & Blood Donation Camps
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-base-content mb-4">
              Community Hub
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-base-content/70">
              <li>
                <Link href="/events" className="hover:text-emerald-600 transition-colors">
                  Browse Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-emerald-600 transition-colors">
                  Organize an Event
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-emerald-600 transition-colors">
                  Manage My Events
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-emerald-600 transition-colors">
                  My Joined Events
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-emerald-600 transition-colors">
                  Volunteer Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-base-content mb-4">
              Dhaka Headquarters
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-base-content/70">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>House 42, Road 11, Banani, Dhaka-1213, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>+880 1711-234567 (Volunteer Hotline)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>contact@altru-community.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-base-300/80 bg-base-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-base-content/60">
          <p>© {new Date().getFullYear()} Altru Social Development Platform. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>Crafted with</span>
            <FiHeart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for humanitarian communities in Bangladesh</span>
          </p>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 z-40 ${
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
