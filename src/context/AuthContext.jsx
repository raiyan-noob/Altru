"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  authClient,
  signIn as betterSignIn,
  signUp as betterSignUp,
  signOut as betterSignOut,
} from '@/lib/auth-client';
import Swal from 'sweetalert2';

const AuthContext = createContext();

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from BetterAuth / localStorage on initial load
  useEffect(() => {
    async function restoreSession() {
      try {
        // 1. Check BetterAuth session first (handles Google OAuth redirect callbacks)
        try {
          if (authClient && typeof authClient.getSession === 'function') {
            const sessionRes = await authClient.getSession();
            if (sessionRes?.data?.user) {
              const baUser = sessionRes.data.user;

              // Ensure MongoDB backend and stateless JWT token are synchronized
              try {
                const syncRes = await fetch(`${API_BASE}/auth/google`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: baUser.name,
                    email: baUser.email,
                    photoURL: baUser.image || '',
                  }),
                });

                const syncData = await syncRes.json();
                if (syncData.success && syncData.token) {
                  localStorage.setItem('altru_token', syncData.token);
                  localStorage.setItem('altru_user', JSON.stringify(syncData.user));
                  setToken(syncData.token);
                  setUser(syncData.user);
                  setLoading(false);
                  return;
                }
              } catch (syncErr) {
                console.warn('Backend session sync notice:', syncErr);
              }

              // Fallback to direct BetterAuth profile
              const directUser = {
                id: baUser.id,
                name: baUser.name,
                email: baUser.email,
                photoURL: baUser.image,
                role: 'volunteer',
              };
              setUser(directUser);
              setLoading(false);
              return;
            }
          }
        } catch (baCheckErr) {
          console.warn('BetterAuth getSession check:', baCheckErr);
        }

        // 2. Restore from stored local session
        const storedToken = localStorage.getItem('altru_token');
        const storedUser = localStorage.getItem('altru_user');

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);

          // Verify with server in background to refresh data
          try {
            const res = await fetch(`${API_BASE}/auth/me`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            const data = await res.json();
            if (data.success && data.user) {
              setUser(data.user);
              localStorage.setItem('altru_user', JSON.stringify(data.user));
            } else if (res.status === 401 || res.status === 403) {
              localStorage.removeItem('altru_token');
              localStorage.removeItem('altru_user');
              setUser(null);
              setToken(null);
            }
          } catch (netErr) {
            // Keep stored user if offline
          }
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  // Email & Password Registration via BetterAuth
  const register = async ({ name, email, photoURL, password }) => {
    try {
      // 1. BetterAuth registration
      try {
        await betterSignUp.email({
          email,
          password,
          name,
          image: photoURL,
        });
      } catch (baErr) {
        console.warn('BetterAuth sign-up response notice:', baErr);
      }

      // 2. Synchronize with MongoDB database and retrieve API JWT
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, photoURL, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Save token and user
      localStorage.setItem('altru_token', data.token);
      localStorage.setItem('altru_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      Swal.fire({
        icon: 'success',
        title: 'Welcome to Altru!',
        text: 'Your volunteer account has been created successfully.',
        timer: 2200,
        showConfirmButton: false,
      });

      return { success: true, user: data.user };
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.message,
      });
      return { success: false, error: err.message };
    }
  };

  // Email & Password Login via BetterAuth
  const login = async (email, password) => {
    try {
      // 1. BetterAuth client sign in
      try {
        await betterSignIn.email({
          email,
          password,
        });
      } catch (baErr) {
        console.warn('BetterAuth sign-in response notice:', baErr);
      }

      // 2. Authenticate with backend and retrieve stateless JWT token
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      localStorage.setItem('altru_token', data.token);
      localStorage.setItem('altru_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: `Logged in as ${data.user.name}`,
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true, user: data.user };
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: err.message,
      });
      return { success: false, error: err.message };
    }
  };

  // Pure Google OAuth Login via BetterAuth
  const googleSignIn = async (callbackPath = '/') => {
    try {
      if (typeof window !== 'undefined' && authClient?.signIn?.social) {
        const fullCallbackURL = callbackPath.startsWith('http')
          ? callbackPath
          : `${window.location.origin}${callbackPath}`;

        await authClient.signIn.social({
          provider: 'google',
          callbackURL: fullCallbackURL,
        });
      }
    } catch (err) {
      console.error('BetterAuth Google Sign In Error:', err);
      throw err;
    }
  };

  // Logout via BetterAuth
  const logout = async () => {
    try {
      await betterSignOut();
    } catch (e) {
      console.warn('BetterAuth sign out notice:', e);
    }
    localStorage.removeItem('altru_token');
    localStorage.removeItem('altru_user');
    setUser(null);
    setToken(null);
  };

  // Update profile
  const updateProfile = async ({ name, photoURL }) => {
    try {
      if (!token) throw new Error('Not authenticated');

      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, photoURL }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setUser(data.user);
      localStorage.setItem('altru_user', JSON.stringify(data.user));

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile changes have been saved.',
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true, user: data.user };
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.message,
      });
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        googleSignIn,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        authClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
