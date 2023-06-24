import React from 'react'

import { memo, Fragment } from "react";

// React-bootstrap
import { Row, Col } from "react-bootstrap";

// Components
import Card from "../bootstrap/card";

const Loader = () => {
  return (
    <Fragment>
        <Row>
            <div className='d-flex justify-content-center'>
                <div className="iq-loader-box">
                    <div className="iq-loader-8"></div>
                </div>
            </div>
        </Row>
    </Fragment>
  )
}

export default Loader
