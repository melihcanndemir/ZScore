import React from "react";

interface LightningProps {
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
 * Lightning icon component with customizable properties
 */
const Lightning: React.FC<LightningProps> = ({
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
      <path
        fillRule="evenodd"
        d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Lightning;
