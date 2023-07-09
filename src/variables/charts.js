/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

export const barChartDataDashboard = [
  {
    name: "Sales",
    data: [330, 250, 110, 300, 490, 350, 270],
  },
];

export const barChartOptionsDashboard = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "10px",
      fontFamily: "Plus Jakarta Display",
    },
    onDatasetHover: {
      style: {
        fontSize: "10px",
        fontFamily: "Plus Jakarta Display",
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: [
    "Day1", 
    "Day2", 
    "Day3", 
    "Day4", 
    "Day5", 
    "Day6", 
    "Day7",],
    show: false,
    labels: {
      show: false,
      style: {
        colors: "#fff",
        fontSize: "10px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "#fff",
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "10px",
        fontFamily: "Plus Jakarta Display",
      },
    },
  },
  grid: {
    show: false,
  },
  fill: {
    colors: "#fff",
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "12px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
};

export const lineChartDataDashboard = [
  {
    name: "Move minutes",
    data: [500, 250, 300, 220, 500, 250, 300],
  },
  {
    name: "Steps",
    data: [200, 230, 300, 350, 370, 420, 550],
  },
];

export const lineChartOptionsDashboard = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Day1", 
    "Day2", 
    "Day3", 
    "Day4", 
    "Day5", 
    "Day6", 
    "Day7",
    ],
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#0075FF", "#2CD9FF"],
  },
  colors: ["#0075FF", "#2CD9FF"],
};

export const lineChartDataProfile1 = [
  {
    name: "Move minutes",
    data: [100, 250, 300, 220, 500, 250, 300],
  },
];

export const lineChartOptionsProfile1 = {
  chart: {
    height: "50px",
    toolbar: {
      show: false,
    },
    redrawOnParentResize: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Day1", 
    "Day2", 
    "Day3", 
    "Day4", 
    "Day5", 
    "Day6", 
    "Day7",
    ],
    labels: {
      show: false,
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#01B574"],
  },
  colors: ["#01B574"],
};

export const lineChartDataProfile2 = [
  {
    name: "Move minutes",
    data: [100, 250, 300, 220, 500, 250, 300],
  },
];

export const lineChartOptionsProfile2 = {
  chart: {
    height: "50px",
    toolbar: {
      show: false,
    },
    redrawOnParentResize: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Day1", 
    "Day2", 
    "Day3", 
    "Day4", 
    "Day5", 
    "Day6", 
    "Day7",
    ],
    labels: {
      show: false,
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#0075FF"],
  },
  colors: ["#0075FF"],
};
