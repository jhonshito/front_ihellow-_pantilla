import { Row, Col, Dropdown, Button, Card } from "react-bootstrap";

import React, { useEffect, useState } from 'react'

import { useEstadisticasMutation } from "../../api/apiSplice";
import Loader from "../loading/Loader";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useGetLocalStorange } from "../hooks/sendLocalstorange";

//icons
import { AiFillFacebook, AiOutlineWhatsApp, AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { MdOpenInBrowser } from "react-icons/md";

const Estadis = ({idLanding, fechas}) => {

    const [estadisticas] = useEstadisticasMutation();
    const [isLoading, setIsLoading] = useState(true);
    const [anality, setAnality] = useState();

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
            // console.log('si')
          } catch (error) {
            console.log(error);
          }finally{
            setIsLoading(false); // Ocultar el loading
          }
        };
        
        fetchData();
      }, [fechas?.fechaFitro, idLanding]);

      if(isLoading){
        return <Loader />
      }

  return (
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
  )
}

export default Estadis
