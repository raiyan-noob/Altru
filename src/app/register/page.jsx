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
import { FaHandsHelping } from 'react-icons/fa';
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
      Swal.fire({ icon: 'warning', title: 'Missing Name', text: 'Please enter your full display name.' });
      return;
    }

    if (!formData.email.trim()) {
      Swal.fire({ icon: 'warning', title: 'Missing Email', text: 'Please enter your email address.' });
      return;
    }

    // Strict Password Validation as required:
    // "must have an uppercase letter, a lowercase letter, and a length of at least 6 characters. If any of these requirements isn't fulfilled, show an error message/toast."
    if (!hasMinLength) {
      Swal.fire({
        icon: 'error',
        title: 'Password Too Short',
        text: 'Password must be at least 6 characters long.',
      });
      return;
    }

    if (!hasUpperCase) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Uppercase Letter',
        text: 'Password must contain at least one uppercase letter (A-Z).',
      });
      return;
    }

    if (!hasLowerCase) {
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
      router.push('/events');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-base-100">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25">
              <FaHandsHelping className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Altru
            </span>
          </Link>
          <h1 className="text-2xl font-black text-base-content tracking-tight">
            Join the Altru Movement
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Create your volunteer profile to discover and join community events.
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
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
                  placeholder="e.g. Nusrat Jahan"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
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
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-1">
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
                  placeholder="https://images.unsplash.com/... (optional)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
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
                  placeholder="Create a secure password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
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

              {/* Password Requirement Indicators */}
              <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 text-xs space-y-1 mt-1.5">
                <p className="font-bold text-[10px] uppercase text-base-content/60">
                  Password Requirements:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-[11px]">
                  <span
                    className={`flex items-center gap-1 ${
                      hasMinLength ? 'text-emerald-600 font-bold' : 'text-base-content/50'
                    }`}
                  >
                    {hasMinLength ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
                    <span>6+ characters</span>
                  </span>

                  <span
                    className={`flex items-center gap-1 ${
                      hasUpperCase ? 'text-emerald-600 font-bold' : 'text-base-content/50'
                    }`}
                  >
                    {hasUpperCase ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
                    <span>1 uppercase (A-Z)</span>
                  </span>

                  <span
                    className={`flex items-center gap-1 ${
                      hasLowerCase ? 'text-emerald-600 font-bold' : 'text-base-content/50'
                    }`}
                  >
                    {hasLowerCase ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
                    <span>1 lowercase (a-z)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 mt-4"
            >
              <FiUserPlus className="w-4 h-4" />
              <span>{submitting ? 'Creating Volunteer Account...' : 'Register as Volunteer'}</span>
            </button>
          </form>

          {/* Link to Login */}
          <p className="text-center text-xs text-base-content/70 pt-2 border-t border-base-200">
            Already registered on Altru?{' '}
            <Link
              href="/login"
              className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Log In Here</span>
              <FiArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
