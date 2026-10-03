import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import NotificationToast from '@/components/NotificationToast';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sajith Eye Care Opticals | Avinashi',
  description: 'Avinashi’s premier optical & contact lens clinic. Explore our curated eyeglasses, UV sunglasses, blue-cut computer glasses, and kids eyewear collection.',
  keywords: [
    'Sajith Eye Care',
    'Sajiith Eye Care',
    'Opticals Avinashi',
    'Eyewear store Avinashi',
    'Contact Lens Clinic Avinashi',
    'Spectacles Tiruppur',
    'Blue cut glasses Avinashi',
  ],
  authors: [{ name: 'Sajith Eye Care Opticals' }],
  icons: {
    icon: '/images/logo/sajith-icon.svg',
    shortcut: '/images/logo/sajith-icon.svg',
    apple: '/images/logo/sajith-icon.svg',
  },
  openGraph: {
    title: 'Sajith Eye Care Opticals | Avinashi',
    description: 'Explore stylish eyewear and trusted optical care in Avinashi, Tamil Nadu.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Sajith Eye Care Opticals',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0066cc',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-sajith-600">
        <CartProvider>
          {/* Main Desktop & Mobile Header */}
          <Navbar />

          {/* Page Content with safe padding for bottom nav on mobile */}
          <main className="min-h-screen pb-20 md:pb-0">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Sticky Mobile Bottom Navigation */}
          <MobileBottomNav />

          {/* Floating WhatsApp Action Button */}
          <FloatingWhatsApp />

          {/* Working Slide-over Cart Drawer */}
          <CartDrawer />

          {/* Fast Product Quick View Modal */}
          <QuickViewModal />

          {/* Cart Feedback Toast */}
          <NotificationToast />
        </CartProvider>
      </body>
    </html>
  );
}
