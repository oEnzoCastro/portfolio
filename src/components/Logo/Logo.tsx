import { useId } from "react";

type LogoProps = {
  title?: string;
  variant?: "default" | "accent" | "vinyl";
  className?: string;
};

export function Logo({ title, variant = "default", className }: LogoProps) {
  const maskId = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="-40 -40 120 80"
      className={className}
      {...(title
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": true })}
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="-40"
          y="-40"
          width="80"
          height="80"
        >
          <rect x="-40" y="-40" width="80" height="80" fill="white" />
          <circle cx="40" cy="0" r="39" fill="black" />
          <rect x="-20" y="-23" width="62" height="14" fill="black" />
          <rect x="-20" y="9" width="62" height="14" fill="black" />
        </mask>
        <mask
          id={`${maskId}-hole`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-40"
          width="80"
          height="80"
        >
          <rect x="0" y="-40" width="80" height="80" fill="white" />
          <circle cx="40" cy="0" r="1.8" fill="black" />
        </mask>
      </defs>
      <rect
        x="-40"
        y="-40"
        width="80"
        height="80"
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
      <circle
        cx="40"
        cy="0"
        r="39"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {variant === "vinyl" ? (
        <g mask={`url(#${maskId}-hole)`}>
          <circle cx="40" cy="0" r="26" fill="var(--color-accent)" />
          {[22.5, 19, 15.5].map((r) => (
            <circle
              key={r}
              cx="40"
              cy="0"
              r={r}
              fill="none"
              stroke="var(--color-accent-deep)"
              strokeWidth="0.8"
            />
          ))}
          <circle cx="40" cy="0" r="9" fill="var(--color-accent-deep)" />
        </g>
      ) : (
        <circle
          cx="40"
          cy="0"
          r="26"
          fill={variant === "accent" ? "var(--color-accent)" : "currentColor"}
        />
      )}
    </svg>
  );
}
