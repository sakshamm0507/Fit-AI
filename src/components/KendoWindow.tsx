
import React, { ReactNode } from "react";
import { Window, WindowProps } from "@progress/kendo-react-dialogs";

export interface KendoWindowProps extends WindowProps {
  className?: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const KendoWindow = ({
  className,
  title,
  children,
  isOpen,
  onClose,
  ...props
}: KendoWindowProps) => {
  if (!isOpen) return null;

  return (
    <Window
      title={title}
      onClose={onClose}
      className={className}
      {...props}
    >
      {children}
    </Window>
  );
};

export default KendoWindow;
