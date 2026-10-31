"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  FiUser,
  FiMail,
  FiImage,
  FiLock,
  FiUserPlus,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiX,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const { register, user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect
  if (user) {
    router.push('/events');
    return null;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Password validation checks
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasMinLength = formData.password.length >= 6;
  const isPasswordValid = hasUpperCase && hasLowerCase && hasMinLength;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your full name.');
      Swal.fire({ icon: 'warning', title: 'Missing Name', text: 'Please enter your full display name.' });
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email address.');
      Swal.fire({ icon: 'warning', title: 'Missing Email', text: 'Please enter your email address.' });
      return;
    }

    // Strict Password Validation as required:
    // "must have an uppercase letter, a lowercase letter, and a length of at least 6 characters. If any of these requirements isn't fulfilled, show an error message/toast."
    if (!hasMinLength) {
      toast.error('Password must be at least 6 characters long.');
      Swal.fire({
        icon: 'error',
        title: 'Password Too Short',
        text: 'Password must be at least 6 characters long.',
      });
      return;
    }

    if (!hasUpperCase) {
      toast.error('Password must contain at least one uppercase letter (A-Z).');
      Swal.fire({
        icon: 'error',
        title: 'Missing Uppercase Letter',
        text: 'Password must contain at least one uppercase letter (A-Z).',
      });
      return;
    }

    if (!hasLowerCase) {
      toast.error('Password must contain at least one lowercase letter (a-z).');
      Swal.fire({
        icon: 'error',
        title: 'Missing Lowercase Letter',
        text: 'Password must contain at least one lowercase letter (a-z).',
      });
      return;
    }

    setSubmitting(true);
    const result = await register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      photoURL:
        formData.photoURL.trim() ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      password: formData.password,
    });
    setSubmitting(false);

    if (result.success) {
      toast.success('🎉 Welcome to Altru! Account created successfully via BetterAuth.', { icon: '✨' });
      router.push('/');
    }
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-base-100">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-500 flex items-center justify-center text-white shadow-glow">
              <HiSparkles className="w-5 h-5 text-amber-200" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Altru
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-base-content tracking-tight">
            Register as Volunteer
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Join thousands of compassionate citizens mobilizing for local community causes.
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-soft space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                Full Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Tanvir Hossain"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                Profile Photo URL
              </label>
              <div className="relative">
                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Sample Avatar Pickers */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-base-content/50">Preset Avatar:</span>
                {sampleAvatars.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, photoURL: av }));
                      toast.info('Avatar selected', { autoClose: 900, hideProgressBar: true });
                    }}
                    className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                      formData.photoURL === av ? 'border-brand-500 scale-105' : 'border-base-300'
                    }`}
                  >
                    <img src={av} alt="Preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>

              {/* Interactive Live Password Validation Hints */}
              <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/80 space-y-1.5 text-[11px]">
                <p className="font-bold text-base-content/70">Password Requirements:</p>
                <div className="grid grid-cols-1 gap-1">
                  <div
                    className={`flex items-center gap-1.5 ${
                      hasMinLength ? 'text-brand-600 font-semibold' : 'text-base-content/50'
                    }`}
                  >
                    {hasMinLength ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
                    <span>At least 6 characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ${
                      hasUpperCase ? 'text-brand-600 font-semibold' : 'text-base-content/50'
                    }`}
                  >
                    {hasUpperCase ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
                    <span>At least one uppercase letter (A-Z)</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ${
                      hasLowerCase ? 'text-brand-600 font-semibold' : 'text-base-content/50'
                    }`}
                  >
                    {hasLowerCase ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
                    <span>At least one lowercase letter (a-z)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <FiUserPlus className="w-4 h-4" />
              <span>{submitting ? 'Registering via BetterAuth...' : 'Create Account with BetterAuth'}</span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center pt-2 border-t border-base-200">
            <p className="text-xs text-base-content/70">
              Already registered?{' '}
              <Link href="/login" className="font-bold text-brand-600 hover:underline">
                Sign in to your account →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
