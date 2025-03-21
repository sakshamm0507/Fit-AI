
import React, { ReactNode } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { GridProps } from "@progress/kendo-react-grid";

export interface KendoGridProps extends GridProps {
  columns: Array<{
    field: string;
    title: string;
    width?: string;
  }>;
  className?: string;
}

const KendoGrid = ({ data, columns, className, ...props }: KendoGridProps) => {
  return (
    <Grid data={data} className={className} {...props}>
      {columns.map((column) => (
        <GridColumn
          key={column.field}
          field={column.field}
          title={column.title}
          width={column.width}
        />
      ))}
    </Grid>
  );
};

export default KendoGrid;
