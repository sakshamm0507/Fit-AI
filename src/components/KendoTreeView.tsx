
import React from "react";
import { TreeView, TreeViewProps } from "@progress/kendo-react-treeview";

export interface KendoTreeViewProps extends TreeViewProps {
  className?: string;
}

const KendoTreeView = ({ data, className, ...props }: KendoTreeViewProps) => {
  return (
    <TreeView
      data={data}
      className={className}
      expandIcons={true}
      {...props}
    />
  );
};

export default KendoTreeView;
