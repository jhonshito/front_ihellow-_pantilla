import React, { useEffect, useState } from 'react'

//react-bootstrap
import { Row, Col, Form, Image, Button, Alert } from 'react-bootstrap'

//components
import Card from './bootstrap/card'

//router
import { Link } from 'react-router-dom'

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// img
import imgsuccess from '../assets/images/pages/img-success.png'
import { useGetLocalStorange } from "./hooks/sendLocalstorange";
import { useLista_landing_by_idQuery, useUpdate_landingMutation } from "../api/apiSplice";
import Loader from './loading/Loader'

const Landing = ({role}) => {

    const id = role?.role ? useGetLocalStorange('dataUserSelect')?.id_landing: useGetLocalStorange('data')?.id_landing || useGetLocalStorange('idLanding');
    const { data, isLoading, error } = useLista_landing_by_idQuery({ id });
    const [ update_landing ] = useUpdate_landingMutation();
    const [datos, setDatos] = useState({
        alias: data?.result?.alias || '',
        url: data?.result?.url || '',
        seo: data?.result?.url || '',
        pagina_web: '',
        linkedin: '',
        instagram: '',
        facebook: '',
        twitter: '',
        tiktok: '',
        canal_youtube: '',
        enlace1: '',
        enlace2: '',
        enlace3: '',
        ciudad: '',
        barrio: '',
        direccion: '',
        recomendacion_card: ''
    });

    const [show, AccountShow] = useState('A');

    useEffect(() => {
        setDatos((prevDatos) => ({
          ...prevDatos,
          alias: data?.result?.alias || '',
          url: data?.result?.url || '',
          seo: data?.result?.seo || ''
        }));
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos((prevDatos) => ({
          ...prevDatos,
          [name]: value
        }));
    };

    const handelNext = () => {
        if(datos.alias && datos.url && datos.seo){
            AccountShow('Account')
            console.log(datos)
        }
    }

    const handelNextTwo = async() => {

        const id_landing = role?.role ? useGetLocalStorange('dataUserSelect')?.id_landing: useGetLocalStorange('data')?.id_landing;
        const {alias, url, seo, pagina_web, linkedin, instagram, facebook, twitter, tiktok,canal_youtube, enlace1, enlace2, enlace3, ciudad, barrio, direccion,
        recomendacion_card} = datos;
        console.log(id_landing)

        try {
            const res = await update_landing({id_landing: id || id_landing,alias, url, seo, pagina_web, linkedin, instagram, facebook, twitter, tiktok,canal_youtube, enlace1, enlace2, enlace3, ciudad, barrio, direccion,
            recomendacion_card});

            const { data, error } = res;
            
            if(error?.status == 400){
                toast.warn(error?.data?.mensaje, {
                    position: toast.POSITION.TOP_CENTER
                })
            }

            if(data?.status == 404){
                toast.warn(data?.mensaje, {
                    position: toast.POSITION.TOP_CENTER
                })
            }

            if(data?.status == 200){
                AccountShow('Personal');
            }

            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    if (isLoading) {
        return <Loader />; // Muestra un componente de carga mientras se obtienen los datos
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Manejo de error
    }


  return (
    <Row>
        <Col sm="12" lg="12">
        {
                data?.result?.complete ? 
                <Alert variant="alert alert-primary " className="d-flex align-items-center" role="alert">
                           <svg className="bi flex-shrink-0 me-2" width="24" height="24">
                           </svg>
                           <div>
                                Your data is up to date you can change it whenever you want (Optional).
                           </div>
                </Alert>:
                <Alert variant="alert alert-danger" className="d-flex align-items-center" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24">
                    </svg>
                    <div>
                        You must enter the data of your landing (Required).
                    </div>
                </Alert>
            }
          <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                            <h4 className="card-title">Simple Wizard</h4>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Form id="form-wizard1" className="text-center mt-3">
                            <ul id="top-tab-list" className="p-0 row list-inline">
                                <li className={`${show === 'Personal' ? ' active done' : ''} ${show === 'Account' ? ' active done' : ''} ${show === 'A' ? 'active' : ''} col-lg-3 col-md-6 text-start mb-2 active`} id="account">
                                    <Link to="#">
                                        <div className="iq-icon me-3">
                                            <svg className="icon-20 svg-icon" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M8.23918 8.70907V7.36726C8.24934 5.37044 9.92597 3.73939 11.9989 3.73939C13.5841 3.73939 15.0067 4.72339 15.5249 6.19541C15.6976 6.65262 16.2057 6.89017 16.663 6.73213C16.8865 6.66156 17.0694 6.50253 17.171 6.29381C17.2727 6.08508 17.293 5.84654 17.2117 5.62787C16.4394 3.46208 14.3462 2 11.9786 2C8.95048 2 6.48126 4.41626 6.46094 7.38714V8.91084L8.23918 8.70907Z" fill="currentColor"></path>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.7688 8.71118H16.2312C18.5886 8.71118 20.5 10.5808 20.5 12.8867V17.8246C20.5 20.1305 18.5886 22.0001 16.2312 22.0001H7.7688C5.41136 22.0001 3.5 20.1305 3.5 17.8246V12.8867C3.5 10.5808 5.41136 8.71118 7.7688 8.71118ZM11.9949 17.3286C12.4928 17.3286 12.8891 16.941 12.8891 16.454V14.2474C12.8891 13.7703 12.4928 13.3827 11.9949 13.3827C11.5072 13.3827 11.1109 13.7703 11.1109 14.2474V16.454C11.1109 16.941 11.5072 17.3286 11.9949 17.3286Z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                        <span>Account</span>
                                    </Link>
                                </li>
                                <li id="personal" className={`${show === 'Personal' ? ' active done' : ''} ${show === 'Account' ? 'active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                    <Link to="#">
                                        <div className="iq-icon me-3">
                                            <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path>
                                                <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                        <span>Personal</span>
                                    </Link>
                                </li>
                                <li id="confirm" className={`${show === 'Personal' ? ' active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                    <Link to="#">
                                        <div className="iq-icon me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span>Finish</span>
                                    </Link>
                                </li>
                            </ul>
                            <fieldset className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
                                <div className="form-card text-start">
                                    <div className="row">
                                        <div className="col-7">
                                            <h3 className="mb-4">Account Information: </h3>
                                        </div>
                                        <div className="col-5">
                                            <h2 className="steps">Step 1 - 3</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Alias: *</label>
                                                <input type="text" className="form-control"
                                                value={datos?.alias}
                                                onChange={handleChange}name="alias" placeholder="Ingresa el nombre de tu negocio" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">url: *</label>
                                                <input type="text" className="form-control" name="url" value={datos?.url} onChange={handleChange} placeholder="Ejemplo: Emprendedor, Empresario, Gerente General" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Seo</label>
                                                <input type="text" className="form-control" name="seo" value={datos?.seo} onChange={handleChange} placeholder="Ejemplo: España, Japon, Marruecos" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button type="button" name="next" className="next action-button float-end" value="Next" onClick={handelNext} >Next</Button>
                            </fieldset>
                            <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                                <div className="form-card text-start">
                                    <div className="row">
                                        <div className="col-7">
                                            <h3 className="mb-4">Personal Information:</h3>
                                        </div>
                                        <div className="col-5">
                                            <h2 className="steps">Step 2 - 3</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Página Web.</label>
                                                <input type="text" className="form-control" name="pagina_web" onChange={handleChange} placeholder="Ingresa tu sitio web" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">LinkedIn</label>
                                                <input type="text" className="form-control" name="linkedin" onChange={handleChange} placeholder="Ingresa tu LinkedIn" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Instagram</label>
                                                <input type="text" className="form-control" name="instagram" onChange={handleChange} placeholder="Ingresa tu Instagram" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Facebook</label>
                                                <input type="text" className="form-control" name="facebook" onChange={handleChange} placeholder="Ingresa tu Facebook" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Twitter</label>
                                                <input type="text" className="form-control" name="twitter" onChange={handleChange} placeholder="Ingresa tu Twitter" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">TikTok</label>
                                                <input type="text" className="form-control" name="tiktok" onChange={handleChange} placeholder="Ingresa tu TikTok" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Cana de Youtube</label>
                                                <input type="text" className="form-control" name="canal_youtube" onChange={handleChange} placeholder="Ingresa tu Cana de Youtube" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="enlace1" onChange={handleChange} placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="enlace2" onChange={handleChange} placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="enlace3" onChange={handleChange} placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tu Ciudad de Entrega: *</label>
                                                <select name="ciudad" className="form-control" onChange={handleChange}>
                                                    <option value="" disabled selected hidden>Selecciona una opción.</option>
                                                    <option value="bogota">Bogota</option>
                                                    <option value="cali">Cali</option>
                                                    <option value="medellin">Medellin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Barrio de Entrega</label>
                                                <input type="text" className="form-control" name="barrio" onChange={handleChange} placeholder="Ingresa tu barrio" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Dirección de Entrega</label>
                                                <input type="text" className="form-control" name="direccion" onChange={handleChange} placeholder="Ingresa tu Dirección" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tu tarjeta tendrá de manera obligatoria el QR. Dinos qué deseas que aparezca en tu Tarjeta Impresa: *</label>
                                                <select name="recomendacion_card" onChange={handleChange} className="form-control">
                                                    <option value="" disabled selected hidden>Selecciona una opción.</option>
                                                    <option value="logo">Tu Logo (Recomendable)</option>
                                                    <option value="marca">Tu Nombre o Marca Personal (Recomendable si tu logo no cuenta con tu nombre)</option>
                                                    <option value="foto">Tu Foto (No es recomendable )</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <fieldset className={`${show !== 'Personal' ? 'd-block' : 'd-none'}`}>
                                <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Submit" onClick={handelNextTwo} >Submit</button>
                                <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('A')} >Previous</button>
                            </fieldset>
                            </fieldset>
                            <fieldset className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                                <div className="form-card">
                                    <Row>
                                        <div className="col-7">
                                            <h3 className="mb-4 text-left">Finish:</h3>
                                        </div>
                                        <div className="col-5">
                                            <h2 className="steps">Step 3 - 3</h2>
                                        </div>
                                    </Row>
                                    <br /><br />
                                    <h2 className="text-success text-center"><strong>SUCCESS !</strong></h2>
                                    <br />
                                    <div className="row justify-content-center">
                                        <div className="col-3"> <Image src={imgsuccess} className="img-fluid" alt="fit-image" /> </div>
                                    </div>
                                    <br /><br />
                                    <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('A')} >Previous</button>
                                    <div className="row justify-content-center">
                                        <div className="col-7 text-center">
                                            <h5 className="purple-text text-center">You Have Successfully Signed Up</h5>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </Form>
                    </Card.Body>
          </Card>
        </Col>
        <ToastContainer />
    </Row>
  )
}

export default Landing
