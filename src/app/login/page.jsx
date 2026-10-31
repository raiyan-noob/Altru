"use client";
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  FiMail,
  FiLock,
  FiLogIn,
  FiUserPlus,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from 'react-icons/fi';
import { FaHandsHelping, FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

function LoginForm() {
  const { login, googleSignIn, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/events';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect
  if (user) {
    router.push(redirectUrl);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter both your email address and password.',
      });
      return;
    }

    setSubmitting(true);
    const result = await login(email.trim(), password);
    setSubmitting(false);

    if (result.success) {
      router.push(redirectUrl);
    }
  };

  const handleGoogleLogin = async () => {
    // Interactive Google login modal for user profile
    const { value: formValues } = await Swal.fire({
      title: 'Google One-Click Sign In',
      html:
        '<p class="text-xs text-gray-500 mb-3">Sign in using your Google Volunteer Profile</p>' +
        '<input id="swal-input-name" class="swal2-input text-xs" placeholder="Your Full Name" value="Volunteer User">' +
        '<input id="swal-input-email" class="swal2-input text-xs" placeholder="Google Email" value="volunteer.dhaka@gmail.com">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Continue with Google',
      confirmButtonColor: '#059669',
      preConfirm: () => {
        const name = document.getElementById('swal-input-name').value;
        const email = document.getElementById('swal-input-email').value;
        if (!email) {
          Swal.showValidationMessage('Please enter an email address');
        }
        return { name, email };
      },
    });

    if (formValues) {
      setSubmitting(true);
      const result = await googleSignIn({
        name: formValues.name || 'Google Volunteer',
        email: formValues.email,
        photoURL:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      });
      setSubmitting(false);

      if (result.success) {
        router.push(redirectUrl);
      }
    }
  };

  // Quick fill demo credentials
  const fillDemo = (role) => {
    if (role === 'organizer') {
      setEmail('organizer.tanvir@gmail.com');
      setPassword('AltruVolunteer2026!');
    } else {
      setEmail('volunteer@altru.org');
      setPassword('AltruVolunteer2026!');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-base-100">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Banner */}
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
            Welcome Back, Changemaker
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Log in to manage community drives, view RSVPs, and coordinate with volunteers.
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                  Password
                </label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 mt-2"
            >
              <FiLogIn className="w-4 h-4" />
              <span>{submitting ? 'Verifying Credentials...' : 'Log In to Account'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-base-300 w-full"></div>
            <span className="bg-base-100 px-3 text-[11px] font-bold uppercase tracking-wider text-base-content/50">
              Or Continue With
            </span>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="w-full py-2.5 rounded-xl border border-base-300 hover:bg-base-200 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold text-base-content transition-all shadow-sm"
          >
            <FaGoogle className="w-4 h-4 text-red-500" />
            <span>Sign in with Google</span>
          </button>

          {/* Quick Demo Credentials */}
          <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 text-xs space-y-1.5">
            <p className="font-bold text-base-content/70 text-[11px] uppercase tracking-wider">
              Quick Demo Fill:
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemo('organizer')}
                className="px-2.5 py-1 rounded bg-base-100 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-base-300 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300"
              >
                Organizer Account
              </button>
              <button
                type="button"
                onClick={() => fillDemo('volunteer')}
                className="px-2.5 py-1 rounded bg-base-100 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-base-300 text-[11px] font-semibold text-teal-700 dark:text-teal-300"
              >
                Volunteer Account
              </button>
            </div>
          </div>

          {/* Link to Register */}
          <p className="text-center text-xs text-base-content/70">
            Don&apos;t have a volunteer account yet?{' '}
            <Link
              href="/register"
              className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Register Here</span>
              <FiArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="loading loading-spinner loading-md text-emerald-600"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
