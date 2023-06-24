import React, { useState } from 'react'

//react-bootstrap
import { Row, Col, Form, Image, Button } from 'react-bootstrap'

//components
import Card from '../bootstrap/card'

//router
import { Link } from 'react-router-dom'

// img
import imgsuccess from '../../assets/images/pages/img-success.png'

const Company = () => {

    const [show, AccountShow] = useState('A');

  return (
    <Row>
            <Col sm="12" lg="12">
                <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                            <h4 className="card-title">Simple Wizard</h4>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Form id="form-wizard1" className="text-center mt-3">
                            <ul id="top-tab-list" className="p-0 row list-inline">
                                <li className={` ${show === 'Image' ? ' active done' : ''} ${show === 'Personal' ? ' active done' : ''} ${show === 'Account' ? ' active done' : ''} ${show === 'A' ? 'active' : ''} col-lg-3 col-md-6 text-start mb-2 active`} id="account">
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
                                <li id="personal" className={`${show === 'Personal' ? ' active done' : ''} ${show === 'Image' ? ' active done' : ''} ${show === 'Account' ? 'active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
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
                                <li id="payment" className={`${show === 'Image' ? ' active done' : ''} ${show === 'Personal' ? 'active' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                    <Link to="#">
                                        <div className="iq-icon me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon-20" width="20" viewBox="0 0 24 24" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M16.71 10.0721C16.71 10.5716 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5716 18.52 10.0721C18.52 9.57269 18.11 9.16315 17.61 9.16315C17.11 9.16315 16.71 9.57269 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2542 12 17.2542C10.95 17.2542 9.97 16.8446 9.22 16.1054C8.48 15.3563 8.07 14.3774 8.07 13.3285C8.06 12.2897 8.47 11.3108 9.21 10.5616C9.96 9.81243 10.95 9.40288 12 9.40288C13.05 9.40288 14.04 9.81243 14.78 10.5516C15.52 11.3008 15.93 12.2897 15.93 13.3285C15.92 14.4173 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0799 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9778 9.82 14.5871 10.28 15.0466C10.74 15.5061 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                        <span>Image</span>
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
                                            <h2 className="steps">Step 1 - 4</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Name: *</label>
                                                <input type="text" className="form-control" name="name" placeholder="Name Id" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Identify: *</label>
                                                <input type="text" className="form-control" name="identify" placeholder="Identify" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Phones: *</label>
                                                <input type="text" className="form-control" name="phone" placeholder="Phone" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Addresses: *</label>
                                                <input type="text" className="form-control" name="addresses" placeholder="Addresses" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Country: *</label>
                                                <input type="text" className="form-control" name="country" placeholder="Country" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">City: *</label>
                                                <input type="text" className="form-control" name="city" placeholder="City" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button type="button" name="next" className="next action-button float-end" value="Next" onClick={() => AccountShow('Account')} >Next</Button>
                            </fieldset>
                            <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                                <div className="form-card text-start">
                                    <div className="row">
                                        <div className="col-7">
                                            <h3 className="mb-4">Personal Information:</h3>
                                        </div>
                                        <div className="col-5">
                                            <h2 className="steps">Step 2 - 4</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Página Web.</label>
                                                <input type="text" className="form-control" name="fname" placeholder="Ingresa tu sitio web" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">LinkedIn</label>
                                                <input type="text" className="form-control" name="lname" placeholder="Ingresa tu LinkedIn" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Instagram</label>
                                                <input type="text" className="form-control" name="phno" placeholder="Ingresa tu Instagram" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Facebook</label>
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa tu Facebook" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Twitter</label>
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa tu Twitter" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">TikTok</label>
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa tu TikTok" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Cana de Youtube</label>
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa tu Cana de Youtube" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Enlace Adicional</label>
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa un Enlace Adicional" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tu Ciudad de Entrega: *</label>
                                                <select name="" className="form-control">
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
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa tu barrio" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Dirección de Entrega</label>
                                                <input type="text" className="form-control" name="phno_2" placeholder="Ingresa tu Dirección" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tu tarjeta tendrá de manera obligatoria el QR. Dinos qué deseas que aparezca en tu Tarjeta Impresa: *</label>
                                                <select name="" className="form-control">
                                                    <option value="" disabled selected hidden>Selecciona una opción.</option>
                                                    <option value="logo">Tu Logo (Recomendable)</option>
                                                    <option value="marca">Tu Nombre o Marca Personal (Recomendable si tu logo no cuenta con tu nombre)</option>
                                                    <option value="foto">Tu Foto (No es recomendable )</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button type="button" name="next" className="next action-button float-end" value="Next" onClick={() => AccountShow('Personal')} >Next</Button>
                                <Button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('A')} >Previous</Button>
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
                                        <label className="form-label">Logo company:</label>
                                        <input type="file" className="form-control" name="logocompany" accept="image/*" />
                                    </div>
                                </div>
                                <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Submit" onClick={() => AccountShow('Image')} >Submit</button>
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
    </Row>
  )
}

export default Company
