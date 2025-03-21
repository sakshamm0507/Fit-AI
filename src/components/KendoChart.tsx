
import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartTitle
} from "@progress/kendo-react-charts";

export interface KendoChartProps {
  data: any[];
  series: Array<{
    type: "line" | "bar" | "column" | "area" | "pie";
    field: string;
    categoryField: string;
    name?: string;
    color?: string;
  }>;
  title?: string;
  className?: string;
  height?: number;
}

const KendoChart = ({ data, series, title, className, height = 300 }: KendoChartProps) => {
  const categories = data.length > 0 ? data.map(item => item[series[0].categoryField]) : [];
  
  return (
    <Chart className={className} style={{ height }}>
      {title && <ChartTitle text={title} />}
      <ChartLegend position="bottom" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={categories} />
      </ChartCategoryAxis>
      <ChartSeries>
        {series.map((s, index) => (
          <ChartSeriesItem
            key={index}
            type={s.type}
            data={data.map(item => item[s.field])}
            name={s.name || s.field}
            color={s.color}
          />
        ))}
      </ChartSeries>
    </Chart>
  );
};

export default KendoChart;
