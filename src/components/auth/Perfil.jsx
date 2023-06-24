import { useState, memo, Fragment, useEffect, useRef } from "react";

//react-bootstrap
import { Row, Col, Image, Form, Nav, Dropdown, Tab } from "react-bootstrap";

//components
import Card from "../../components/bootstrap/card";

//router
import { Link } from "react-router-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";


import avatar1 from "../../assets/images/avatars/01.png";
import { useAdd_photoMutation } from "../../api/apiSplice";

const Perfil = () => {

  const [datos, setDatos] = useState();
  const [add_photo] = useAdd_photoMutation()

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    const datos = JSON.parse(localStorage.getItem('data'))

    try {
      const res = await add_photo({id: datos.id, formData});
      console.log(res)
    } catch (error) {
      console.log(error)
    }

  };

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('data'));
      if(user){
        setDatos(user);
      }
    
    }, []);
  return (
    <Fragment>
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col lg="12" className="mt-5">
            <Card>
              <Card.Body>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-wrap align-items-center">
                    <div className="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                      <Image
                        className="theme-color-default-img  img-fluid rounded-pill avatar-100"
                        src={datos?.img || avatar1}
                        alt="profile-pic"
                      />
                    </div>
                    <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                      <h4 className="me-2 h4 text-capitalize">{datos?.names}</h4>
                      <span> - {datos?.role ? datos?.name_company: 'Marketing'} {datos?.role ? 'Company': 'Client'}</span>
                    </div>
                  </div>
                  <div>
                    <MdOutlineAddAPhoto className="icon-35 cursor-pointer" onClick={handleIconClick} style={{ cursor: 'pointer' }} />
                    <input
                      type="file"
                      name="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  )
}

export default Perfil
