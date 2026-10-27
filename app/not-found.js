import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryProvider from "@/components/EnquiryProvider";


export default function NotFound() {
  return (
    <EnquiryProvider>
      <div className="legal-page">
        <Header />
        <main
          className="legal-main"
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "60vh",
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(3rem, 8vw, 5rem)",
                fontWeight: "800",
                color: "var(--ink)",
                marginBottom: "12px",
                lineHeight: 1,
              }}
            >
              404
            </h1>
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--ink-soft)",
                marginBottom: "28px",
              }}
            >
              The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/" className="btn btn--grad">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </EnquiryProvider>
  );
}
