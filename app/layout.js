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
  title: "Top Hearing & Speech Care Clinic in Pune | Simple Hearing & Speech Care",
  description:
    "Personalised hearing aids, vertigo management, speech therapy, occupational therapy, school readiness, the Simple Neuro Sensory Accelerator and the Cogniva brain learning program in Wakad, Pune.",
  keywords: [
    "hearing clinic in Pune",
    "speech therapy Pune",
    "hearing aids Wakad",
    "vertigo clinic Pune",
    "occupational therapy Pune",
    "school readiness program",
  ],
  openGraph: {
    title: "Top Hearing & Speech Care Clinic in Pune",
    description:
      "Hearing care, vertigo management, therapy and learning programs under one roof at Simple Hearing & Speech Care, Wakad.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/icon.svg",
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
      <body>{children}</body>
    </html>
  );
}
