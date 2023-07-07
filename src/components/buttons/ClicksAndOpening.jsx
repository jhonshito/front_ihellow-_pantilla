import { Row, Col, Dropdown, Button, Card } from "react-bootstrap";

import React, { useEffect, useState } from 'react'

import { useMetricasMutation } from "../../api/apiSplice";

import { useGetLocalStorange } from "../hooks/sendLocalstorange";
import Loader from "../loading/Loader";

const ClicksAndOpening = ({idLanding, fechas}) => {

    const [metricas] = useMetricasMutation();

    const [isLoading, setIsLoading] = useState(true);
    const [datos, setDatos] = useState();

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
            // console.log(res)
            console.log('si')
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
    <div>
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
    </div>
  )
}

export default ClicksAndOpening
