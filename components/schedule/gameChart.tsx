"use client"

import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function GameChart() {
  const width = 720;
  const height = 450;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 70;

  const data: readonly Record<string, number>[] = [
    {
      "A": 25000,
      "B": 25000,
      "C": 25000,
      "D": 25000,
    },
    {
      "A": 28000,
      "B": 24000,
      "C": 24000,
      "D": 24000,
    },
    {
      "A": 40300,
      "B": 24000,
      "C": 11700,
      "D": 24000,
    },
    {
      "A": 36300,
      "B": 28000,
      "C": 11700,
      "D": 24000,
    },
    {
      "A": 30300,
      "B": 28000,
      "C": 17700,
      "D": 24000,
    },
    {
      "A": 29600,
      "B": 27300,
      "C": 19800,
      "D": 23300,
    },
    {
      "A": 25600,
      "B": 25300,
      "C": 17800,
      "D": 31300,
    },
    {
      "A": 37600,
      "B": 21300,
      "C": 13800,
      "D": 27300,
    },
    {
      "A": 33600,
      "B": 17300,
      "C": 25800,
      "D": 23300,
    },
    {
      "A": 33600,
      "B": 17300,
      "C": 24500,
      "D": 24600,
    },
    {
      "A": 35600,
      "B": 17300,
      "C": 22500,
      "D": 24600,
    },
    {
      "A": 47600,
      "B": 14300,
      "C": 19500,
      "D": 18600,
    },
  ];

  const svgRef = useRef<SVGSVGElement>(null);

  // Initiate
  useEffect(() => {
    // svg element
    const svgEl = d3.select(svgRef.current);

    // data processing
    let players: string[] = Object.keys(data[0]);
    let scoreGroup: number[][] = data.map(d => Object.values(d));

    // Declare the x (horizontal position) scale.
    const xScale = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    let allScores: number[] = d3.merge(scoreGroup);
    let [min = 0, max = 25000] = d3.extent<number>(allScores);
    const yScale = d3.scaleLinear([min, max], [height - marginBottom, marginTop]);

    const xAxis = d3.axisBottom(xScale);
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
    const lineA = d3.line<any>((d, i) => xScale(i), d => yScale(d.A));
    const lineB = d3.line<any>((d, i) => xScale(i), d => yScale(d.B));
    const lineC = d3.line<any>((d, i) => xScale(i), d => yScale(d.C));
    const lineD = d3.line<any>((d, i) => xScale(i), d => yScale(d.D));

    svgEl.append("path")
      .attr("role", "path")
      .attr("stroke", "rgb(153, 128, 250)")
      .attr("d", lineA(data));

    svgEl.append("path")
      .attr("role", "path")
      .attr("stroke", "rgb(18, 203, 196)")
      .attr("d", lineB(data));

    svgEl.append("path")
      .attr("role", "path")
      .attr("stroke", "rgb(255, 195, 18)")
      .attr("d", lineC(data));

    svgEl.append("path")
      .attr("role", "path")
      .attr("stroke", "rgb(230, 103, 45)")
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

  }, []);

  return (
    <div className="pt-[30px] pr-[30px]">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
      </svg>
    </div>
  )
}
