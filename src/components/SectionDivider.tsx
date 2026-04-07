interface SectionDividerProps {
  variant?: "wave" | "curve" | "tilt";
  flip?: boolean;
  color?: string;
  className?: string;
}

const SectionDivider = ({ variant = "wave", flip = false, color = "hsl(150 20% 98%)", className = "" }: SectionDividerProps) => {
  const paths: Record<string, string> = {
    wave: "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z",
    curve: "M0,60 Q720,0 1440,60 L1440,80 L0,80 Z",
    tilt: "M0,60 L1440,20 L1440,80 L0,80 Z",
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ marginTop: flip ? 0 : "-1px", marginBottom: flip ? "-1px" : 0 }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        className="w-full h-[50px] md:h-[70px]"
        preserveAspectRatio="none"
        style={{ transform: flip ? "rotate(180deg)" : undefined }}
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
};

export default SectionDivider;
