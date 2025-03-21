
import React, { ReactNode } from "react";
import { Tooltip } from "@progress/kendo-react-tooltip";

export interface TooltipComponentProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  showCallout?: boolean;
  className?: string;
}

const TooltipComponent = ({
  content,
  children,
  position = "top",
  showCallout = true,
  className,
}: TooltipComponentProps) => {
  return (
    <Tooltip
      content={() => content}
      position={position}
      showCallout={showCallout}
      className={className}
      anchorElement="target"
    >
      {children}
    </Tooltip>
  );
};

export default TooltipComponent;
