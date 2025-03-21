
import React from "react";
import { Avatar } from "@progress/kendo-react-layout";

export interface AvatarComponentProps {
  type?: "image" | "text";
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
  // Remove onClick since it's not supported by KendoUI Avatar
}

const AvatarComponent = ({
  type = "image",
  children,
  size = "medium",
  className,
  style,
}: AvatarComponentProps) => {
  return (
    <Avatar
      type={type}
      size={size}
      className={className}
      style={style}
    >
      {children}
    </Avatar>
  );
};

export default AvatarComponent;
