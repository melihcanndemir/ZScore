import React from "react";

interface LightningAltProps {
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
 * Alternative Lightning icon component with a different style
 */
const LightningAlt: React.FC<LightningAltProps> = ({
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
      <path d="M3.6 13.5h6L7.8 22.5l12.6-13.5h-6L16.2 1.5z" />
    </svg>
  );
};

export default LightningAlt;
