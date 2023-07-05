import { useState, memo, Fragment, useEffect, useRef } from "react";

//react-bootstrap
import { Row, Col, Image, Form, Nav, Dropdown, Tab, Button } from "react-bootstrap";

//components
import Card from "../../components/bootstrap/card";

// icons
import { MdOutlineAddAPhoto } from "react-icons/md";

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import avatar1 from "../../assets/images/avatars/01.png";
import { useAdd_photoMutation, useFind_userQuery, useUpdate_profileMutation, useListCountryQuery } from "../../api/apiSplice";
import { useGetLocalStorange } from "../hooks/sendLocalstorange";
import Loader from "../loading/Loader";

import Select from "react-select";

const Perfil = () => {

  const [datos, setDatos] = useState();
  const [add_photo] = useAdd_photoMutation();
  const [update_profile] = useUpdate_profileMutation();
  const id = useGetLocalStorange('data')?.id
  const { data, isLoading, error } = useFind_userQuery({id});
  const { data: dataCount, isLoading: isload, error: isError } = useListCountryQuery();

  const [profile, setProfile] = useState({
    names: data?.data?.names || '',
    phone: data?.data?.phone || '',
    country: data?.data?.country || '',
    city: data?.data?.city || ''
  });

  const [estado, setEstado] = useState();
  const [selectedOption, setSelectedOption] = useState();

  // capturar country
  const handleSelect = (selectedOption) => {
    setEstado(selectedOption?.value);
    console.log(selectedOption)
  }

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

  const handleOnChange = (event) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setProfile((prevDatos) => ({
      ...prevDatos,
      [inputName]: newValue,
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // traer el id del usuario del localstorange
    const id = useGetLocalStorange('data')?.id;
    const { names, phone, city } = profile;

    try {
      const res = await update_profile({id, name: names, country: estado, phone, city});
      console.log(res)
      const {data, error} = res;
      if(data.status == 200 && data.update == true){
        toast.success('!EXIT¡', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      }

      if(error){
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    const user = useGetLocalStorange('data');
    if(user){
      setDatos(user);
    }
  
  }, []);

  useEffect(() => {
    setProfile((prevDatos) => ({
      ...prevDatos,
      names: data?.data?.names || '',
      phone: data?.data?.phone || '',
      country: data?.data?.country || '',
      city: data?.data?.city || ''
    }));
  }, [data])

  const opciones = dataCount?.map((item) => ({
    value: item?.name.common,
    label: item.flag,
    label2: item.name.common
    // label2:
  }));

  useEffect(() => {
    // const pais = useGetLocalStorange('pais')
    const initialCountry = profile?.country;
    const selected = opciones?.find(option => option?.label2==initialCountry);

    // console.log(pais)
    if (selected) {
        setSelectedOption(selected);
    }else {
        setSelectedOption(null);
    }
  }, [profile?.country, id, opciones?.value]);

    if(error){
      return <div>{error.message}</div>
    }

    if(isLoading){
      return <Loader />
    }

    // console.log(data)

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
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
               <h4 className="card-title"> {data?.data?.role ? 'User company Information': 'User Information'}</h4>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="new-user-info">
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <Form.Group className="col-md-12 form-group">
                     <Form.Label htmlFor="fname">Name</Form.Label>
                     <Form.Control type="text" onChange={handleOnChange} value={profile?.names} id="fname" name="names" placeholder="Your Name" />
                  </Form.Group>
                  <Form.Group className="col-sm-12 form-group">
                     <Form.Label>Your Country: {selectedOption?.label}  {selectedOption?.label2}</Form.Label>
                     <Select 
                        options={opciones}
                        onChange={handleSelect}
                        defaultValue={selectedOption ? selectedOption: selectedOption}
                        formatOptionLabel={({ label, label2 }) => (
                            <div className="d-flex align-items-center gap-3 px-4">
                              <p className="ml-2 mb-0">{label}</p>
                              <p className="ml-2 mb-0">{label2}</p>
                            </div>
                        )}
                     />
                  </Form.Group>
                  <Form.Group className="col-md-12  form-group">
                     <Form.Label htmlFor="mobno">Phone Number:</Form.Label>
                     <Form.Control type="text" onChange={handleOnChange} id="mobno" name="phone" value={profile?.phone} placeholder="Your phone number" />
                  </Form.Group>
                  <Form.Group className="col-md-12 form-group">
                     <Form.Label htmlFor="city">Town/City:</Form.Label>
                     <Form.Control type="text" onChange={handleOnChange} name="city" value={profile?.city} id="city" placeholder="Town/City" />
                  </Form.Group>
                </div>
                <Button type="submit" variant="btn btn-primary">Update</Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Tab.Container>
      <ToastContainer />
    </Fragment>
  )
}

export default Perfil
