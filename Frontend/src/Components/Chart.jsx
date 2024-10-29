import  { useState } from "react";
import { AgCharts } from "ag-charts-react";
import UserContext from '../utils/userContext';
import { useContext } from 'react';


const getData = () => {
  const { userDetails, loading, error } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
    return [
      {
        quarter: "Q1",
        petrol: 200,
        diesel: 100,
      },
      {
        quarter: "Q2",
        petrol: 300,
        diesel: 130,
      },
      {
        quarter: "Q3",
        petrol: 350,
        diesel: 160,
      },
      {
        quarter: "Q4",
        petrol: 400,
        diesel: 200,
      },
    ];
  }


const Chart = () => {

  
  const [options, setOptions] = useState({
    title: {
      text: "Annual Fuel Expenditure",
    },
    data: getData(),
    series: [
      {
        type: "line",
        xKey: "quarter",
        yKey: "petrol",
        yName: "Petrol",
      },
      {
        type: "line",
        xKey: "quarter",
        yKey: "diesel",
        yName: "Diesel",
      },
    ],
  });

  return <AgCharts options={options} />;
};


export default Chart;