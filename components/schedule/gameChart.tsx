"use client"

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { Chart } from "@/lib/types";

type GameChartProps = {
  data: Chart[];
  themes: string[];
};

export default function GameChart({ data, themes }: GameChartProps) {
  const width = 720;
  const height = 450;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 70;

  const svgRef = useRef<SVGSVGElement>(null);

  // Initiate
  useEffect(() => {
    // svg element
    const svgEl = d3.select(svgRef.current);

    // data processing
    let scoreGroup: number[][] = data.map(d => d.points);

    // Declare the x (horizontal position) scale.
    const xScale = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    let allScores: number[] = d3.merge(scoreGroup);
    let [min = 0, max = 25000] = d3.extent<number>(allScores);
    const yScale = d3.scaleLinear([min, max], [height - marginBottom, marginTop]);

    const labels: string[] = data.map(d => d.label);

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(x => `${labels[x.valueOf()] || ""}`);

    const yAxis = d3.axisLeft(yScale)
      .tickValues([min, 25000, max]);

    // x-axis
    svgEl.append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(xAxis)

    // y-axis
    svgEl.append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(yAxis);

    // axis label
    svgEl.selectAll("text")
      .attr("font-size", 14);

    // Append four paths for the line.
    const lineA = d3.line<any>((d, i) => xScale(i), d => yScale(d.points[0]));
    const lineB = d3.line<any>((d, i) => xScale(i), d => yScale(d.points[1]));
    const lineC = d3.line<any>((d, i) => xScale(i), d => yScale(d.points[2]));
    const lineD = d3.line<any>((d, i) => xScale(i), d => yScale(d.points[3]));

    svgEl.append("path")
      .attr("role", "path")
      .attr("stroke", themes[0])
      .attr("d", lineA(data));

    svgEl.append("path")
      .attr("role", "path")
      .attr("stroke", themes[1])
      .attr("d", lineB(data));

    svgEl.append("path")
      .attr("role", "path")
      .attr("stroke", themes[2])
      .attr("d", lineC(data));

    svgEl.append("path")
      .attr("role", "path")
      .attr("stroke", themes[3])
      .attr("d", lineD(data));

    // common attr and styles
    d3.selectAll("[role=path]")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function () {
        d3.select(this)
          .attr("stroke-width", 4)
          .attr("aria-state", "active")

        d3.selectAll("[role=path]")
          .filter(":not([aria-state=active])")
          .attr("opacity", 0);
      }).on("mouseout", function () {
        d3.select(this)
          .attr("stroke-width", 2)
          .attr("aria-state", "")

        d3.selectAll("[role=path]")
          .attr("opacity", 1);
      });

    d3.selectAll("[role=path]")
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attrTween("stroke-dasharray", function () {
        // @ts-ignore
        const l: number = this.getTotalLength();
        return d3.interpolate(`0,${l}`, `${l},${l}`);
      });

  }, [data, themes]);

  return (
    <>
      {
        data.length === 0 ?
          <div className="pt-[150px] text-center">
            <span className="text-[40px] font-bold">数据统计中...</span>
          </div>
          :
          <div className="pt-[30px] pr-[30px]">
            <svg
              ref={svgRef}
              width={width}
              height={height}
              xmlns="http://www.w3.org/2000/svg"
            >
            </svg>
          </div>
      }
    </>
  );

}
