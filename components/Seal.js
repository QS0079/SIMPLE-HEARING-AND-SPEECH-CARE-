// Verified Clinical Badge: "Our Unique Program in Entire Maharashtra"
export default function Seal({ className = "" }) {
  return (
    <div className={`seal-badge ${className}`} aria-label="Unique program in entire Maharashtra">
      <div className="seal-badge__icon">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f5bf03" stroke="#d97706" />
        </svg>
      </div>
      <div className="seal-badge__text">
        <span className="seal-badge__tag">Exclusive Initiative</span>
        <strong className="seal-badge__title">Unique in Maharashtra</strong>
      </div>
    </div>
  );
}
