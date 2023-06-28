import { useState, memo, Fragment, useEffect, useRef } from "react";

//react-bootstrap
import { Row, Col, Image, Form, Nav, Dropdown, Tab } from "react-bootstrap";

//components
import Card from "../../components/bootstrap/card";

//router
import { Link } from "react-router-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";


import avatar1 from "../../assets/images/avatars/01.png";
import { useAdd_photoMutation, useFind_userQuery } from "../../api/apiSplice";
import { useGetLocalStorange } from "../hooks/sendLocalstorange";
import Loader from "../loading/Loader";

const Perfil = () => {

  const [datos, setDatos] = useState();
  const [add_photo] = useAdd_photoMutation();
  const { data, isLoading, error } = useFind_userQuery({id: useGetLocalStorange('data')?.id});

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    const datos = useGetLocalStorange('data');

    try {
      const res = await add_photo({id: datos.id, formData});
      console.log(res)
    } catch (error) {
      console.log(error)
    }

  };

    useEffect(() => {
      // const user = JSON.parse(localStorage.getItem('data'));
      const user = useGetLocalStorange('data');
      if(user){
        setDatos(user);
      }
    
    }, []);

    if(error){
      return <div>{error.message}</div>
    }

    if(isLoading){
      return <Loader />
    }

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
                        src={data?.data?.logo == 'userdemo.png' ? avatar1 : data?.data?.logo}
                        alt="profile-pic"
                      />
                    </div>
                    <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                      <h4 className="me-2 h4 text-capitalize">{data?.data?.names}</h4>
                      <span> - {data?.data?.role ? datos?.name_company: 'Marketing'} {data?.data?.role ? 'Company': 'Client'}</span>
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
