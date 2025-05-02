import React from "react";

interface LightningFilledProps {
  /** CSS class name for styling */
  className?: string;
  /** Width of the SVG */
  width?: number | string;
  /** Height of the SVG */
  height?: number | string;
  /** Fill color (can use Tailwind classes with className instead) */
  fill?: string;
  /** Stroke color (can use Tailwind classes with className instead) */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
}

/**
 * Filled Lightning icon component with a stylized design
 */
const LightningFilled: React.FC<LightningFilledProps> = ({
  className = "w-6 h-6 text-primary-600 dark:text-primary-400",
  width,
  height,
  fill = "currentColor",
  stroke = "none",
  strokeWidth = 0,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    >
      <path d="M11.983 1.907a1 1 0 0 1 .823.512l5.167 8.282a1 1 0 0 1 .04.995 1 1 0 0 1-.863.505h-4.6l1.145 6.479a1 1 0 0 1-.366.993 1 1 0 0 1-1.066.101L3.4 14.37a1 1 0 0 1-.526-.878 1 1 0 0 1 .526-.878l3.561-2.015-1.07-6.55a1 1 0 0 1 .405-.97 1 1 0 0 1 1.056-.056l4.631 2.885z" />
    </svg>
  );
};

export default LightningFilled;
