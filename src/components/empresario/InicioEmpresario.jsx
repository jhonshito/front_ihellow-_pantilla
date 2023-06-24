import { useEffect, memo, Fragment, useState } from "react";
import { Row, Col, Dropdown, Button, Card } from "react-bootstrap";

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//apexcharts
import Chart from "react-apexcharts";

//icons
import { AiFillFacebook, AiOutlineWhatsApp, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { MdOpenInBrowser } from "react-icons/md";

//router-dom
import { Link, useLocation, useNavigate } from "react-router-dom";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

import moment from "moment";

import { useMetricasMutation, useEstadisticasMutation } from "../../api/apiSplice";
import Loader from "../loading/Loader";

const InicioEmpresario = ({idLanding, fechas}) => {

  const [isLoading, setIsLoading] = useState(true);

  const [metricas] = useMetricasMutation();
  const [estadisticas] = useEstadisticasMutation();

  const [datos, setDatos] = useState();
  const [anality, setAnality] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Mostrar el loading
        const res = await metricas({
          id_landing: JSON.parse(localStorage.getItem('idLanding')),
          fechaInicial: fechas.fechaInicial,
          fechaFinal: fechas.fechaFinal
        });
        setDatos(res);
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false); // Ocultar el loading
      }
    };
    
    fetchData();
  }, [fechas.fechaInicial, fechas.fechaFinal, idLanding]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Mostrar el loading
        const res = await estadisticas({
          id_landing: JSON.parse(localStorage.getItem('idLanding')),
          fechaInicial: fechas.fechaInicial,
          fechaFinal: fechas.fechaFinal
        });
        setAnality(res)
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false); // Ocultar el loading
      }
    };
    
    fetchData();
  }, [fechas.fechaInicial, fechas.fechaFinal, idLanding])

  let navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'))
    if(!data) return navigate('/')
  }, [])

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

  const json = {
    total: 100,
    arrayData: [
      { name: "facebook", data: [16,12,44,56,76,44,22,33,99] },
      { name: "whatsapp", data: [9,44,5,66,2,4,]},
      { name: "contacto", data: [13,23,21,45,6,67,]},
      { name: "instagram", data: [2,5,33,65,55,95,5]},
      { name: "guardar contacto", data: [9,34,15,66,2,4,]},
      { name: "apertura", data: [89,35,43,65,25,35,5] },
    ],
  }

  // Definir las fechas de inicio y fin
  const fechaInicio = moment(new Date(), 'YYYY/MM/DD');
  const fechaFin = moment(new Date(), 'YYYY/MM/DD');

  // Crear una matriz para almacenar los días
  const listaDias = [];
 
  // Iterar a través de las fechas y agregarlas a la matriz
  for (let fecha = fechaInicio; fecha.isSameOrBefore(fechaFin); fecha.add(1, 'day')) {
    listaDias.push(fecha.format('YYYY/MM/DD'));
  }

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
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 0,
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
    },
    xaxis: {
      categories: listaDias,
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
      max: json?.total // Establecer el valor máximo deseado
    },
    },
    series: json?.arrayData.map((item) => {
      return {
        name: item.name,
        data: item.data
      };
    }),
  };

  if(isLoading){
    return <Loader />
  }


  return (
    <Fragment>
      <Row>
        <Col lg="3">
          <Card className="text-center">
            <Card.Body>
            {datos && datos.data && datos.data.aperturas && (
              <h2 className="mb-3">{datos.data.aperturas}</h2>
            )}
              <h5>Aperturas</h5>
              <small>Aperturas</small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3">
          <Card className="text-center">
            <Card.Body>
            {datos && datos.data && datos.data.clisk && (
              <h2 className="mb-3">{datos.data.clisk}</h2>
            )}
              <h5>Clicks</h5>
              <small>clicks</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg="8" xl="8">
          <Card className="card-block card-stretch card-height">
            <Card.Header>
              <div className="flex-wrap  d-flex justify-content-between">
                <div className="header-title">
                  <h4>Sales Stastics</h4>
                </div>
                <div className="d-flex">
                  <div className="me-3">
                    <p className="mb-0">
                      <AiFillFacebook className="bi bi-facebook text-primary fs-2" />
                      {" "}
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-0">
                      <AiOutlineWhatsApp className="bi bi-whatsapp text-secondary fs-2" />
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-0">
                      <AiFillInstagram className="bi bi-instagram text-warning fs-2" />
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-0">
                      <BsPersonFillAdd className="bi bi-person-plus text-primary_light fs-2" />
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-0">
                      <MdOpenInBrowser className="bi bi-door-open text-success fs-2" />
                      {" "}
                    </p>
                  </div>
                  <div className="">
                    <p className="mb-0">
                      <CgWebsite className="bi bi-bar-chart text-tertiray fs-2" />
                      {" "}
                    </p>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Chart
                options={chart2.options}
                series={chart2.series}
                type="line"
                height="100%"
                className="sales-chart-02"
              ></Chart>
            </Card.Body>
          </Card>
        </Col>

        {/* este es el last transition */}
        <Col lg="4" xl="4">
          <Card className="card card-block card-stretch card-height">
            <Card.Body>
              <div className="mb-5">
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <span className="text-dark">Last Transaction</span>
                  <Link className="badge rounded-pill bg-soft-primary" to="#">
                    View Report
                  </Link>
                </div>
                <div className="">
                  <h2
                    className="counter mb-2"
                    style={{ visibility: "visible" }}
                  >
                    {anality?.data?.total}
                  </h2>
                  <p>Total</p>
                </div>
              </div>
              <div>
                <div className="d-flex gap flex-column">
                  {
                    anality?.data?.estadisticasArray?.map((item, index) => (
                      <div key={index} className="d-flex align-items-center gap-3">
                        <div className="bg-soft-primary avatar-60 rounded">
                          {
                            item?.nombre == 'facebook' ?
                            <AiFillFacebook className="icon-35" />: item?.nombre == 'whatsapp'? <AiOutlineWhatsApp className="icon-35" />: item?.nombre == 'instagram'? <AiFillInstagram className="icon-35" />: item?.nombre == 'youtube'? <AiFillYoutube className="icon-35" />: item?.nombre == 'guardar contacto' ? <BsPersonFillAdd className="icon-35" />: item?.nombre == 'apertura' ? <MdOpenInBrowser className="icon-35" />: <CgWebsite className="icon-35" />
                          }
                        </div>
                        <div style={{ width: `${anality?.data?.total}%` }}>
                          <div className="d-flex gap-5 justify-content-between">
                            <h6 className="mb-2 text-capitalize">{item?.nombre}</h6>
                            <h6 className="text-body">{item?.porcentaje}%</h6>
                          </div>
                          <div
                            className="progress bg-soft-primary shadow-none w-100"
                            style={{ height: "6px" }}
                          >
                            <div
                              className="progress-bar bg-primary"
                              data-toggle="progress-bar"
                              role="progressbar"
                              aria-valuenow="23"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{
                                width: `${item?.porcentaje}%`,
                                transition: "width 2s ease 0s",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer />
    </Fragment>
  )
}

export default InicioEmpresario
