import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import EnquiryProvider from "@/components/EnquiryProvider";
import FloatingContact from "@/components/FloatingContact";
import { privacyPolicy } from "@/lib/content";

export const metadata = {
  title: "Privacy & Policy | Simple Hearing & Speech Care",
  description:
    "Learn how Simple Hearing & Speech Care protects your personal information and ensures your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <EnquiryProvider>
      <div className="legal-page">
        <Header />
        <main className="legal-main">
          <section className="legal-hero">
            <div className="legal-hero__inner">
              <Link href="/" className="legal-nav-back">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back to Home</span>
              </Link>
              <h1 className="legal-hero__title">{privacyPolicy.title}</h1>
              <p className="legal-hero__tagline">{privacyPolicy.tagline}</p>
            </div>
          </section>

          <div className="legal-container">
            <article className="legal-card">
              <h2
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 1.55rem)",
                  fontWeight: "700",
                  color: "var(--ink)",
                  marginBottom: "16px",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                }}
              >
                {privacyPolicy.title}
              </h2>

              <p className="legal-intro">
                {privacyPolicy.intro.includes("https://simplehearingandspeechcare.in") ? (
                  <>
                    {privacyPolicy.intro.split("https://simplehearingandspeechcare.in")[0]}
                    <a
                      href="https://simplehearingandspeechcare.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--blue)", textDecoration: "underline" }}
                    >
                      https://simplehearingandspeechcare.in
                    </a>
                    {privacyPolicy.intro.split("https://simplehearingandspeechcare.in")[1]}
                  </>
                ) : (
                  privacyPolicy.intro
                )}
              </p>

              <ul className="legal-points">
                {privacyPolicy.points.map((pt, i) => (
                  <li key={i} className="legal-point-item">
                    <span className="legal-point-bullet" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="legal-meta">
                <svg
                  className="legal-meta__icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Last Updated: {privacyPolicy.lastUpdated}</span>
              </div>
            </article>
          </div>
        </main>
        <Footer />
        <MobileBar />
        <FloatingContact />
      </div>
    </EnquiryProvider>
  );
}
