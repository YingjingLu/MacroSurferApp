import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export interface SinpleLineChartProps {
  actual: number[];
  expected: number[];
  x_axis: string[];
  actual_col_name: string;
  expected_col_name: string;
}

const calculateMinMax = (actual: number[], expected: number[]): { min: number; max: number } => {
  const allValues = [...actual, ...expected];
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  return {
    min: Math.round(min * 1.2),
    max: Math.round(max * 1.2),
  };
};

const createOptions = (x_axis: string[], actual: number[], expected: number[]): ApexOptions => {
  const { min, max } = calculateMinMax(actual, expected);
  return {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
  
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: x_axis,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min,
      max,
    },
  };
}

interface SinpleLineChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

const SinpleLineChart: React.FC<SinpleLineChartProps> = (props: SinpleLineChartProps) => {
  const [state, setState] = useState<SinpleLineChartState>({
    series: [
      {
        name: props.actual_col_name,
        data: props.actual,
      },

      {
        name: props.expected_col_name,
        data: props.expected,
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">{props.actual_col_name}</p>
              {/* <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p> */}
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">{props.expected_col_name}</p>
              {/* <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p> */}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="SinpleLineChart" className="-ml-5">
          <ReactApexChart
            options={createOptions(props.x_axis, props.actual, props.expected)}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default SinpleLineChart;
