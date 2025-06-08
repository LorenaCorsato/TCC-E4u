import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "./../utils/data";
import { GraficoBarra } from "../components/graficoBarra";


Chart.register(CategoryScale);

export default function Grafico() {
    
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
        {
            label: "User Gaied",
            data: Data.map((data) => data.userGain),
            backgroundColor: [
                'red',
                'green',
                'blue',
                'grey',
                'orange',
                'pink',
                'black',
            ],
            borderColor: "black",
            borderWidth: 1
        }
    ]})

  return (
    <div className="App">
      <GraficoBarra chartData={chartData} />
    </div>
  )}