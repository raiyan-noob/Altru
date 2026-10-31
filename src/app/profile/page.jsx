"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import {
  FiUser,
  FiMail,
  FiImage,
  FiSave,
  FiCalendar,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
} from 'react-icons/fi';
import Swal from 'sweetalert2';

function ProfileContent() {
  const { user, token, updateProfile } = useAuth();

  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [saving, setSaving] = useState(false);

  const [stats, setStats] = useState({
    createdCount: 0,
    joinedCount: 0,
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  // Fetch user stats
  useEffect(() => {
    async function loadStats() {
      if (!token) return;
      try {
        const [resMy, resJoined] = await Promise.all([
          fetch(`${apiUrl}/events/user/my-events`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${apiUrl}/joined-events/my-joined`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const dataMy = await resMy.json();
        const dataJoined = await resJoined.json();

        setStats({
          createdCount: dataMy.count || 0,
          joinedCount: dataJoined.count || 0,
        });
      } catch (e) {
        console.error('Failed to load user stats:', e);
      }
    }

    loadStats();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Display name cannot be empty.',
      });
      return;
    }

    setSaving(true);
    await updateProfile({
      name: name.trim(),
      photoURL: photoURL.trim(),
    });
    setSaving(false);
  };

  return (
    <div className="py-10 sm:py-16 px-4 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-base-200 pb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Account Preferences
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
            Volunteer Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            View your community contributions and update your public organizer profile.
          </p>
        </div>

        {/* Profile Card & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Avatar & Impact summary (5 cols) */}
          <div className="md:col-span-5 bg-base-100 rounded-3xl border border-base-300 p-6 space-y-6 shadow-sm text-center">
            <div className="relative inline-block mx-auto">
              <img
                src={
                  photoURL ||
                  user?.photoURL ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                }
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-emerald-500/30"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';
                }}
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-base-100 flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            </div>

            <div>
              <h2 className="text-lg font-black text-base-content">{user?.name}</h2>
              <p className="text-xs text-base-content/60 font-mono">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold uppercase">
                Verified Community Member
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-base-200">
              <Link
                href="/manage-events"
                className="p-3 bg-base-200/60 hover:bg-base-200 rounded-2xl text-center space-y-1 transition-colors"
              >
                <p className="text-2xl font-black text-emerald-600">{stats.createdCount}</p>
                <p className="text-[11px] font-bold text-base-content/70 flex items-center justify-center gap-1">
                  <FiCalendar className="w-3 h-3" />
                  <span>Hosted</span>
                </p>
              </Link>

              <Link
                href="/joined-events"
                className="p-3 bg-base-200/60 hover:bg-base-200 rounded-2xl text-center space-y-1 transition-colors"
              >
                <p className="text-2xl font-black text-teal-600">{stats.joinedCount}</p>
                <p className="text-[11px] font-bold text-base-content/70 flex items-center justify-center gap-1">
                  <FiCheckCircle className="w-3 h-3" />
                  <span>Joined</span>
                </p>
              </Link>
            </div>
          </div>

          {/* Right Column: Edit Profile Form (7 cols) */}
          <div className="md:col-span-7 bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 space-y-5 shadow-sm">
            <h3 className="font-bold text-base text-base-content border-b border-base-200 pb-3">
              Update Personal Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-base-content/70 text-[11px] flex items-center gap-1.5">
                  <FiUser className="text-emerald-500" />
                  <span>Display Name *</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                  required
                />
              </div>

              {/* Email Address (Read-only for security) */}
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-base-content/70 text-[11px] flex items-center gap-1.5">
                  <FiMail className="text-emerald-500" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl bg-base-200/60 border border-base-300 text-xs sm:text-sm text-base-content/50 font-mono cursor-not-allowed"
                />
                <span className="text-[10px] text-base-content/50">
                  Account email address cannot be modified directly.
                </span>
              </div>

              {/* Profile Photo URL */}
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-base-content/70 text-[11px] flex items-center gap-1.5">
                  <FiImage className="text-emerald-500" />
                  <span>Profile Photo URL</span>
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Submit */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
}

