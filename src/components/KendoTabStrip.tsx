
import React, { ReactNode } from "react";
import { TabStrip, TabStripTab, TabStripProps } from "@progress/kendo-react-layout";

export interface KendoTabStripProps extends TabStripProps {
  className?: string;
  tabs: Array<{
    title: string;
    content: ReactNode;
  }>;
}

const KendoTabStrip = ({ tabs, className, selected = 0, ...props }: KendoTabStripProps) => {
  return (
    <TabStrip className={className} selected={selected} {...props}>
      {tabs.map((tab, index) => (
        <TabStripTab key={index} title={tab.title}>
          {tab.content}
        </TabStripTab>
      ))}
    </TabStrip>
  );
};

export default KendoTabStrip;
