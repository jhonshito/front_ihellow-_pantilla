import React, { useEffect, useState, Suspense } from 'react'
import { Button } from "react-bootstrap";

import { Outlet, useLocation } from 'react-router-dom'
import avatar1 from "../../assets/images/avatars/01.png";
import Select from "react-select";

import { useCards_listMutation } from "../../api/apiSplice";
import Loader from '../loading/Loader';
import InicioEmpresario from './InicioEmpresario';

import ChoicesJs from "../Choices";

//flatpickr
import Flatpickr from "react-flatpickr";

import moment from "moment";
const options = [
  {value: new Date(), label: "Today"},
  { value: "7", label: "Past 7 Days" },
  { value: "15", label: "Past 15 Days" },
  { value: "30", label: "Past 30 Days" },
];

const Empresario = ({setIdLanding, setFecha}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [datos, setDatos] = useState();
  const [selectedOption, setSelectedOption] = useState(null);

  const [dateInicial, setDateInicial] = useState(new Date());
  const [dateFinal, setDateFinal] = useState(new Date());

  const [fechas, setFechas] = useState({
    fechaInicial: '',
    fechaFinal: ''
  });

  useEffect(() => {
    setFecha(fechas);
  }, [fechas])

  const [cards] = useCards_listMutation();
  const location = useLocation();

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
      fechaFinal: dateFinal
    });

    setFecha(fechas);
  };

  const handleValue = (event) => {
    setSelectedOption(event)
    setIdLanding(event.value)
    if(event){
      localStorage.setItem('idLanding', JSON.stringify(event.value))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Mostrar el loading
        const res = await cards({
          id: JSON.parse(localStorage.getItem('data')).id_company,
        });
        // setAnality(res)
        if(res.data){
          setDatos(res?.data?.cards)
          console.log(res.data)
          localStorage.setItem('idLanding', JSON.stringify(res?.data?.cards[0]?.id_landing));
          setSelectedOption(res?.data?.cards[0]);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false); // Ocultar el loading
      }
    };
    
    fetchData();
  }, [])

  const opciones = datos?.map(item => ({
      value: item?.id_landing,
      label: item?.names,
      imagen: item?.logo == 'userdemo.png' ? avatar1 : item?.logo
  }));

  if(isLoading){
      return <Loader />
  }

  return (
    <div>
      <div
            className="form-group mb-0 custom-choicejs mb-5"
            style={{ minWidth: "145px" }}
          >
            {opciones && opciones.length > 0 ? (
          <Select 
            options={opciones}
            onChange={handleValue}
            defaultValue={opciones[0]}
            formatOptionLabel={({ imagen, label }) => (
                <div className="d-flex align-items-center gap-3 px-4">
                  <img
                    src={imagen}
                    alt="User-Profile"
                    className="theme-color-img img-fluid avatar avatar-50 avatar-rounded"
                    loading="lazy"
                  />
                  <p className="ml-2 mb-0">{label}</p>
                </div>
            )}
        />
        ) : (
          <p>No hay opciones disponibles.</p>
        )}
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-3 mt-5">
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
          </div>
            {
              location.pathname === '/home' ?
              <InicioEmpresario idLanding={selectedOption.value} fechas={fechas} />: ''
            }
          <Suspense fallback="loading">
              <Outlet></Outlet>
          </Suspense>
    </div>
  )
}

export default Empresario
