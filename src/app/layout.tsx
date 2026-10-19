import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://markprakhin.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mark Prakhin — Law & Business | New York",
  description:
    "Mark Prakhin is a New York student at Staten Island Technical High School with hands-on professional experience in legal office operations, digital marketing, and business administration. Co-founder of NYC Scale Services. Interested in law, litigation, and business strategy.",
  keywords: [
    "Mark Prakhin",
    "Mark Prakhin New York",
    "Mark Prakhin lawyer",
    "Mark Prakhin Staten Island",
    "legal office assistant New York",
    "NYC Scale Services",
    "Staten Island Technical High School",
    "law and business student",
    "marketing operations New York",
    "paralegal student",
    "youth entrepreneur New York",
  ],
  authors: [{ name: "Mark Prakhin", url: SITE_URL }],
  creator: "Mark Prakhin",
  openGraph: {
    title: "Mark Prakhin — Law & Business | New York",
    description:
      "New York student with hands-on experience in legal office operations, digital marketing, and business development. Co-founder of NYC Scale Services.",
    url: SITE_URL,
    siteName: "Mark Prakhin",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/mark-portrait.png",
        width: 800,
        height: 1067,
        alt: "Mark Prakhin — Law & Business, New York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Prakhin — Law & Business | New York",
    description:
      "New York student with hands-on experience in legal office operations, digital marketing, and business development. Co-founder of NYC Scale Services.",
    images: ["/mark-portrait.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mark Prakhin",
  url: SITE_URL,
  image: `${SITE_URL}/mark-portrait.png`,
  description:
    "New York student with professional experience in legal office operations, digital marketing, and business administration. Co-founder of NYC Scale Services. Student at Staten Island Technical High School.",
  jobTitle: [
    "Legal Office & Marketing Operations Assistant",
    "Founder & CTO, NYC Scale Services",
  ],
  worksFor: [
    {
      "@type": "LegalService",
      name: "Law Office of Yuriy Prakhin, P.C.",
      address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY" },
    },
    {
      "@type": "Organization",
      name: "NYC Scale Services",
      url: "https://nycscaleservices.com",
    },
  ],
  alumniOf: {
    "@type": "HighSchool",
    name: "Staten Island Technical High School",
    address: { "@type": "PostalAddress", addressLocality: "Staten Island", addressRegion: "NY" },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  knowsLanguage: ["English", "Russian"],
  knowsAbout: [
    "Legal Operations",
    "Litigation",
    "Digital Marketing",
    "Local SEO",
    "Business Strategy",
    "Entrepreneurship",
    "Law Firm Operations",
  ],
  sameAs: [`mailto:markp19224@gmail.com`],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
