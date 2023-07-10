import React,{ useEffect, memo, Fragment, useState } from "react";
import { Row, Col, Card, Dropdown, Image, Button, Table } from "react-bootstrap";

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// icons
import { AiFillFacebook, AiOutlineWhatsApp, AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { BsPersonFillAdd, BsFiletypeExe } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { MdOpenInBrowser } from "react-icons/md";
  
import { useLista_serviceMutation } from "../api/apiSplice";
import Loader from "./loading/Loader";

import { useGetLocalStorange } from "./hooks/sendLocalstorange";

// modulo para descargar los datos
import { CSVLink } from "react-csv";

import { useDatosExportados } from "./hooks/exportData";

const Data = ({idLanding, fechaFiltro}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [lista] = useLista_serviceMutation();

    const [data, setData] = useState();
    const [exportacion, setExportacion] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {

            setIsLoading(true); // Mostrar el loading

            const res = await lista({
              id_landing: useGetLocalStorange('idLanding') || useGetLocalStorange('data').id_landing || idLanding ,
              fechaInicial: fechaFiltro?.fechaInicial,
              fechaFinal: fechaFiltro?.fechaFinal
            });
            setData(res)
          } catch (error) {
            console.log(error);
          }finally{
            setIsLoading(false); // Ocultar el loading
          }
        };
      
        fetchData();
    }, [fechaFiltro?.fechaFitro, idLanding])


    if(isLoading){
      return <Loader />
    }

    const datosExportar =
    data?.data?.datos?.length > 0 ? useDatosExportados(data?.data?.datos) : 0;


  return (
    <Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <Card.Body>
            {data?.data?.datos?.length <= 0 ? (
                ""
              ) : (
                <CSVLink
                  data={datosExportar}
                  filename="ihellow_data.csv"
                >
                  <button className="btn btn-success d-flex align-items-center gap-2">
                    <BsFiletypeExe className="fs-4 fw-bold" />
                    <span>Download</span>
                  </button>
                </CSVLink>
              )}
              <div className="custom-table-effect table-responsive border rounded mt-3">
                <Table className="mb-0" id="datatable" data-toggle="data-table">
                  <thead>
                    <tr className="bg-white">
                      <th scope="col">#</th>
                      <th scope="col"></th>
                      <th scope="col">Events</th>
                      <th scope="col">Dates</th>
                      <th scope="col">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.datos?.map((item, index) => {
                      const newIndex = index + 1;
                      return (
                        <tr key={item?.id}>
                          <td className="text-dark">{newIndex}</td>
                          <td className="text-dark">
                          <div className="avatar-60 rounded" style={{
                            backgroundColor: item?.name_event === 'facebook' ? '#e8f0fe' :
                            item?.name_event === 'whatsapp' ? 'rgba(37, 211, 102, 0.1)' :
                            item?.name_event === 'instagram' ? 'rgba(193, 53, 132, 0.1)' :
                            item?.name_event === 'guardar contacto' ? 'rgba(128, 128, 128, 0.1)' :
                            item?.name_event === 'linkedin' ? 'rgba(14, 118, 168, 0.1)' :
                            item?.name_event === 'apertura' ? 'rgba(255, 87, 51, 0.1)' :
                            '#e8f0fe',
                            color: item?.name_event === 'facebook' ? '#3b5998' :
                            item?.name_event === 'whatsapp' ? '#25D366' : // Por ejemplo, se asigna color blanco para Whatsapp
                            item?.name_event === 'instagram' ? '#C13584' :
                            item?.name_event === 'guardar contacto' ? 'grey' :
                            item?.name_event === 'linkedin' ? '#0e76a8' :
                            item?.name_event === 'apertura' ? '#ff5733' :
                            'text-tertiray' // Color de texto predeterminado
                          }}>
                          {
                            item?.name_event == 'facebook' ?
                            <AiFillFacebook style={{color: '#3b5998'}} className="icon-35" />: item?.name_event == 'whatsapp'? <AiOutlineWhatsApp style={{color: '#25D366'}} className="icon-35" />: item?.name_event == 'instagram'? <AiFillInstagram style={{color: '#C13584'}} className="icon-35" />: item?.name_event == 'youtube'? <AiFillYoutube className="icon-35" />: item?.name_event == 'guardar contacto' ? <BsPersonFillAdd style={{color: 'grey'}} className="icon-35" />: item?.name_event == 'apertura' ? <MdOpenInBrowser style={{color: '#ff5733'}} className="icon-35" />: item?.name_event == 'linkedin'?<AiFillLinkedin style={{color: '#0e76a8'}} className="icon-35" />: <CgWebsite className="icon-35" />
                          }
                        </div>
                          </td>
                          <td className="text-dark text-capitalize">
                            {item?.name_event}
                          </td>
                          <td className="text-dark">{item?.date?.substring(0, 10)}</td>
                          <td>
                            <span
                              className=''
                            >
                              {item?.hour?.substring(0, 5)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Fragment>
  )
}

export default Data
