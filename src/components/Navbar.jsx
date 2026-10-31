"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiCalendar,
  FiPlusCircle,
  FiCheckCircle,
  FiList,
  FiUser,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from 'react-icons/fi';
import { FaHandsHelping } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Upcoming Events', href: '/events', icon: <FiCalendar className="w-4 h-4" /> },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-base-100/90 dark:bg-base-100/95 backdrop-blur-md shadow-md border-b border-base-300/70'
          : 'bg-base-100 border-b border-base-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all duration-200">
              <FaHandsHelping className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Altru
              </span>
              <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-base-content/60 -mt-1">
                Community Impact
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 font-bold'
                  : 'text-base-content/80 hover:text-emerald-600 hover:bg-base-200/60'
              }`}
            >
              Home
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 font-bold'
                    : 'text-base-content/80 hover:text-emerald-600 hover:bg-base-200/60'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Quick access for logged-in users */}
            {user && (
              <Link
                href="/create-event"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive('/create-event')
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 font-bold'
                    : 'text-base-content/80 hover:text-emerald-600 hover:bg-base-200/60'
                }`}
              >
                <FiPlusCircle className="w-4 h-4 text-emerald-500" />
                <span>Create Event</span>
              </Link>
            )}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-base-300 text-base-content hover:bg-base-200 hover:border-emerald-500 transition-all duration-200"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                <FiMoon className="w-4 h-4 text-indigo-400" />
              ) : (
                <FiSun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {/* Conditional Authentication */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* Profile Picture with Tooltip & Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div className="tooltip tooltip-bottom" data-tip={user.name || 'Volunteer'}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 p-0.5 rounded-full ring-2 ring-emerald-500/40 hover:ring-emerald-500 focus:outline-none transition-all duration-200"
                      aria-label="User menu"
                    >
                      <img
                        src={
                          user.photoURL ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                        }
                        alt={user.name || 'User'}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';
                        }}
                      />
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-base-100 border border-base-300 shadow-2xl py-2 z-50 animate-fade-in-up">
                      {/* User Header */}
                      <div className="px-4 py-3 border-b border-base-200 flex items-center gap-3">
                        <img
                          src={
                            user.photoURL ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                          }
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                        />
                        <div className="overflow-hidden">
                          <p className="font-bold text-sm text-base-content truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-base-content/60 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Dropdown Links */}
                      <div className="py-1 text-sm">
                        <Link
                          href="/create-event"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-base-content hover:text-emerald-600 font-medium transition-colors"
                        >
                          <FiPlusCircle className="w-4 h-4 text-emerald-500" />
                          <span>Create Event</span>
                        </Link>

                        <Link
                          href="/manage-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-base-content hover:text-emerald-600 font-medium transition-colors"
                        >
                          <FiList className="w-4 h-4 text-blue-500" />
                          <span>Manage Events</span>
                        </Link>

                        <Link
                          href="/joined-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-base-content hover:text-emerald-600 font-medium transition-colors"
                        >
                          <FiCheckCircle className="w-4 h-4 text-teal-500" />
                          <span>Joined Events</span>
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-base-content hover:text-emerald-600 font-medium transition-colors"
                        >
                          <FiUser className="w-4 h-4 text-purple-500" />
                          <span>Volunteer Profile</span>
                        </Link>
                      </div>

                      {/* Logout Button */}
                      <div className="border-t border-base-200 pt-1">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm font-semibold transition-colors text-left"
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Logout Button */}
                <button
                  onClick={logout}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold transition-all duration-200"
                  title="Sign out of Altru"
                >
                  <FiLogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-base-300 text-base-content hover:border-emerald-500 hover:text-emerald-600 text-xs font-bold transition-all duration-200"
                >
                  <FiLogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>

                <Link
                  href="/register"
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 text-xs font-bold shadow-sm transition-all duration-200"
                >
                  <FiUserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-base-content hover:bg-base-200 transition-colors"
              aria-label="Toggle mobile navigation"
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-base-100 border-b border-base-300 shadow-xl px-5 py-4 space-y-2 animate-fade-in-up">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 font-semibold text-sm"
          >
            <span>Home</span>
          </Link>

          <Link
            href="/events"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 font-semibold text-sm"
          >
            <FiCalendar className="w-4 h-4 text-emerald-500" />
            <span>Upcoming Events</span>
          </Link>

          {user ? (
            <div className="pt-2 border-t border-base-200 space-y-2">
              <div className="flex items-center gap-2.5 px-3 py-1.5 bg-base-200/50 rounded-lg">
                <img
                  src={
                    user.photoURL ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                  }
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="overflow-hidden">
                  <p className="font-bold text-xs truncate">{user.name}</p>
                  <p className="text-[10px] text-base-content/60 truncate">{user.email}</p>
                </div>
              </div>

              <Link
                href="/create-event"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 font-medium text-sm"
              >
                <FiPlusCircle className="w-4 h-4 text-emerald-500" />
                <span>Create Event</span>
              </Link>

              <Link
                href="/manage-events"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 font-medium text-sm"
              >
                <FiList className="w-4 h-4 text-blue-500" />
                <span>Manage Events</span>
              </Link>

              <Link
                href="/joined-events"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 font-medium text-sm"
              >
                <FiCheckCircle className="w-4 h-4 text-teal-500" />
                <span>Joined Events</span>
              </Link>

              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 font-medium text-sm"
              >
                <FiUser className="w-4 h-4 text-purple-500" />
                <span>Volunteer Profile</span>
              </Link>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg font-bold text-sm text-left"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-base-200 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 border border-base-300 rounded-lg font-bold text-xs"
              >
                <FiLogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-bold text-xs"
              >
                <FiUserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
