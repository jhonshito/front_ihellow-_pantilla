import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, memo, Fragment, useState, Suspense } from "react";
import { Row, Col, Dropdown, Button, Card } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";

import ChoicesJs from "../Choices";

//flatpickr
import Flatpickr from "react-flatpickr";

import moment from "moment";
import Index from '../Index';
import InicioEmpresario from '../empresario/InicioEmpresario';
const options = [
  {value: new Date(), label: "Today"},
  { value: "7", label: "Past 7 Days" },
  { value: "15", label: "Past 15 Days" },
  { value: "30", label: "Past 30 Days" },
];


const DataFilter = ({setDataFecha, role}) => {

    const [selectedOption, setSelectedOption] = useState(7);

    const [dateInicial, setDateInicial] = useState(new Date());
    const [dateFinal, setDateFinal] = useState(new Date());

    const location = useLocation();

    const [fechas, setFechas] = useState({
        fechaInicial: '',
        fechaFinal: '',
        fechaFitro: 0
    });

    useEffect(() => {
        setDataFecha(fechas);
    }, [fechas]);

    const handleComboFecha = (event) => {
        const evento = event.target.value || new Date();
    
        const fechaActual = moment();
        const fechaHace7Dias = fechaActual.subtract(evento, 'days');
        const diaHaceDias = fechaHace7Dias.format('YYYY-MM-DD');
        setDateInicial(diaHaceDias);
    }

    const handleDateChange = (date) => {
        const nuevaFechaInicial = moment(date[0]).format('YYYY-MM-DD');
        setDateInicial(nuevaFechaInicial);
    };

    const handleDateSecond = (date) => {
        const nuevaFechaFinal = moment(date[0]).format('YYYY-MM-DD');
        setDateFinal(nuevaFechaFinal);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
    
        if(!dateInicial){
          toast.warning('Tienes que enviar una fecha inicial', {
            position: toast.POSITION.TOP_CENTER
          })
          return
        }
    
    
        if(!dateFinal){
          toast.warning('Tienes que enviar una fecha final', {
            position: toast.POSITION.TOP_CENTER
          })
          return
        }
    
        // Actualizar el estado con las nuevas fechas
        setFechas({
          fechaInicial: dateInicial,
          fechaFinal: dateFinal,
          fechaFitro: fechas.fechaFitro + 1
        });
    };


  return (
    <div>
      {
      (location?.pathname === '/home' || location?.pathname === '/home/data') ? (
        <div className="d-flex' justify-content-between align-items-center flex-wrap mb-4 gap-3">
          <div className="d-flex flex-column">
            <h3>Quick Insights</h3>
            <p className="text-primary mb-0">Financial Dashboard</p>
          </div>
          <div className="d-flex justify-content-between align-items-center rounded flex-wrap gap-3">
            <div
              className="form-group mb-0 custom-choicejs"
              style={{ minWidth: "145px" }}
            >
              <ChoicesJs
                options={options}
                onChange={(event) => {
                  setSelectedOption(event.target.value);
                  handleComboFecha(event);
                }}
                className="js-choice"
                select="one"
                value={selectedOption}
              />
            </div>

            <div className="form-group mb-0 ">
              <Flatpickr
                options={{ mode: "single", minDate: undefined }}
                className="form-control range_flatpicker"
                onChange={handleDateChange}
                value={dateInicial}
              />
            </div>
            <div className="form-group mb-0 ">
              <Flatpickr
                options={{ mode: "single", minDate: undefined }}
                className="form-control range_flatpicker"
                placeholder="Fecha final"
                onChange={handleDateSecond}
                value={dateFinal}
              />
            </div>

            <Button type="button" onClick={handleSubmit} className="primary">
              Analytics
            </Button>

          </div>
        </div>
      ):null
      }
      {
        location.pathname === '/home' ?
        <Suspense fallback="loading">
          <InicioEmpresario fechas={fechas} />
        </Suspense>: ''
      }
        <Suspense fallback="loading">
            <Outlet></Outlet>
        </Suspense>
    </div>
  )
}

export default DataFilter
