
import React, { ReactNode } from "react";
import { Tooltip } from "@progress/kendo-react-tooltip";

export interface KendoTooltipProps {
  className?: string;
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const KendoTooltip = ({
  className,
  content,
  children,
  position = "top",
  ...props
}: KendoTooltipProps) => {
  return (
    <Tooltip
      className={className}
      position={position}
      content={() => content}
      anchorElement="target"
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default KendoTooltip;
