
import React from "react";
import {
  Scheduler,
  SchedulerViewItem,
  SchedulerProps
} from "@progress/kendo-react-scheduler";

export interface KendoSchedulerProps extends Omit<SchedulerProps, 'data'> {
  events: any[];
  className?: string;
  defaultView?: string;
}

const KendoScheduler = ({ events, className, defaultView = "day", ...props }: KendoSchedulerProps) => {
  return (
    <Scheduler
      data={events}
      className={className}
      defaultView={defaultView}
      {...props}
    />
  );
};

export default KendoScheduler;
