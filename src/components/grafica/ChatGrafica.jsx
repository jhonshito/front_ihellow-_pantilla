import React, { useEffect, useState } from 'react'

//apexcharts
import Chart from "react-apexcharts";

import { useGraficaMutation } from "../../api/apiSplice";
import { useGetLocalStorange } from "../hooks/sendLocalstorange";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";
import Loader from '../loading/Loader';

const ChatGrafica = ({fechas, idLanding}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [grafica] = useGraficaMutation();

    const [dataGrafica, setDataGrafica] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true); // Mostrar el loading
            const res = await grafica({
              id_landing: useGetLocalStorange('idLanding') || useGetLocalStorange('data')?.id_landing || idLanding,
              fechaInicial: fechas?.fechaInicial,
              fechaFinal: fechas?.fechaFinal
            });
            // console.log(res)
            setDataGrafica(res);
          } catch (error) {
            console.log(error);
          }finally{
            setIsLoading(false); // Ocultar el loading
          }
        };
        
        fetchData();
    }, [fechas?.fechaInicial, fechas?.fechaFinal, idLanding]);


    useSelector(SettingSelector.theme_color);

  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    if (prefix) {
      prefix = prefix.trim();
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`
    );
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}secondary`
    );
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`
    );
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`
    );
    const color5 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}tertiray`
    );
    const color6 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}success`
    );
    return {
      primary: color1.trim(),
      secondary: color2.trim(),
      primary_light: color3.trim(),
      warning: color4.trim(),
      tertiray: color5.trim(),
      success: color6.trim(),
    };
  };

  const variableColors = getVariableColor();
  const colors = [
    variableColors.primary,
    variableColors.secondary,
    variableColors.tertiray,
    variableColors.warning,
    variableColors.primary_light,
    variableColors.success
  ];

  useEffect(() => {
    return () => colors;
},[]);

    const chart2 = {
        options: {
          chart: {
            toolbar: {
             show: false,
            },
          },
        colors: colors,
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
        },
        legend: {
          show: false,
        },
        grid: {
          show: true,
          strokeDashArray: 7,
        },
        forecastDataPoints: {
          count: 3,
        },
        markers: {
          size: 6,
          colors: "#FFFFFF",
          strokeColors: colors,
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 0,
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
        },
        xaxis: {
          categories: dataGrafica && dataGrafica?.data && dataGrafica?.data?.data?.listaDias ? dataGrafica?.data?.data?.listaDias: [],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          max: dataGrafica && dataGrafica?.data && dataGrafica?.data.data ? dataGrafica?.data?.totalCount: 0 // Establecer el valor máximo deseado
        },
        },
        series: dataGrafica && dataGrafica?.data && dataGrafica?.data?.data ? dataGrafica?.data?.data?.arrayData?.map((item) => {
          return {
            name: item.name,
            data: item.data
          };
        }): 0,
    };

    if(isLoading){
        return <Loader />
    }

    if (!dataGrafica || dataGrafica?.data?.totalCount === 0) {
        return null; // Retorna un componente vacío si no hay datos
    };

    // const json = {
    //     total: 100,
    //     arrayData: [
    //       { name: "facebook", data: [16,12,0,0,0,0,0,1] },
    //       { name: "whatsapp", data: [9,44,5,66,2,4,1,0]},
    //       { name: "contacto", data: [13,23,21,0,6,67,8.,1]},
    //       { name: "instagram", data: [2,5,33,65,0,95,5,2]},
    //       { name: "guardar contacto", data: [9,34,0,66,2,4,0,0]},
    //       { name: "apertura", data: [89,0,43,65,25,35,0,1] },
    //     ],
    //     listaDias: ["2023-06-21","2023-06-22","2023-06-23","2023-06-24","2023-06-25","2023-06-26","2023-06-27","2023-06-28"]
    //   }
    // console.log(dataGrafica)

  return (
    <div>
      <Chart
            options={chart2?.options}
            series={chart2?.series}
            type="line"
            height="100%"
            className="sales-chart-02"
        >
        </Chart>
    </div>
  )
}

export default ChatGrafica
