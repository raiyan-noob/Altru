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
import { FaGoogle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function LoginForm() {
  const { login, googleSignIn, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect to homepage ('/') after successful login by default
  const redirectUrl = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect to homepage
  if (user) {
    router.push(redirectUrl);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('Please enter both your email address and password.');
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
      toast.success('🎉 Welcome back! You are now logged in.', { icon: '👋' });
      // Redirects to homepage ('/')
      router.push(redirectUrl);
    }
  };

  const handleGoogleLogin = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Google One-Click Sign In',
      html:
        '<p class="text-xs text-gray-500 mb-3">Sign in using your Google Volunteer Profile</p>' +
        '<input id="swal-input-name" class="swal2-input text-xs" placeholder="Your Full Name" value="Volunteer User">' +
        '<input id="swal-input-email" class="swal2-input text-xs" placeholder="Google Email" value="volunteer.dhaka@gmail.com">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Continue with Google',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#4f46e5',
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
        toast.success(`Google authentication confirmed! Welcome, ${formValues.name}.`);
        // Redirects to homepage ('/')
        router.push(redirectUrl);
      }
    }
  };

  // Quick fill demo credentials
  const fillDemo = (role) => {
    if (role === 'organizer') {
      setEmail('tahmid.rahman@altru.org');
      setPassword('AltruPass123');
    } else {
      setEmail('nusrat.jahan@altru.org');
      setPassword('AltruPass123');
    }
    toast.info(`Filled credentials for ${role}`, { autoClose: 1000, hideProgressBar: true });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-base-100">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Banner */}
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
            Welcome Back, Changemaker
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Log in to manage community drives, view RSVPs, and coordinate with volunteers.
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-soft space-y-6">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm font-medium"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <FiLogIn className="w-4 h-4" />
              <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300"></div>
            </div>
            <span className="relative bg-base-100 px-3 text-[11px] uppercase font-bold text-base-content/50">
              Or Connect With
            </span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="w-full py-2.5 rounded-2xl border border-base-300 hover:bg-base-200 text-base-content text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm"
          >
            <FaGoogle className="w-4 h-4 text-rose-500" />
            <span>Continue with Google</span>
          </button>

          {/* Demo Login Quick Fill */}
          <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/70 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 block text-center">
              Quick Demo Fill
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('organizer')}
                className="py-1.5 px-2 rounded-xl bg-base-100 border border-base-300 hover:border-brand-500 text-[11px] font-bold text-base-content transition-all"
              >
                Lead Organizer
              </button>
              <button
                type="button"
                onClick={() => fillDemo('volunteer')}
                className="py-1.5 px-2 rounded-xl bg-base-100 border border-base-300 hover:border-brand-500 text-[11px] font-bold text-base-content transition-all"
              >
                Volunteer
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center pt-1 border-t border-base-200">
            <p className="text-xs text-base-content/70">
              Don&apos;t have an account yet?{' '}
              <Link href="/register" className="font-bold text-brand-600 hover:underline">
                Register as Volunteer →
              </Link>
            </p>
          </div>
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
          <span className="loading loading-spinner loading-lg text-brand-600"></span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
