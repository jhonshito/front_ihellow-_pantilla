import { useEffect, memo, Fragment, useState } from "react";
import { Row, Col, Dropdown, Button, Card } from "react-bootstrap";

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//apexcharts
import Chart from "react-apexcharts";

//icons
import { AiFillFacebook, AiOutlineWhatsApp, AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { MdOpenInBrowser } from "react-icons/md";

//router-dom
import { Link, useLocation, useNavigate } from "react-router-dom";

import moment from "moment";

import { useMetricasMutation, useEstadisticasMutation } from "../../api/apiSplice";
import Loader from "../loading/Loader";

import { useGetLocalStorange } from "../hooks/sendLocalstorange";
import ChatGrafica from "../grafica/ChatGrafica";

const InicioEmpresario = ({idLanding, fechas}) => {

  const [isLoading, setIsLoading] = useState(true);

  const [metricas] = useMetricasMutation();
  const [estadisticas] = useEstadisticasMutation();
  // const [grafica] = useGraficaMutation();

  const [datos, setDatos] = useState();
  const [anality, setAnality] = useState();
  // const [dataGrafica, setDataGrafica] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Mostrar el loading
        const res = await metricas({
          id_landing: useGetLocalStorange('idLanding') || useGetLocalStorange('data')?.id_landing || idLanding,
          fechaInicial: fechas?.fechaInicial || '',
          fechaFinal: fechas?.fechaFinal || ''
        });
        setDatos(res);
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false); // Ocultar el loading
      }
    };
    
    fetchData();
  }, [fechas, idLanding]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Mostrar el loading
        const res = await estadisticas({
          id_landing: useGetLocalStorange('idLanding') || useGetLocalStorange('data')?.id_landing || idLanding,
          fechaInicial: fechas?.fechaInicial || '',
          fechaFinal: fechas?.fechaFinal || ''
        });
        setAnality(res)
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false); // Ocultar el loading
      }
    };
    
    fetchData();
  }, [fechas, idLanding]);

  let navigate = useNavigate();

  useEffect(() => {
    const data = useGetLocalStorange('data')
    if(!data) return navigate('/')
  }, [])

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
                      <AiFillFacebook style={{color: '#3b5998'}} className="bi bi-facebook fs-2" />
                      {" "}
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-0">
                      <AiOutlineWhatsApp style={{color: '#25D366'}} className="bi bi-whatsapp fs-2" />
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-0">
                      <AiFillInstagram style={{color: '#C13584'}} className="bi bi-instagram fs-2" />
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-0">
                      <BsPersonFillAdd className="bi bi-person-plus text-primary_light fs-2" />
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-0">
                      <MdOpenInBrowser style={{color: '#ff5733'}} className="bi bi-door-open fs-2" />
                      {" "}
                    </p>
                  </div>
                  <div className="">
                    <p className="mb-0">
                      <CgWebsite className="bi bi-bar-chart text-tertiray fs-2" />
                      {" "}
                    </p>
                  </div>
                  <div className="">
                    <p className="mb-0">
                      {" "}
                      <AiFillLinkedin style={{color: '#0e76a8'}} className="bi bi-bar-chart fs-2" />
                    </p>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <ChatGrafica fechas={fechas} idLanding={idLanding} />
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
                        <div className="avatar-60 rounded"
                        style={
                          { 
                            backgroundColor: item?.nombre === 'facebook' ? '#e8f0fe' :
                            item?.nombre === 'whatsapp' ? 'rgba(37, 211, 102, 0.1)' :
                            item?.nombre === 'instagram' ? 'rgba(193, 53, 132, 0.1)' :
                            item?.nombre === 'guardar contacto' ? 'rgba(128, 128, 128, 0.1)' :
                            item?.nombre === 'linkedin' ? 'rgba(14, 118, 168, 0.1)' :
                            item?.nombre === 'apertura' ? 'rgba(255, 87, 51, 0.1)' :
                            '#e8f0fe',
                            color: item?.nombre === 'facebook' ? '#3b5998' :
                            item?.nombre === 'whatsapp' ? '#25D366' : // Por ejemplo, se asigna color blanco para Whatsapp
                            item?.nombre === 'instagram' ? '#C13584' :
                            item?.nombre === 'guardar contacto' ? 'grey' :
                            item?.nombre === 'linkedin' ? '#0e76a8' :
                            item?.nombre === 'apertura' ? '#ff5733' :
                            'text-tertiray' // Color de texto predeterminado
                          }
                          } >
                          {
                            item?.nombre == 'facebook' ?
                            <AiFillFacebook style={{color: '#3b5998'}} className="icon-35" />: item?.nombre == 'whatsapp'? <AiOutlineWhatsApp style={{color: '#25D366'}}  className="icon-35" />: item?.nombre == 'instagram'? <AiFillInstagram style={{color: '#C13584'}} className="icon-35" />: item?.nombre == 'youtube'? <AiFillYoutube className="icon-35" />: item?.nombre == 'guardar contacto' ? <BsPersonFillAdd style={{color: 'grey'}} className="icon-35" />: item?.nombre == 'apertura' ? <MdOpenInBrowser style={{color: '#ff5733'}} className="icon-35" />: item?.nombre == 'linkedin' ? <AiFillLinkedin style={{color: '#0e76a8'}} className="icon-35" />: <CgWebsite />
                          }
                        </div>
                        <div style={{ width: `${anality?.data?.total}%`, color: '#3b5998' }}>
                          <div className="d-flex gap-5 justify-content-between">
                            <h6 className="mb-2 text-capitalize">{item?.nombre}</h6>
                            <h6 style={{color: '#3b5998'}} className="text-body">{item?.porcentaje}%</h6>
                          </div>
                          <div
                            className="progress bg-soft-primary shadow-none w-100"
                            style={{ height: "6px" }}
                          >
                            <div
                              className="progress-bar"
                              data-toggle="progress-bar"
                              role="progressbar"
                              aria-valuenow="23"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{
                                width: `${item?.porcentaje}%`,
                                transition: "width 2s ease 0s",
                                backgroundColor: item?.nombre == 'facebook' ? '#3b5998': item?.nombre == 'whatsapp' ? '#25D366': item?.nombre == 'instagram' ? '#C13584': item?.nombre == 'guardar contacto' ? 'grey': item?.nombre == 'linkedin' ? '#0e76a8': item?.nombre == 'apertura' ? '#ff5733': 'text-tertiray'
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
