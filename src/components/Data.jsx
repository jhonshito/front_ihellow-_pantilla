import { useEffect, memo, Fragment, useState } from "react";
import { Row, Col, Card, Dropdown, Image, Button, Table } from "react-bootstrap";

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// icons
import { AiFillFacebook, AiOutlineWhatsApp, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { MdOpenInBrowser } from "react-icons/md";
  
import { useLista_serviceMutation } from "../api/apiSplice";
import Loader from "./loading/Loader";

import { useGetLocalStorange } from "./hooks/sendLocalstorange";

const Data = ({idLanding, fechaFiltro}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [lista] = useLista_serviceMutation();

    const [data, setData] = useState();

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
    }, [fechaFiltro?.fechaInicial, fechaFiltro?.fechaFinal, idLanding])

    if(isLoading){
      return <Loader />
    }

  return (
    <Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <Card.Body>
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
                          <div className="bg-soft-primary avatar-60 rounded">
                          {
                            item?.name_event == 'facebook' ?
                            <AiFillFacebook className="icon-35" />: item?.name_event == 'whatsapp'? <AiOutlineWhatsApp className="icon-35" />: item?.name_event == 'instagram'? <AiFillInstagram className="icon-35" />: item?.name_event == 'youtube'? <AiFillYoutube className="icon-35" />: item?.name_event == 'guardar contacto' ? <BsPersonFillAdd className="icon-35" />: item?.name_event == 'apertura' ? <MdOpenInBrowser className="icon-35" />: <CgWebsite className="icon-35" />
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
