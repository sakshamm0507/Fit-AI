
import React, { ReactNode } from "react";
import { Dialog, DialogActionsBar, DialogProps } from "@progress/kendo-react-dialogs";

export interface KendoDialogProps extends DialogProps {
  className?: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  actions?: ReactNode;
}

const KendoDialog = ({
  className,
  title,
  children,
  isOpen,
  onClose,
  actions,
  ...props
}: KendoDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog
      title={title}
      onClose={onClose}
      className={className}
      {...props}
    >
      {children}
      {actions && <DialogActionsBar>{actions}</DialogActionsBar>}
    </Dialog>
  );
};

export default KendoDialog;
