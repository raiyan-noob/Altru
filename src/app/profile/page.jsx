"use client";
import React, { useState, useEffect, useRef } from 'react';
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
  FiUpload,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function ProfileContent() {
  const { user, token, updateProfile } = useAuth();

  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warn('Please select an image smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoURL(reader.result);
        toast.success('Photo loaded from your device!', { icon: '📷' });
      };
      reader.readAsDataURL(file);
    }
  };

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
      toast.error('Display name cannot be empty.');
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Display name cannot be empty.',
      });
      return;
    }

    setSaving(true);
    const result = await updateProfile({
      name: name.trim(),
      photoURL: photoURL.trim(),
    });
    setSaving(false);

    if (result && result.success) {
      toast.success('✨ Profile updated successfully!');
    }
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  ];

  return (
    <div className="py-12 sm:py-16 px-4 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-base-200 pb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Account Preferences
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
            Volunteer Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            View your community contributions and update your public organizer profile.
          </p>
        </div>

        {/* Profile Card & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Avatar & Impact summary (5 cols) */}
          <div className="md:col-span-5 bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-7 space-y-6 shadow-soft text-center">
            <div className="relative inline-block mx-auto">
              <img
                src={
                  photoURL ||
                  user?.photoURL ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                }
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-brand-500/30 shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';
                }}
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-600 border-2 border-base-100 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-base-content">{user?.name}</h2>
              <p className="text-xs text-base-content/60 font-mono">{user?.email}</p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-[11px] font-bold uppercase">
                  Verified Civic Member
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-base-200">
              <Link
                href="/manage-events"
                className="p-3.5 bg-base-200/50 hover:bg-base-200 rounded-2xl text-center space-y-1 transition-colors border border-base-300/50"
              >
                <p className="text-2xl font-black text-brand-600">{stats.createdCount}</p>
                <p className="text-[11px] font-bold text-base-content/70 flex items-center justify-center gap-1">
                  <FiCalendar className="w-3.5 h-3.5 text-brand-500" />
                  <span>Hosted</span>
                </p>
              </Link>

              <Link
                href="/joined-events"
                className="p-3.5 bg-base-200/50 hover:bg-base-200 rounded-2xl text-center space-y-1 transition-colors border border-base-300/50"
              >
                <p className="text-2xl font-black text-sky-600">{stats.joinedCount}</p>
                <p className="text-[11px] font-bold text-base-content/70 flex items-center justify-center gap-1">
                  <FiCheckCircle className="w-3.5 h-3.5 text-sky-500" />
                  <span>Joined</span>
                </p>
              </Link>
            </div>

            <div className="text-left text-xs text-base-content/60 pt-2 space-y-1.5 border-t border-base-200">
              <p className="flex items-center gap-1.5 font-bold text-base-content/80">
                <FiShield className="w-4 h-4 text-brand-500" />
                <span>Account Protection</span>
              </p>
              <p className="leading-relaxed">
                Your profile details appear on events you host and in the volunteer roster for events you attend.
              </p>
            </div>
          </div>

          {/* Right Column: Update Profile Form (7 cols) */}
          <div className="md:col-span-7 bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 space-y-6 shadow-soft">
            <h3 className="font-extrabold text-base sm:text-lg text-base-content border-b border-base-200 pb-3">
              Update Profile Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                  <FiMail className="w-4 h-4 text-brand-500" />
                  <span>Registered Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 rounded-2xl bg-base-200 text-base-content/50 border border-base-300 cursor-not-allowed text-xs sm:text-sm font-mono"
                />
                <span className="text-[10px] text-base-content/40">
                  Email address is linked to your account and cannot be modified.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                  <FiUser className="w-4 h-4 text-brand-500" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                    <FiImage className="w-4 h-4 text-brand-500" />
                    <span>Profile Photo</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-brand-600 hover:text-brand-500 hover:underline flex items-center gap-1"
                  >
                    <FiUpload className="w-3 h-3" />
                    <span>Choose from device</span>
                  </button>
                </div>

                <div className="relative flex items-center">
                  <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50 pointer-events-none" />
                  <input
                    type="text"
                    value={
                      photoURL.startsWith('data:')
                        ? 'Image selected from device (Click to change)'
                        : photoURL
                    }
                    onChange={(e) => setPhotoURL(e.target.value)}
                    onClick={() => fileInputRef.current?.click()}
                    placeholder="Click to choose from device or paste image URL"
                    className="w-full pl-10 pr-24 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm transition-all cursor-pointer"
                    readOnly={photoURL.startsWith('data:')}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-2 px-2.5 py-1 rounded-xl bg-brand-600/10 hover:bg-brand-600 text-brand-600 hover:text-white text-[11px] font-bold transition-all flex items-center gap-1"
                  >
                    <FiUpload className="w-3 h-3" />
                    <span>Browse</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-base-content/60 block mb-1.5">
                    Or select an avatar preset:
                  </span>
                  <div className="flex items-center gap-2">
                    {sampleAvatars.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setPhotoURL(av);
                          toast.info('Avatar chosen', { autoClose: 900, hideProgressBar: true });
                        }}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                          photoURL === av ? 'border-brand-500 scale-105' : 'border-base-300'
                        }`}
                      >
                        <img src={av} alt="Preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{saving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
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
