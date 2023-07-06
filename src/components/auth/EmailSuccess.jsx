//react-bootstrap
import { Row, Col, Image } from 'react-bootstrap'

//router
import { Link, useNavigate } from 'react-router-dom'

//component
import Card from '../bootstrap/card'

// logo
import Logo from "../../assets/iHellow-Logo.webp";

//img
import mail from '../../assets/images/auth/01.png'
import { useEffect, Fragment } from 'react';

const EmailSuccess = () => {
  return (
    <Fragment>
        <section className="login-content">
        <Row className=" m-0 align-items-center bg-white vh-100">
            <Col md="12" lg="6" className='align-self-center'>

                <div className="navbar-brand d-flex align-items-center  justify-content-center text-primary">
                    <img src={Logo} className="text-primary w-50" alt="ihellow logo" />
                </div>
                <Row className="justify-content-center">
                    <Col md="12">
                    <Card className="d-flex justify-content-center mb-0 p-3">
                        <Card.Body>
                            <h2 className="mt-3 mb-4">Success !</h2>
                            <p className="cnf-mail mb-1">An email has been sent please Look in your email and click on the link included to reset your password.</p>
                            {/* <div className="d-inline-block w-100">
                                <Link to="/home" className="btn btn-primary mt-3">Back to Home</Link>
                            </div> */}
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Col>
            <Col md="6" className="d-lg-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                <Image src={mail} className="img-fluid gradient-main" alt="images" />
            </Col>
        </Row>
        </section>
    </Fragment>
  )
}

export default EmailSuccess
