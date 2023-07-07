import { memo, Fragment, useState } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Button, ListGroup } from 'react-bootstrap'

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//router
import { Link, useNavigate } from 'react-router-dom'

//components
import Card from './bootstrap/card'

import facebook from "../assets/images/brands/fb.svg";
import google from '../assets/images/brands/gm.svg'
import instagram from '../assets/images/brands/im.svg'
import linkedin from '../assets/images/brands/li.svg'
import auth1 from '../assets/images/auth/01.png'

// logo
import Logo from "../assets/iHellow-Logo.webp";

// redux toolkin
import { useRegisterMutation, useRegister_googleMutation,useListCountryQuery } from "../api/apiSplice";

// firebase
import { signup, loginWithGoogle } from "./contentFirebase/AuthFirebase";

// hook localstorange
import { useSendLocalStorange } from "./hooks/sendLocalstorange";
import Loader from './loading/Loader';

import Select from "react-select";

const Register = () => {

   // redux toolkit query
   const [register] = useRegisterMutation();
   const { data, isLoading, error } = useListCountryQuery();
   const [register_google] = useRegister_googleMutation();

   // navegacion
   const navigate = useNavigate();

   const [ formData, setFormData ] = useState({
      token: 'firebase',
      username: '',
      lastname: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      password: ''
  });

  //  estados de validación
  const [usernameErrorShown, setUsernameErrorShown] = useState(false);
  const [lastnameErrorShown, setLastnameErrorShown] = useState(false);
  const [phoneErrorShown, setPhoneErrorShown] = useState(false);
  const [passErrorShown, setPassErrorShown] = useState(false);

   //estados del password
   const [confirmacion, setConfirmacion] = useState('');
   const [isChecked, setIsChecked] = useState(false);
   const [estado, setEstado] = useState();

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleFormData = (event) => {
   const { name, value } = event.target;
   if (name === 'username' && !/^[a-zA-Z\s]*$/.test(value)) {
      if(!usernameErrorShown){
         toast.warning('El username solo acepta letras.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
         setUsernameErrorShown(true)
      }
      return
   }else {
    setUsernameErrorShown(false);
   }

   // lastname validacion
   if(name === 'lastname' && !/^[a-zA-Z\s]*$/.test(value)){
      if(!lastnameErrorShown){
         toast.warning('El lastname solo acepta letras.', {
            position: toast.POSITION.TOP_CENTER
         })
         setLastnameErrorShown(true);
      }
      return
   }else {
      setLastnameErrorShown(false);
   }

   // Validación para solo números en el campo de número de celular
   if (name === 'phone' && !/^[0-9]*$/.test(value)) {
      if (!phoneErrorShown) {
        toast.warning('El número de celular solo debe contener números.', {
          position: toast.POSITION.TOP_CENTER,
        });
        setPhoneErrorShown(true);
      }
      return;
    } else {
      setPhoneErrorShown(false);
   }

   // // validacion del password
   if (name === 'password' && value === '') {
      if(!passErrorShown){
         toast.warning('Debe ingresar una contraseña.', {
            position: toast.POSITION.TOP_CENTER
         })
         setPassErrorShown(true);
      }
      return
   }else {
      setPassErrorShown(false);
   }

   setFormData(datos => ({ ...datos, [name]: value }));
  }

  const validarPassword = (event) => {
   const {name, value} = event.target

   if(name === 'confirm'){
      setConfirmacion(value)
   }

  }

  const handleForm = async(e) => {
   e.preventDefault();

   if(isChecked === false){
      return toast.warning('To register you must accept the terms and conditions.', {
         position: toast.POSITION.TOP_CENTER,
         progressClassName: 'bg-primary'
      })
   }

   switch(true){
      case !formData.username:
         toast.warning('El username no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case !formData.lastname:
         toast.warning('El lastname no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case !formData.email:
         toast.warning('El email no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case !emailRegex.test(formData.email):
         toast.warning('El email no es valido', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case !formData.phone:
         toast.warning('El phone no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case !estado:
         toast.warning('El country no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case !formData.city:
         toast.warning('El city no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case !formData.password:
         toast.warning('El password no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case !confirmacion:
         toast.warning('El campo de la confirmación no puede estar vacio.', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;
      case formData.password !== confirmacion:
         toast.warning('Las contraseñas no coinsiden', {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'bg-primary'
         })
      break;

      default:
         const concatenacion = formData.username + ' ' + formData.lastname


         try {
            console.log(formData)
            const response = await signup(formData.email, formData.password);

            console.log(response);

            const res = await register({token: response.user.uid || formData.token, email: formData.email, phone: formData.phone, password: formData.password, city: formData.city, country: estado, username: concatenacion, });

            if(res.data.status == 400){
               toast.warning(res.data.mensaje, {
                  position: toast.POSITION.TOP_CENTER,
                  progressClassName: 'bg-primary'
               })
            }

            if(res.data.status == 200){
               localStorage.setItem('data', JSON.stringify(res.data.data))
               setTimeout(() => {
                  navigate('/confirm')
               }, 2000)
            }

         } catch (error) {
            console.log(error)
         }
      break;
   }

  }

  const authGoogle = async(e) => {
   e.preventDefault();

   if(isChecked === false){
      return toast.warning('To register you must accept the terms and conditions.', {
         position: toast.POSITION.TOP_CENTER,
         progressClassName: 'bg-primary'
      })
   }

      try {
         const response = await loginWithGoogle();
         console.log(response);
         const res = await register_google({email: response.user.email, token: response.user.uid, name: response.user.displayName, photo: response.user.photoURL, ismetodo: 'google'});

         const { data, error } = res

         console.log(error)
         console.log(data)

         if(res.data.status == 400){
            toast.warning(res.data.mensaje, {
               position: toast.POSITION.TOP_CENTER,
               progressClassName: 'bg-primary'
            })
         }
         if(res.data.status == 200){
            localStorage.setItem('data', JSON.stringify(res.data.data))
            setTimeout(() => {
               navigate('/confirm')
            }, 2000)
         }
      } catch (error) {
         console.log(error);
      }
  }

   // capturar country
   const handleSelect = (selectedOption) => {
      setEstado(selectedOption);
      console.log(selectedOption)
   }

   const opciones = data?.map((item) => ({
      value: item?.name.common,
      label: item.flag,
   }));

   if(error){
      return <div>{error.message}</div>
    }

   if(isLoading){
      return <Loader />
   }

   // console.log(isChecked)

  return (
    <Fragment>
         <section className="login-content overflow-hidden">
            <Row className="no-gutters align-items-center bg-white">
               <Col md="12" lg="6" className='align-self-center'>
                  <Link to="/signup" className="navbar-brand d-flex align-items-center justify-content-center text-primary">
                        <img className="text-primary w-50" src={Logo} alt="Logo" />
                  </Link>
                  <Row className="justify-content-center pt-5">
                     <Col md="9">
                        <Card className="card  d-flex justify-content-center mb-0 auth-card iq-auth-form">
                           <Card.Body>

                              <h2 className="mb-2 text-center">Sign Up</h2>
                              <p className="text-center">Create your Qompac UI account.</p>
                              <Form onSubmit={handleForm}>
                                 <Row>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="full-name" className="">Full Name</Form.Label>
                                          <Form.Control type="text" className="" id="full-name" placeholder="Jhon" name='username' onChange={handleFormData} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="last-name" className="">Last Name</Form.Label>
                                          <Form.Control type="text" className="" id="last-name" placeholder="Doe" name='lastname' onChange={handleFormData} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Email</Form.Label>
                                          <Form.Control type="email" className="" id="email" placeholder="xyz@example.com" name='email' onChange={handleFormData} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="phone" className="">Phone No.</Form.Label>
                                          <Form.Control type="text" className="" name='phone' id="phone" placeholder="1234567890" onChange={handleFormData} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="country" className="">Country</Form.Label>
                                          {/* <Form.Control type="text" className="" name='country' id="country" placeholder="+57" onChange={handleFormData} /> */}
                                          <Select 
                                             options={opciones}
                                             onChange={handleSelect}
                                             formatOptionLabel={({ label, value }) => (
                                             <div className="d-flex align-items-center gap-3 px-4">
                                                <p className="ml-2 mb-0">{label}</p>
                                                <p className="ml-2 mb-0">{value}</p>
                                             </div>
                                             )}
                                          />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="city" className="">City</Form.Label>
                                          <Form.Control type="text" className="" name='city' id="city" placeholder="76001" onChange={handleFormData} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Password</Form.Label>
                                          <Form.Control type="password" className="" name='password' id="password" placeholder=" " onChange={handleFormData} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="confirm-password" className="">Confirm Password</Form.Label>
                                          <Form.Control type="text" className="" name='confirm' id="confirm-password" placeholder=" " onChange={validarPassword} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-center">
                                       <Form.Check className="mb-3 form-check">
                                          <Form.Check.Input onChange={() => setIsChecked(true)} type="checkbox" id="customCheck1" />
                                          <Form.Check.Label htmlFor="customCheck1">I agree with the terms of use</Form.Check.Label>
                                       </Form.Check>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button type="submit" variant="primary">Sign Up</Button>
                                 </div>
                                 <p className="text-center my-3">or sign in with other accounts?</p>
                                 <div className="d-flex justify-content-center">
                                    <ListGroup as="ul" className="list-group-horizontal list-group-flush">
                                       <ListGroup.Item onClick={authGoogle} as="li" className="list-group-item border-0 pb-0">
                                          <Link to="#"><Image src={google} alt="gm" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="list-group-item border-0 pb-0">
                                          <Link to="#"><Image src={facebook} alt="fb" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="list-group-item border-0 pb-0">
                                          <Link to="#"><Image src={instagram} alt="im" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="list-group-item border-0 pb-0">
                                          <Link to="#"><Image src={linkedin} alt="li" /></Link>
                                       </ListGroup.Item>
                                    </ListGroup>
                                 </div>
                                 <p className="mt-3 text-center">
                                    Already have an Account <Link to="/" className="text-underline">Sign In</Link>
                                 </p>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               </Col>
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1  overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main " alt="images" />
               </Col>
            </Row>
         </section>
         <ToastContainer />
    </Fragment>
  )
}

export default Register
