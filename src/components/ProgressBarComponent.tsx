
import React from "react";
import { ProgressBar } from "@progress/kendo-react-progressbars";

export interface ProgressBarComponentProps {
  value: number;
  max?: number;
  label?: string;
  type?: "linear" | "circular";  // Updated to use the correct types supported by Kendo
  orientation?: "horizontal" | "vertical";
  className?: string;
  animate?: boolean;
}

const ProgressBarComponent = ({
  value,
  max = 100,
  label,
  type = "linear",  // Changed to 'linear' as the default
  orientation = "horizontal",
  className,
  animate = true,
}: ProgressBarComponentProps) => {
  return (
    <div className="progress-container">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <ProgressBar
        value={value}
        max={max}
        type={type}
        orientation={orientation}
        className={className}
        animation={{ duration: animate ? 400 : 0 }}
      />
    </div>
  );
};

export default ProgressBarComponent;
