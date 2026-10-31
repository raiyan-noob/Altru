"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AuthContext = createContext();

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on initial load
  useEffect(() => {
    async function restoreSession() {
      try {
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
              // Token expired
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

  // Email & Password Registration
  const register = async ({ name, email, photoURL, password }) => {
    try {
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

  // Email & Password Login
  const login = async (email, password) => {
    try {
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

  // Google Login / Registration
  const googleSignIn = async (profileData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Google sign-in failed');
      }

      localStorage.setItem('altru_token', data.token);
      localStorage.setItem('altru_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      Swal.fire({
        icon: 'success',
        title: 'Google Login Successful!',
        text: `Welcome, ${data.user.name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true, user: data.user };
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Google Auth Error',
        text: err.message,
      });
      return { success: false, error: err.message };
    }
  };

  // Profile Update (Name & PhotoURL)
  const updateProfile = async ({ name, photoURL }) => {
    try {
      if (!token) throw new Error('You must be logged in to update your profile.');

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

      if (data.token) {
        localStorage.setItem('altru_token', data.token);
        setToken(data.token);
      }

      localStorage.setItem('altru_user', JSON.stringify(data.user));
      setUser(data.user);

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your personal information has been saved.',
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true, user: data.user };
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Error',
        text: err.message,
      });
      return { success: false, error: err.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('altru_token');
    localStorage.removeItem('altru_user');
    setUser(null);
    setToken(null);

    Swal.fire({
      icon: 'info',
      title: 'Logged Out',
      text: 'You have been logged out of Altru.',
      timer: 1800,
      showConfirmButton: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        googleSignIn,
        updateProfile,
        logout,
        apiBase: API_BASE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

