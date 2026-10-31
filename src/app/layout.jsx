import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Altru — Community-Driven Social Development Events Platform',
  description:
    'Altru empowers local communities across Bangladesh to create, join, and track social service events. From winter clothes and blanket distributions to cleanups and free medical camps, make an impact today.',
  keywords: [
    'Altru',
    'Social Service Bangladesh',
    'Winter Clothes Distribution',
    'Blanket Distribution',
    'Community Events',
    'Dhaka Volunteer',
    'NGO Events',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body className="bg-base-100 text-base-content min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              theme="colored"
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

