
import React, { ReactNode } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

export interface Tab {
  title: string;
  content: ReactNode;
}

export interface TabComponentProps {
  tabs: Tab[];
  selected?: number;
  onSelect?: (e: any) => void;
  className?: string;
}

const TabComponent = ({ tabs, selected = 0, onSelect, className }: TabComponentProps) => {
  return (
    <TabStrip
      selected={selected}
      onSelect={onSelect}
      className={className}
      animation={true}
    >
      {tabs.map((tab, index) => (
        <TabStripTab key={index} title={tab.title}>
          <div className="p-4">{tab.content}</div>
        </TabStripTab>
      ))}
    </TabStrip>
  );
};

export default TabComponent;
