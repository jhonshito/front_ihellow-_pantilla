import React, { useState, Fragment, memo, useRef } from 'react'

// react-bootstrap
import { Row, Col, Image, Form, Button, ListGroup } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate, Link } from "react-router-dom";

// import Card from "./components/bootstrap/card";
import Card from "../bootstrap/card";

import auth1 from '../../assets/images/auth/01.png'

// logo
import Logo from "../../assets/iHellow-Logo.webp";

// querys
import { useSend_emailMutation } from "../../api/apiSplice";

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendEmail = () => {

    const [correo, setCorreo] = useState();
    const [ send_email ] = useSend_emailMutation();

    const navigate = useNavigate();

    const handleSendEmail = async(e) => {
        e.preventDefault()

        if(!correo){
            return toast.warning('El correo es requerido', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        };

        try {
            const res = await send_email({email: correo});
            console.log(res)

            if(res?.data?.status == 200){
                navigate('/emailSucess')
            }else {
                navigate('/forget')
            }
            
        } catch (error) {
            
            console.log(error)
        }
    }

  return (
    <Fragment>
   <section className="login-content">
      <Row className="row m-0 align-items-center bg-white">
         <Col md="12" lg="6" className='align-self-center'>
            <Link to='/' className="navbar-brand d-flex align-items-center  justify-content-center text-primary">
               <img src={Logo} className='text-primary w-50' alt="logo de ihellow" />
            </Link>
            <Row className="justify-content-center pt-5">
               <Col md="10">
                  <Card className="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                     <Card.Body>
                        <h2 className="mb-2 text-center">Restore password</h2>
                        <Form onSubmit={handleSendEmail}>
                           <Row>
                              <Col lg="12">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="username" className="">Email</Form.Label>
                                    <Form.Control type="text" className="" id="email" onChange={(e) => setCorreo(e.target.value)} aria-describedby="username" placeholder="Enter your email to reset your password" name='username'/>
                                 </Form.Group >
                              </Col>
                           </Row>
                           <div className="d-flex justify-content-center">
                              <Button type="submit" variant="btn btn-primary">Send</Button>
                           </div>
                        </Form>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </Col>
         <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1  overflow-hidden">
            <Image src={auth1} className="Image-fluid gradient-main" alt="images" />
         </Col>
      </Row>
   </section>
   <ToastContainer />
   </Fragment>
  )
}

export default SendEmail
