const TrustBanner = () => (
  <div className="trust-banner py-3 overflow-hidden">
    <div className="marquee-track">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex-shrink-0 mx-12 text-sm font-medium text-primary-foreground/90 whitespace-nowrap">
          🔒 No unauthorized donations — All contributions are verified and accounted for with full transparency
        </span>
      ))}
    </div>
  </div>
);

export default TrustBanner;
