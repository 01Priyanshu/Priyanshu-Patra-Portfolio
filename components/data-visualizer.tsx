"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function DataVisualizer() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: "radar",
          data: {
            labels: ["Machine Learning", "Data Analysis", "Visualization", "Big Data", "Statistics", "Programming"],
            datasets: [
              {
                label: "Skills",
                data: [90, 85, 95, 75, 80, 92],
                backgroundColor: "rgba(255, 59, 48, 0.2)",
                borderColor: "rgba(255, 59, 48, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(255, 59, 48, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255, 59, 48, 1)",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                angleLines: {
                  display: true,
                  color: "rgba(255, 59, 48, 0.1)",
                },
                grid: {
                  color: "rgba(255, 59, 48, 0.1)",
                },
                pointLabels: {
                  color: "rgba(0, 0, 0, 0.7)",
                  font: {
                    size: 12,
                    weight: "bold",
                  },
                },
                ticks: {
                  display: false,
                  stepSize: 20,
                },
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        })
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="relative w-full h-[400px] p-4 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-xl border border-primary/20 animate-float shadow-lg shadow-primary/10">
      <div className="absolute inset-0 bg-dots rounded-xl"></div>
      <canvas ref={chartRef} className="w-full h-full relative z-10"></canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-slow">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center animate-spin-slow">
            <div className="w-8 h-8 rounded-full bg-secondary/30"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
