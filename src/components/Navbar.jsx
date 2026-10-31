"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'react-toastify';
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
  FiCompass,
} from 'react-icons/fi';
import { FaHandsHelping } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

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

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    toast.info('Signed out safely. See you soon!', {
      icon: '👋',
    });
    router.push('/');
  };

  const navLinks = [
    { name: 'Upcoming Events', href: '/events', icon: <FiCalendar className="w-4 h-4" /> },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-base-100/90 backdrop-blur-xl shadow-soft border-b border-base-300/80 py-2.5'
          : 'bg-base-100/80 backdrop-blur-md border-b border-base-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
              <FaHandsHelping className="w-5 h-5 text-amber-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Altru
              </span>
              <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-base-content/60 -mt-1">
                Civic Network Bangladesh
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-base-200/60 border border-base-300/50 backdrop-blur-sm">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-base-content/75 hover:text-brand-600 hover:bg-base-100'
              }`}
            >
              Home
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-base-content/75 hover:text-brand-600 hover:bg-base-100'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {user && (
              <Link
                href="/create-event"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive('/create-event')
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30'
                }`}
              >
                <FiPlusCircle className="w-3.5 h-3.5" />
                <span>Host Event</span>
              </Link>
            )}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                toggleTheme();
                toast.success(
                  theme === 'light' ? '🌙 Dark ambiance active' : '☀️ Soft light ambiance active',
                  { autoClose: 1200, hideProgressBar: true }
                );
              }}
              className="p-2.5 rounded-xl border border-base-300/80 bg-base-100 text-base-content hover:bg-base-200 hover:border-brand-400 transition-all duration-200 shadow-sm"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                <FiMoon className="w-4 h-4 text-sky-400" />
              ) : (
                <FiSun className="w-4 h-4 text-warm-500" />
              )}
            </button>

            {/* Conditional Authentication */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* Profile Picture with Tooltip & Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div className="tooltip tooltip-bottom font-medium text-xs" data-tip={user.name || 'Volunteer'}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-base-300/80 bg-base-100 hover:border-brand-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 shadow-sm"
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-500/40 bg-gradient-to-br from-brand-500 to-sky-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.name || 'User'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          (user.name || 'U').charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="hidden sm:inline-block text-xs font-semibold max-w-[110px] truncate text-base-content">
                        {user.name?.split(' ')[0] || 'Volunteer'}
                      </span>
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-base-100 border border-base-300 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {/* User Header */}
                      <div className="px-4 py-3 border-b border-base-200 bg-base-200/40">
                        <p className="text-xs font-bold text-base-content truncate">{user.name}</p>
                        <p className="text-[11px] text-base-content/60 truncate">{user.email}</p>
                        <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                          Verified Volunteer
                        </span>
                      </div>

                      {/* Dropdown Items (Private Routes) */}
                      <div className="py-1">
                        <Link
                          href="/create-event"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-base-content hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 transition-colors"
                        >
                          <FiPlusCircle className="w-4 h-4 text-brand-500" />
                          <span>Create New Event</span>
                        </Link>

                        <Link
                          href="/manage-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-base-content hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 transition-colors"
                        >
                          <FiList className="w-4 h-4 text-sky-500" />
                          <span>Manage Hosted Events</span>
                        </Link>

                        <Link
                          href="/joined-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-base-content hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 transition-colors"
                        >
                          <FiCheckCircle className="w-4 h-4 text-amber-500" />
                          <span>My Joined Events</span>
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-base-content hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 transition-colors"
                        >
                          <FiUser className="w-4 h-4 text-indigo-500" />
                          <span>Profile & Impact</span>
                        </Link>
                      </div>

                      {/* Logout Button */}
                      <div className="border-t border-base-200 pt-1 mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Logout Button */}
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-base-300 text-xs font-semibold text-base-content/80 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all duration-200"
                  title="Logout"
                >
                  <FiLogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              /* If not logged in -> Show Login button */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-base-content/80 hover:text-brand-600 hover:bg-base-200 transition-all duration-200"
                >
                  <FiLogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-md shadow-brand-500/20 hover:shadow-glow transition-all duration-200"
                >
                  <FiUserPlus className="w-3.5 h-3.5" />
                  <span>Join Altru</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl border border-base-300 text-base-content hover:bg-base-200 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-base-200 space-y-1.5 animate-in slide-in-from-top-2 duration-150">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold ${
                isActive('/') ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300' : 'text-base-content hover:bg-base-200'
              }`}
            >
              <FiCompass className="w-4 h-4 text-brand-500" />
              <span>Home</span>
            </Link>

            <Link
              href="/events"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold ${
                isActive('/events') ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300' : 'text-base-content hover:bg-base-200'
              }`}
            >
              <FiCalendar className="w-4 h-4 text-sky-500" />
              <span>Upcoming Events</span>
            </Link>

            {user ? (
              <>
                <div className="pt-2 pb-1 px-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50">
                    Organizer Workspace
                  </span>
                </div>

                <Link
                  href="/create-event"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
                >
                  <FiPlusCircle className="w-4 h-4 text-brand-500" />
                  <span>Create Event</span>
                </Link>

                <Link
                  href="/manage-events"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
                >
                  <FiList className="w-4 h-4 text-sky-500" />
                  <span>Manage Events</span>
                </Link>

                <Link
                  href="/joined-events"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
                >
                  <FiCheckCircle className="w-4 h-4 text-amber-500" />
                  <span>Joined Events</span>
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
                >
                  <FiUser className="w-4 h-4 text-indigo-500" />
                  <span>My Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-base-300 text-xs font-semibold text-base-content hover:bg-base-200"
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 shadow-sm"
                >
                  <FiUserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
