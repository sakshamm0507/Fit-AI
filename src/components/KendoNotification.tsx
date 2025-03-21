
import React, { useRef, useEffect } from "react";
import { Notification } from "@progress/kendo-react-notification";

export interface KendoNotificationProps {
  className?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  isOpen: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTimeout?: number;
}

const KendoNotification = ({
  className,
  message,
  type = "info",
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTimeout = 3000,
}: KendoNotificationProps) => {
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && autoClose && onClose) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, autoCloseTimeout);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, autoClose, autoCloseTimeout, onClose]);

  if (!isOpen) return null;

  return (
    <Notification
      className={className}
      type={{
        style: type,
        icon: true
      }}
      closable={true}
      onClose={onClose}
    >
      <span>{message}</span>
    </Notification>
  );
};

export default KendoNotification;
