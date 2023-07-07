import Login from "./components/Login"

import "shepherd.js/dist/css/shepherd.css";
import "flatpickr/dist/flatpickr.css";
import 'choices.js/public/assets/styles/choices.min.css'
import "./assets/scss/qompac-ui.scss"
import "./assets/scss/dark.scss"
import "./assets/scss/rtl.scss"
import "./assets/scss/custom.scss"
import "./assets/custom/scss/custom.scss"
import 'swiper/css';
import 'swiper/css/navigation';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarraLateral from "./components/BarraLateral";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";

import { apiSplice } from "./api/apiSplice";
import store from "./app/store";
import Register from "./components/Register";
import Data from "./components/Data";
import Tarjeta from "./components/Tarjeta";
// import Index from "./components/Index";
import Confirmacion from "./components/auth/Confirmacion";
import Empresario from "./components/empresario/Empresario";
import React, { useEffect, useState, Suspense } from "react";
// import DataEmpresario from "./components/empresario/DataEmpresario";
// import CardEmpresario from "./components/empresario/CardEmpresario";
import Perfil from "./components/auth/Perfil";
import Landing from "./components/Landing";
import DataFilter from "./components/emprendedor/DataFilter";
import Company from "./components/empresario/Company";
import EditCard from "./components/empresario/EditCard";
import SendEmail from "./components/auth/SendEmail";
import EmailSuccess from "./components/auth/EmailSuccess";
import ForgetPass from "./components/auth/ForgetPass";
import SuccessPass from "./components/auth/SuccessPass";
import Politicas from "./components/politicaYprivacidad/Politicas";
import Condiciones from "./components/condicionesDeUso/Condiciones";


function App() {

  const [estado, setEstado] = useState(0);
  const [role, setRole] = useState(0);
  const [idLanding, setIdLanding] = useState();
  const [idUser, setIdUser] = useState();
  const [fecha, setFecha] = useState();
  const [dataFecha, setDataFecha] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    setRole(data)
  }, [estado, idLanding])

  return (
    <BrowserRouter>
      <ApiProvider api={apiSplice}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Login setEstado={setEstado} estado={estado} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm" element={<Confirmacion />} />
            <Route path="/forget" element={<SendEmail />} />
            <Route path="/forgetPass/:id" element={<ForgetPass />} />
            <Route path="/emailSucess" element={<EmailSuccess />} />
            <Route path="/successPass" element={<SuccessPass />} />
            <Route path="/home" element={<BarraLateral />} >
              {
                role?.role ? (
                  <>
                    <Route path="/home" element={<Empresario setIdLanding={setIdLanding} setFecha={setFecha} setIdUser={setIdUser} />} >
                      <Route path="/home/dataEmpresario" element={<Data idLanding={idLanding} fechaFiltro={fecha} />} />
                      <Route path="/home/landing" element={<Landing role={role} idLanding={idLanding} />} />
                      <Route path="/home/tarjeta" element={<Tarjeta role={role} idUser={idUser} />} />
                      <Route path="/home/editcard" element={<EditCard role={role} idUser={idUser} />} />
                    </Route>
                  </>
                ): (
                    <Route path="/home" element={<DataFilter setDataFecha={setDataFecha} />} >
                      <Route path="/home/data" element={<Data fechaFiltro={dataFecha} />} />
                      <Route path="/home/landing" element={<Landing role={role} />} />
                      <Route path="/home/tarjeta" element={<Tarjeta role={role} />} />
                    </Route>
                )
              }
              {
                role?.role ?
                  <Route path="/home/company" element={<Company />} />: ''
              }
              
              <Route path="/home/terms-of-service" element={<Condiciones />} />
              <Route path="/home/privacy-policy" element={<Politicas />} />
              <Route path="/home/perfil" element={<Perfil />} />
            </Route>
          </Routes>
        </Provider>
      </ApiProvider>
    </BrowserRouter>
  )
}

export default App
