
import React, { ReactNode } from "react";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";

export interface DrawerComponentProps {
  expanded: boolean;
  position?: "start" | "end";
  mode?: "push" | "overlay";
  children: ReactNode;
  onClose: () => void;
  className?: string;
  width?: number;
}

const DrawerComponent = ({
  expanded,
  position = "start",
  mode = "overlay",
  children,
  onClose,
  className,
  width = 240,
}: DrawerComponentProps) => {
  return (
    <Drawer
      expanded={expanded}
      position={position}
      mode={mode}
      onOverlayClick={onClose}
      className={className}
      style={{ width }}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
