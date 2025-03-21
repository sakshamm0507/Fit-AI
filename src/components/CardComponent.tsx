
import React, { ReactNode } from "react";
import { Card, CardTitle, CardBody, CardActions } from "@progress/kendo-react-layout";

export interface CardComponentProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

const CardComponent = ({ title, children, actions, className }: CardComponentProps) => {
  return (
    <Card className={className}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardBody>{children}</CardBody>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CardComponent;
