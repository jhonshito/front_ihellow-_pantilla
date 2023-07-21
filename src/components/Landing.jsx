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
import { useGetLocalStorange, useSendLocalStorange } from "./hooks/sendLocalstorange";
import { useLista_landing_by_idQuery, useUpdate_landingMutation, useAdd_img_landingMutation } from "../api/apiSplice";
import Loader from './loading/Loader'

const Landing = ({role}) => {

    const id = role?.role ? useGetLocalStorange('dataUserSelect')?.id_landing: useGetLocalStorange('data')?.id_landing || useGetLocalStorange('idLanding');
    const { data, isLoading, error } = useLista_landing_by_idQuery({ id });
    const [ update_landing ] = useUpdate_landingMutation();

    const [ add_img_landing ] = useAdd_img_landingMutation();

    const [datos, setDatos] = useState({
        alias: data?.result?.alias || '',
        url: data?.result?.url || '',
        seo: data?.result?.url || '',
        foto: data?.result?.foto || useGetLocalStorange('foto_landing'),
        fondo: data?.result?.fondo|| useGetLocalStorange('fondo_landing'),
        linkedin: data?.result?.parameters?.links?.linkedin,
        instagram: data?.result?.parameters?.links?.instagram,
        facebook: data?.result?.parameters?.links?.facebook,
        twitter: data?.result?.parameters?.links?.twitter,
        tiktok: data?.result?.parameters?.links?.tiktok,
        youtube: data?.result?.parameters?.links?.youtube,
        enlace1: data?.result?.parameters?.links?.enlace1,
        enlace2: data?.result?.parameters?.links?.enlace2,
        enlace3: data?.result?.parameters?.links?.enlace3,
        // ciudad: data?.result?.parameters?.links?.ciudad,
        // barrio: data?.result?.parameters?.links?.barrio,
        // direccion: data?.result?.parameters?.links?.direccion,
        // recomendacion_card: data?.result?.parameters?.links?.recomendacion_card
        
    });


    const [show, AccountShow] = useState('A');


    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos((prevDatos) => ({
          ...prevDatos,
          [name]: value
        }));

        console.log(name, value)
        // setParameter((prevDatos) => ({
        //     ...prevDatos,
        //     [name]: value
        // }));

        // Buscar si ya existe un objeto con el mismo nombre en el arreglo
        // const existingDataIndex = formArray.findIndex((data) => data.name === name);

        // if (existingDataIndex !== -1) {
        //   // Si existe, actualizar el valor en el objeto existente
        //   const updatedData = { ...formArray[existingDataIndex], url: value };
        //   const updatedArray = [...formArray];
        //   updatedArray[existingDataIndex] = updatedData;
        //   setFormArray(updatedArray);
        // } else {
        //   // Si no existe, agregar un nuevo objeto al arreglo
        //   const newData = {
        //     name: name, // Nombre personalizado
        //     url: value // Valor del input
        //   };
        //   setFormArray([...formArray, newData]);
        // }
    };

    useEffect(() => {
        setDatos((prevDatos) => ({
            ...prevDatos,
            alias: data?.result?.alias || '',
            url: data?.result?.url || '',
            seo: data?.result?.url || '',
            foto: data?.result?.foto || useGetLocalStorange('foto_landing'),
            fondo: data?.result?.fondo || useGetLocalStorange('fondo_landing'),
            linkedin: data?.result?.parameters?.links?.linkedin || '',
            instagram: data?.result?.parameters?.links?.instagram || '',
            facebook: data?.result?.parameters?.links?.facebook || '',
            twitter: data?.result?.parameters?.links?.twitter || '',
            tiktok: data?.result?.parameters?.links?.tiktok || '',
            youtube: data?.result?.parameters?.links?.youtube || '',
            enlace1: data?.result?.parameters?.links?.enlace1 || '',
            enlace2: data?.result?.parameters?.links?.enlace2 || '',
            enlace3: data?.result?.parameters?.links?.enlace3 || '',
            // ciudad: data?.result?.parameters?.links?.ciudad || '',
            // barrio: data?.result?.parameters?.links?.barrio || '',
            // direccion: data?.result?.parameters?.links?.direccion || '',
            // recomendacion_card: data?.result?.parameters?.links?.recomendacion_card || ''
          }));
    }, [data])

    const [fotos, setFoto] = useState(false);
    const [fondos, setFondo] = useState(false);
   
    const handelNext = () => {
        if(datos.alias && datos.url && datos.seo){
            AccountShow('Account')
        }
    }

    const handleTwo = () => {
        AccountShow('Personal')
    }

    // add imgs
    const handleFile = async(event) => {
        const inputName = event.target.name;
        const file = event.target.files[0]; // Solo captura el primer archivo seleccionado
        const formData = new FormData();
        formData.append('file', file, inputName);

        try {
            
            const res = await add_img_landing({id: data?.result?.id, formData});
            useSendLocalStorange(res?.data?.original_filename, res?.data?.url)

        } catch (error) {
            console.log(error);
        }
    }

    // edita foto
    const handleEditFoto = () => {
        setFoto(true)
    }

    // edita fondo
    const handleEditFondo = () => {
        setFondo(true)
    }

    const handelNextTwo = async({idLanding}) => {

        const id_landing = role?.role ? idLanding: useGetLocalStorange('data')?.id_landing;

        const {alias, url, seo, foto, fondo} = datos;

        const formArray = [
            { name: 'linkedin', url: datos?.linkedin },
            { name: 'instagram', url: datos?.instagram },
            { name: 'facebook', url: datos?.facebook },
            { name: 'twitter', url: datos?.twitter },
            { name: 'tiktok', url: datos?.tiktok },
            { name: 'youtube', url: datos?.youtube },
            { name: 'enlace1', url: datos?.enlace1 },
            { name: 'enlace2', url: datos?.enlace2 },
            { name: 'enlace3', url: datos?.enlace3 },
            // { name: 'ciudad', url: datos?.ciudad },
            // { name: 'barrio', url: datos?.barrio },
            // { name: 'direccion', url: datos?.direccion },
            // { name: 'recomendacion_card', url: datos?.recomendacion_card }
        ]

        const foto_landing = useGetLocalStorange('foto_landing');
        const fondo_landing = useGetLocalStorange('fondo_landing');

        try {
            const res = await update_landing({id_landing: id || id_landing,alias, url, seo, foto: foto_landing || foto, fondo: fondo_landing || fondo_landing, parameter: formArray});

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
                AccountShow('Image');
            }

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

    console.log(data);

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
                                <li className={`${show === 'Image' ? ' active done' : ''} ${show === 'Personal' ? ' active done' : ''} ${show === 'Account' ? ' active done' : ''} ${show === 'A' ? 'active' : ''} col-lg-3 col-md-6 text-start mb-2 active`} id="account">
                                    <Link to="#">
                                        <div className="iq-icon me-3">
                                            <svg className="icon-20 svg-icon" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M8.23918 8.70907V7.36726C8.24934 5.37044 9.92597 3.73939 11.9989 3.73939C13.5841 3.73939 15.0067 4.72339 15.5249 6.19541C15.6976 6.65262 16.2057 6.89017 16.663 6.73213C16.8865 6.66156 17.0694 6.50253 17.171 6.29381C17.2727 6.08508 17.293 5.84654 17.2117 5.62787C16.4394 3.46208 14.3462 2 11.9786 2C8.95048 2 6.48126 4.41626 6.46094 7.38714V8.91084L8.23918 8.70907Z" fill="currentColor"></path>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.7688 8.71118H16.2312C18.5886 8.71118 20.5 10.5808 20.5 12.8867V17.8246C20.5 20.1305 18.5886 22.0001 16.2312 22.0001H7.7688C5.41136 22.0001 3.5 20.1305 3.5 17.8246V12.8867C3.5 10.5808 5.41136 8.71118 7.7688 8.71118ZM11.9949 17.3286C12.4928 17.3286 12.8891 16.941 12.8891 16.454V14.2474C12.8891 13.7703 12.4928 13.3827 11.9949 13.3827C11.5072 13.3827 11.1109 13.7703 11.1109 14.2474V16.454C11.1109 16.941 11.5072 17.3286 11.9949 17.3286Z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                        <span>Setting</span>
                                    </Link>
                                </li>
                                <li id="personal" className={`${show === 'Personal' ? ' active done' : ''} ${show === 'Image' ? ' active done' : ''} ${show === 'Account' ? 'active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                    <Link to="#">
                                        <div className="iq-icon me-3">
                                            <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path>
                                                <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                        <span>Buttons</span>
                                    </Link>
                                </li>
                                <li id="payment" className={`${show === 'Image' ? ' active done' : ''} ${show === 'Personal' ? 'active' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                    <Link to="#">
                                        <div className="iq-icon me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon-20" width="20" viewBox="0 0 24 24" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M16.71 10.0721C16.71 10.5716 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5716 18.52 10.0721C18.52 9.57269 18.11 9.16315 17.61 9.16315C17.11 9.16315 16.71 9.57269 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2542 12 17.2542C10.95 17.2542 9.97 16.8446 9.22 16.1054C8.48 15.3563 8.07 14.3774 8.07 13.3285C8.06 12.2897 8.47 11.3108 9.21 10.5616C9.96 9.81243 10.95 9.40288 12 9.40288C13.05 9.40288 14.04 9.81243 14.78 10.5516C15.52 11.3008 15.93 12.2897 15.93 13.3285C15.92 14.4173 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0799 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9778 9.82 14.5871 10.28 15.0466C10.74 15.5061 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                        <span>Images</span>
                                    </Link>
                                </li>
                                <li id="confirm" className={`${show === 'Image' ? ' active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
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
                                                <label className="form-label">LinkedIn</label>
                                                <input type="text" className="form-control" name="linkedin" value={datos?.linkedin} onChange={handleChange} placeholder="Ingresa tu LinkedIn" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Instagram</label>
                                                <input type="text" className="form-control" name="instagram" value={datos?.instagram} onChange={handleChange} placeholder="Ingresa tu Instagram" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Facebook</label>
                                                <input type="text" className="form-control" name="facebook" value={datos?.facebook} onChange={handleChange} placeholder="Ingresa tu Facebook" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Twitter</label>
                                                <input type="text" className="form-control" name="twitter" value={datos?.twitter} onChange={handleChange} placeholder="Ingresa tu Twitter" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">TikTok</label>
                                                <input type="text" className="form-control" name="tiktok" value={datos?.tiktok} onChange={handleChange} placeholder="Ingresa tu TikTok" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Youtube</label>
                                                <input type="text" className="form-control" name="youtube" value={datos?.youtube} onChange={handleChange} placeholder="Ingresa tu Cana de Youtube" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="enlace1" value={datos?.enlace1} onChange={handleChange} placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="enlace2" value={datos?.enlace2} onChange={handleChange} placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="enlace3" value={datos?.enlace3} onChange={handleChange} placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tu Ciudad de Entrega: *</label>
                                                <select value={datos?.ciudad} name="ciudad" className="form-control" onChange={handleChange}>
                                                    <option value="" disabled hidden>Selecciona una opción.</option>
                                                    <option value="bogota">Bogota</option>
                                                    <option value="cali">Cali</option>
                                                    <option value="medellin">Medellin</option>
                                                </select>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Barrio de Entrega</label>
                                                <input type="text" className="form-control" name="barrio" value={datos?.barrio} onChange={handleChange} placeholder="Ingresa tu barrio" />
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Dirección de Entrega</label>
                                                <input type="text" className="form-control" name="direccion" value={datos?.direccion} onChange={handleChange} placeholder="Ingresa tu Dirección" />
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tu tarjeta tendrá de manera obligatoria el QR. Dinos qué deseas que aparezca en tu Tarjeta Impresa: *</label> 
                                                <select name="recomendacion_card" value={datos?.recomendacion_card} onChange={handleChange} className="form-control">
                                                    <option value="" disabled hidden>Selecciona una opción.</option>
                                                    <option value="logo">Tu Logo (Recomendable)</option>
                                                    <option value="marca">Tu Nombre o Marca Personal (Recomendable si tu logo no cuenta con tu nombre)</option>
                                                    <option value="foto">Tu Foto (No es recomendable )</option>
                                                </select>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            {/* <fieldset className={`${show !== 'Account' ? 'd-block' : 'd-none'}`}> */}
                                <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Submit" onClick={handleTwo} >Next</button>
                                <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('A')} >Previous</button>
                            {/* </fieldset> */}
                            </fieldset>
                            <fieldset className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                                <div className="form-card text-start">
                                    <div className="row">
                                        <div className="col-7">
                                            <h3 className="mb-4">Image Upload:</h3>
                                        </div>
                                        <div className="col-5">
                                            <h2 className="steps">Step 3 - 4</h2>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Foto landing:</label>
                                        <div className='d-flex gap-5 align-items-center w-100'>
                                            {
                                                data?.result?.foto ?
                                                <div className="form-label">
                                                    <img className="theme-color-img img-fluid avatar avatar-50" src={data?.result?.foto} alt="Company logo." />
                                                </div>: ''
                                            }
                                            {
                                                data?.result?.foto == null ?
                                                <div className='d-flex gap-5 align-items-center'>
                                                    <div className='w-100'>
                                                        <input type="file" onChange={handleFile}  className="form-control" name="foto_landing" accept="image/*" />
                                                    </div>
                                                </div>: fotos === true ? 
                                                <div className='d-flex gap-5 align-items-center'>
                                                <div className='w-100'>
                                                    <input type="file" onChange={handleFile}  className="form-control" name="foto_landing" accept="image/*" />
                                                </div>
                                            </div>:
                                                <a className="" onClick={handleEditFoto} name='side_a' type='button'>
                                                    Edit image
                                                </a>
                                            }
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Fondo landing:</label>
                                        <div className='d-flex gap-5 align-items-center w-100'>
                                            {
                                                data?.result?.fondo ?
                                                <div className="form-label">
                                                    <img className="theme-color-img img-fluid avatar avatar-50" src={data?.result?.fondo} alt="Company logo." />
                                                </div>: data?.result?.fondo == 'fondo_landing' ? '': ''
                                            }
                                            {
                                                data?.result?.fondo == null ?
                                                <div className='d-flex gap-5 align-items-center'>
                                                    <div className='w-100'>
                                                        <input type="file" onChange={handleFile}  className="form-control" name="fondo_landing" accept="image/*" />
                                                    </div>
                                                </div>: fondos === true ?
                                                <div className='d-flex gap-5 align-items-center'>
                                                <div className='w-100'>
                                                    <input type="file" onChange={handleFile}  className="form-control" name="fondo_landing" accept="image/*" />
                                                </div>
                                            </div>:
                                                <a className="" onClick={handleEditFondo} name='side_a' type='button'>
                                                Edit image
                                                </a>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={handelNextTwo} name="next" className="btn btn-primary next action-button float-end" value="Submit" >Submit</button>
                                <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('Account')} >Previous</button>
                            </fieldset>
                            <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                                <div className="form-card">
                                    <Row>
                                        <div className="col-7">
                                            <h3 className="mb-4 text-left">Finish:</h3>
                                        </div>
                                        <div className="col-5">
                                            <h2 className="steps">Step 4 - 4</h2>
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
