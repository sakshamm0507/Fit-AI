
import React, { ReactNode } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export interface DialogComponentProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  width?: number;
  height?: number;
}

const DialogComponent = ({
  title,
  children,
  actions,
  isOpen,
  onClose,
  className,
  width,
  height,
}: DialogComponentProps) => {
  if (!isOpen) return null;

  return (
    <Dialog
      title={title}
      onClose={onClose}
      className={className}
      width={width}
      height={height}
    >
      {children}
      {actions && <DialogActionsBar>{actions}</DialogActionsBar>}
    </Dialog>
  );
};

export default DialogComponent;
