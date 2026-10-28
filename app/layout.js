import { Bricolage_Grotesque, Instrument_Serif, Rubik } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const body = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Speech Therapy & Hearing Treatment in Wakad, Pune | Simple Hearing & Speech Care Clinic",
  description:
    "Looking for speech therapy or hearing Treatment in Wakad, Pune? Get professional support for children and adults at Simple Hearing & Speech Care Clinic. Contact us today!",
  keywords: [
    "speech therapy in Wakad",
    "speech therapist in Wakad",
    "hearing test in Wakad",
    "hearing clinic in Wakad",
    "speech and hearing clinic Pune",
    "speech therapist in Pune",
    "hearing assessment Pune",
    "audiologist in Pune",
    "child speech therapy",
    "speech delay therapy",
    "language therapy for children",
    "stammering therapy Pune",
    "child development centre Wakad",
    "early intervention therapy Pune",
    "sensory integration therapy",
    "occupational therapy for children",
    "autism therapy Pune",
    "hearing aids in Wakad",
    "hearing care clinic Pune",
    "Simple Hearing & Speech Care Clinic",
  ],
  openGraph: {
    title: "Speech Therapy & Hearing Treatment in Wakad, Pune | Simple Hearing & Speech Care Clinic",
    description:
      "Looking for speech therapy or hearing Treatment in Wakad, Pune? Get professional support for children and adults at Simple Hearing & Speech Care Clinic. Contact us today!",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Speech Therapy & Hearing Treatment in Wakad, Pune | Simple Hearing & Speech Care Clinic",
    description:
      "Looking for speech therapy or hearing Treatment in Wakad, Pune? Get professional support for children and adults at Simple Hearing & Speech Care Clinic. Contact us today!",
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#121A2B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${body.variable}`}>
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1432232279030404');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1432232279030404&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
