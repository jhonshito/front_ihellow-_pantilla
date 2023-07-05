import { memo, Fragment, useState, useEffect } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Button } from 'react-bootstrap'

//components
import Card from '../../components/bootstrap/card'

// react-toastify para los mensajes de validación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// querys
import { useFind_userQuery, useUpdate_profileMutation, useListCountryQuery } from "../../api/apiSplice";
import Loader from '../loading/Loader';

import { useGetLocalStorange, useSendLocalStorange } from "../hooks/sendLocalstorange";

import Select from "react-select";

const EditCard = ({role, idUser}) => {

    const id = role?.role ? useGetLocalStorange('dataUserSelect')?.id_user || idUser: '';

    const [update_profile] = useUpdate_profileMutation();
    const { data, isLoading, error } = useFind_userQuery({id});
    // useSendLocalStorange('pais', data?.data?.country)
    const { data: dataCount, isLoading: isload, error: isError } = useListCountryQuery();

    const [profile, setProfile] = useState({
        names: data?.data?.names || '',
        phone: data?.data?.phone || '',
        country: data?.data?.country || '',
        city: data?.data?.city || ''
    });

    const [estado, setEstado] = useState();
    const [selectedOption, setSelectedOption] = useState();

    const handleOnChange = (event) => {
        const newValue = event.target.value;
        const inputName = event.target.name;
        setProfile((prevDatos) => ({
          ...prevDatos,
          [inputName]: newValue,
        }));
    }

    // capturar country
    const handleSelect = (selectedOption) => {
        setEstado(selectedOption?.value);
        console.log(selectedOption)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // traer el id del usuario del localstorange
        const id = useGetLocalStorange('dataUserSelect')?.id_user || idUser;
        const { names, country, phone, city } = profile;
    
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
        setProfile((prevDatos) => ({
            ...prevDatos,
            names: data?.data?.names || '',
            phone: data?.data?.phone || '',
            country: data?.data?.country || '',
            city: data?.data?.city || ''
        }));
        setEstado(data?.data?.country)
    }, [data, id])


    const opciones = dataCount?.map((item, index) => ({
        value: item?.name.common,
        value2: index,
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

  return (
    <Card>
        <Card.Header className="d-flex justify-content-between">
           <div className="header-title">
              <h4 className="card-title">User Information</h4>
           </div>
        </Card.Header>
        <Card.Body>
        <div className="new-user-info">
            <Form onSubmit={handleSubmit}>
                <div className="row">
                    <Form.Group className="col-md-12 form-group">
                       <Form.Label htmlFor="fname">Your Name:</Form.Label>
                       <Form.Control type="text" name='names' onChange={handleOnChange} value={profile?.names} id="fname" placeholder="Your  Name" />
                    </Form.Group>
                    <Form.Group className="col-sm-12 form-group">
                     <Form.Label>Your Country: {selectedOption?.label}  {selectedOption?.label2} </Form.Label>
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
                    <Form.Group className="col-md-12 form-group">
                       <Form.Label htmlFor="city">Town/City:</Form.Label>
                       <Form.Control type="text" onChange={handleOnChange} name='city' value={profile?.city} id="city" placeholder="Town/City" />
                    </Form.Group>
                    <Form.Group className="col-md-12  form-group">
                       <Form.Label htmlFor="mobno">Your phone number:</Form.Label>
                       <Form.Control type="text" onChange={handleOnChange} id="mobno" name='phone' value={profile?.phone} placeholder="phone  Number" />
                    </Form.Group>
                </div>
                <Button type="submit" variant="btn btn-primary">Update</Button>
            </Form>
        </div>
        </Card.Body>
        <ToastContainer />
    </Card>
  )
}

export default EditCard
