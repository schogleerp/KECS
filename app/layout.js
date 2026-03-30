import '../styles/global.scss';
import SmoothScroll from '../components/Layout/SmoothScroll';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ScrollLines from '../components/Layout/ScrollLines';
import MobilePaymentBar from '../components/Layout/MobilePaymentBar';

import { Syne, Playfair_Display } from 'next/font/google';

const syne = Syne({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});

const SCHOOL_NAME = 'K.E. Carmel School, Bankura';
const BASE_URL    = 'https://www.kecarmelbankura.in';

export const metadata = {
  // ── Core ───────────────────────────────────────────────────────────────────
  title: {
    default : `${SCHOOL_NAME} | CISCE Boarding School in West Bengal`,
    template: `%s | ${SCHOOL_NAME}`,
  },
  description:
    'K.E. Carmel School, Bankura is a premier CISCE-affiliated co-educational boarding school in West Bengal, India. Managed by CMI Fathers. Admissions open for 2025–26.',

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    'K.E. Carmel School Bankura',
    'KE Carmel School',
    'ICSE school Bankura',
    'CISCE school West Bengal',
    'best boarding school Bankura',
    'CMI school India',
    'Christian school West Bengal',
    'co-educational school Bankura',
    'Carmel school admissions 2025',
  ],

  // ── Canonical & robots ─────────────────────────────────────────────────────
  alternates: { canonical: BASE_URL },
  robots: {
    index : true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },

  // ── Open Graph (Facebook / WhatsApp / LinkedIn) ────────────────────────────
  openGraph: {
    type       : 'website',
    url        : BASE_URL,
    siteName   : SCHOOL_NAME,
    title      : `${SCHOOL_NAME} | CISCE Boarding School in West Bengal`,
    description: 'Premier CISCE-affiliated co-educational boarding school in Bankura, West Bengal. Managed by CMI Fathers. Shaping globally competent citizens since 1992.',
    images: [
      {
        url   : `${BASE_URL}/images/og-cover.jpg`,
        width : 1200,
        height: 630,
        alt   : 'K.E. Carmel School Bankura — Campus Aerial View',
      },
    ],
    locale: 'en_IN',
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card       : 'summary_large_image',
    title      : `${SCHOOL_NAME} | CISCE Boarding School`,
    description: 'Premier CISCE boarding school in Bankura, West Bengal. CMI-managed. Admissions open.',
    images     : [`${BASE_URL}/images/og-cover.jpg`],
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon      : '/favicon.ico',
    shortcut  : '/favicon.ico',
    apple     : '/images/apple-touch-icon.png',
  },

  // ── Verification (add your actual codes here) ─────────────────────────────
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE',
  },
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────
const schoolSchema = {
  '@context'          : 'https://schema.org',
  '@type'             : 'School',
  name                : SCHOOL_NAME,
  url                 : BASE_URL,
  logo                : `${BASE_URL}/images/kecs-logo.png`,
  description         : 'Premier CISCE co-educational boarding school in Bankura, West Bengal, managed by CMI Dharmanivas Educational Trust.',
  address: {
    '@type'          : 'PostalAddress',
    streetAddress    : 'Kenduadihi, Bankura',
    addressLocality  : 'Bankura',
    addressRegion    : 'West Bengal',
    postalCode       : '722102',
    addressCountry   : 'IN',
  },
  telephone           : '+917865964842',
  email               : 'kecsbankura@gmail.com',
  foundingDate        : '1992',
  numberOfStudents    : '1500',
  educationalCredentialAwarded: 'CISCE (ICSE/ISC)',
  alumni              : [],
  sameAs              : [BASE_URL],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
        />
      </head>
      <body className={`${syne.variable} ${playfair.variable}`} suppressHydrationWarning>
        <SmoothScroll>
          <ScrollLines />
          <Header />
            <main>
              {children}
            </main>
          <Footer />
          <MobilePaymentBar />
        </SmoothScroll>
      </body>
    </html>
  );
}

