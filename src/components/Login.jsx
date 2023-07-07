import React, { useState, Fragment, memo, useRef } from 'react'
// import { useLoginMutation } from "./api/apiSplice";

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react-bootstrap
import { Row, Col, Image, Form, Button, ListGroup } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate, Link } from "react-router-dom";

// import facebook from '../src/assets/images/brands/fb.svg'
import facebook from "../assets/images/brands/fb.svg";
import google from '../assets/images/brands/gm.svg'
import instagram from '../assets/images/brands/im.svg'
import linkedin from '../assets/images/brands/li.svg'
import auth1 from '../assets/images/auth/01.png'

// import Card from "./components/bootstrap/card";
import Card from "./bootstrap/card";

// logo
import Logo from "../assets/iHellow-Logo.webp";

import { useLoginMutation } from "../api/apiSplice";
import { useSendLocalStorange } from "./hooks/sendLocalstorange";

// firebase
import { signin, loginWithGoogle, loginWidthFacebook } from "./contentFirebase/AuthFirebase";

const Login = ({setEstado, estado}) => {

   const navigate = useNavigate();

   const [login] = useLoginMutation();

   const [ formData, setFormData ] = useState({
      username: '',
      password: ''
   });

   //  estados de validación
   const [usernameErrorShown, setUsernameErrorShown] = useState(false);
   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

   const datosForm = (event) => {
      const { name, value } = event.target;

      setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
      }));
   };

   const handleSubmit = async(e) => {
      e.preventDefault();

      if(!formData.username){
         toast.warning('El Email no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER
         })
         return
      }

      if(!emailRegex.test(formData.username)){
         toast.warning('El email no es valido', {
            position: toast.POSITION.TOP_CENTER
         })
         return
      }

      if(!formData.password){
         toast.warning('El password no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER
         })
         return
      }

      try {

         const res = await login({namesuser: formData.username, password: formData.password, ismetodo: 'login'});

         const { data, error } = res

         console.log(res)

         if (res.data.status === 200) {
            const data = res.data.data

            //  funcion que guarda en el localstorange
            useSendLocalStorange('data', data);
            toast.success('¡Éxito!', {
               position: toast.POSITION.TOP_CENTER,
               progressClassName: 'bg-primary',
               // bodyClassName: 'bg-primary'
            })

            setTimeout(() => {
               setEstado(estado + 1)
               navigate('/home');
            }, 2000)
            
         } else if (res.data.status === 400) {
           navigate('/');
         } else {
           navigate('/');
         }
          
      } catch (error) {
         console.log(error.message);
      }

   }

   const loginGoogle = async(e) => {
      e.preventDefault();
      try {
         const response = await loginWithGoogle();
         console.log(response);

         const res = await login({namesuser: response.user.email, token: response.user.uid, name: response.displayName, photo: response.photoURL, ismetodo: 'google'});

         const { data, error } = res

         console.log(error)

         if (res.data.status === 200) {
            const data = res.data.data

            //  funcion que guarda en el localstorange
            useSendLocalStorange('data', data);
            toast.success('¡Éxito!', {
               position: toast.POSITION.TOP_CENTER,
               progressClassName: 'bg-primary',
            })

            setTimeout(() => {
               setEstado(estado + 1)
               navigate('/home');
            }, 2000)

         } else if (error.data.status === 400) {

           navigate('/');

         } else {

           navigate('/');

         }
      } catch (error) {
         console.log(error);
      }
   }

   

   const loginFacebook = async (e) => {
      e.preventDefault();
      try {
        const res = await loginWidthFacebook();
        console.log(res);
      } catch (error) {
        console.log(error.message);
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

                        <h2 className="mb-2 text-center">Sign In</h2>
                        <p className="text-center">Login to stay connected.</p>
                        <Form onSubmit={handleSubmit}>
                           <Row>
                              <Col lg="12">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="username" className="">Email</Form.Label>
                                    <Form.Control type="text" className="" id="email" aria-describedby="username" placeholder="Email" name='username' onChange={datosForm} />
                                 </Form.Group >
                              </Col>
                              <Col lg="12" className="">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="password" className="">Password</Form.Label>
                                    <Form.Control type="password" className="" id="password" aria-describedby="password" placeholder="Password" name='password' onChange={datosForm} />
                                 </Form.Group>
                              </Col>
                              <Col lg="12" className="d-flex justify-content-between">
                                 <Form.Check className="form-check mb-3">
                                    <Form.Check.Input type="checkbox" id="customCheck1" />
                                    <Form.Check.Label htmlFor="customCheck1">Remember Me</Form.Check.Label>
                                 </Form.Check>
                                 <Link to="/forget">Forgot Password?</Link>
                              </Col>
                           </Row>
                           <div className="d-flex justify-content-center">
                              <Button type="submit" variant="btn btn-primary">Sign In</Button>
                           </div>
                           <p className="text-center my-3">or sign in with other accounts?</p>
                           <div className="d-flex justify-content-center">
                              <ListGroup as="ul" className="list-group-horizontal list-group-flush">
                                 <ListGroup.Item onClick={loginGoogle} as="li" className="border-0 pb-0">
                                    <a href="#"><Image src={google} alt="gm" /></a>
                                 </ListGroup.Item>
                                 <ListGroup.Item onClick={loginFacebook} as="li" className="border-0 pb-0">
                                    <a href="#"><Image src={facebook} alt="fb" /></a>
                                 </ListGroup.Item>
                                 <ListGroup.Item as="li" className="border-0 pb-0">
                                    <a href="#"><Image src={instagram} alt="im" /></a>
                                 </ListGroup.Item>
                                 <ListGroup.Item as="li" className="border-0 pb-0">
                                    <a href="#"><Image src={linkedin} alt="li" /></a>
                                 </ListGroup.Item>
                              </ListGroup>
                           </div>
                           <p className="mt-3 text-center">
                              Don’t have an account? <Link to='/register' className="text-underline">Click here to sign up.</Link>
                           </p>
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

export default Login
