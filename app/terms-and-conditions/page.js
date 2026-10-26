import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import EnquiryProvider from "@/components/EnquiryProvider";
import { termsAndConditions } from "@/lib/content";

export const metadata = {
  title: "Therapy Centre Terms & Conditions | Simple Hearing & Speech Care",
  description:
    "Therapy Centre policies and terms & conditions for parents and guardians at Simple Hearing & Speech Care Pune.",
};

export default function TermsAndConditionsPage() {
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
              <h1 className="legal-hero__title">Terms &amp; Conditions</h1>
              <p className="legal-hero__tagline">{termsAndConditions.tagline}</p>
            </div>
          </section>

          <div className="legal-container">
            <article className="legal-card">
              <h2
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 1.55rem)",
                  fontWeight: "700",
                  color: "#b81e64",
                  marginBottom: "16px",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                }}
              >
                {termsAndConditions.title}
              </h2>
              <p className="legal-intro">{termsAndConditions.intro}</p>

              <div className="legal-sections">
                {termsAndConditions.sections.map((sec) => (
                  <section key={sec.num} className="legal-section">
                    <h3 className="legal-section__heading">
                      {sec.num}. {sec.title}
                    </h3>
                    <p className="legal-section__body">{sec.body}</p>
                    {sec.highlight && (
                      <div className="legal-callout">
                        <strong>Important:</strong> A {sec.highlight}.
                      </div>
                    )}
                  </section>
                ))}
              </div>

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
                <span>Last Updated: {termsAndConditions.lastUpdated}</span>
              </div>
            </article>
          </div>
        </main>
        <Footer />
        <MobileBar />
      </div>
    </EnquiryProvider>
  );
}
