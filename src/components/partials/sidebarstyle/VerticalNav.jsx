import { useState, memo, Fragment, useEffect } from "react";

//Router
import { Link, useLocation } from "react-router-dom";

//React-bootstrap
import {
  Accordion,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

// icono
import { GiCardPick } from "react-icons/gi";
import { MdOutlineWebAsset } from "react-icons/md";
import { BsPersonBoundingBox } from "react-icons/bs";
import CompanyIcon from "../../../assets/company.png";
import { AiFillEdit } from "react-icons/ai";

import React from 'react'

const VerticalNav = () => {

    const [active, setActive] = useState("");
    const [datos, setDatos] = useState();

    //location
    let location = useLocation();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('data'));
      if(user){
        setDatos(user);
      }
  
    }, []);

  return (
    <Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
        <li className="nav-item static-item">
          <Link
            className="nav-link static-item disabled text-start"
            to="#"
            tabIndex="-1"
          >
            <span className="default-icon">Home</span>
            <span
              className="mini-icon"
              data-bs-toggle="tooltip"
              title="Home"
              data-bs-placement="right"
            >
              -
            </span>
          </Link>
        </li>
        <li
          className={`${location.pathname === "/home" ? "active" : ""} nav-item `}
        >
          <Link
            className={`${location.pathname === "/home" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/home"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Dashboard</Tooltip>}
            >
              <i className="icon">
                <svg
                  className="icon-20"
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </OverlayTrigger>
            <span className="item-name">Dashboard</span>
          </Link>
        </li>
        <Accordion.Item
          as="li"
          bsPrefix={`nav-item ${
            active === "home/data" ? "active nav-link" : ""
          } `}
        >
          <Link
            className={`${
              location.pathname === "/home/data" ? "active" : location.pathname === "/home/dataEmpresario" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to={datos?.role ? "/home/dataEmpresario" : "/home/data"}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Data</Tooltip>}
            >
              <i className="icon">
                <svg
                  className="icon-20"
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M10.0833 15.958H3.50777C2.67555 15.958 2 16.6217 2 17.4393C2 18.2559 2.67555 18.9207 3.50777 18.9207H10.0833C10.9155 18.9207 11.5911 18.2559 11.5911 17.4393C11.5911 16.6217 10.9155 15.958 10.0833 15.958Z"
                    fill="currentColor"
                  ></path>
                  <path
                    opacity="0.4"
                    d="M22.0001 6.37867C22.0001 5.56214 21.3246 4.89844 20.4934 4.89844H13.9179C13.0857 4.89844 12.4102 5.56214 12.4102 6.37867C12.4102 7.1963 13.0857 7.86 13.9179 7.86H20.4934C21.3246 7.86 22.0001 7.1963 22.0001 6.37867Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M21.9998 17.3992C21.9998 19.2648 20.4609 20.7777 18.5609 20.7777C16.6621 20.7777 15.1221 19.2648 15.1221 17.3992C15.1221 15.5325 16.6621 14.0195 18.5609 14.0195C20.4609 14.0195 21.9998 15.5325 21.9998 17.3992Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </OverlayTrigger>
            <span className="item-name">Data</span>
          </Link>
          <hr className="hr-horizontal" />
          <Link
            className={`${
              location.pathname === "/home/tarjeta" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to={"/home/tarjeta"}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Cards</Tooltip>}
            >
              <i className="icon">
                <GiCardPick className="icon-20" />
              </i>
            </OverlayTrigger>
            <span className="item-name">Cards</span>
          </Link>
          <Link
            className={`${
              location.pathname === "/home/landing" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to={"/home/landing"}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Landing</Tooltip>}
            >
              <i className="icon">
                <MdOutlineWebAsset className="icon-20" />
              </i>
            </OverlayTrigger>
            <span className="item-name">Landing</span>
          </Link>
          {
            datos?.role == true ?
            <Link
              className={`${
                location.pathname === "/home/company" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to={"/home/company"}
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Company</Tooltip>}
              >
                <i className="icon">
                  <img src={CompanyIcon} className="icon-20" />
                </i>
              </OverlayTrigger>
              <span className="item-name">Company</span>
            </Link>: ''
          }
          <hr className="hr-horizontal" />
          {
            datos?.role == true ?
            <Link
              className={`${
                location.pathname === "/home/editcard" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to={"/home/editcard"}
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Edit user</Tooltip>}
              >
                <i className="icon">
                  <AiFillEdit className="icon-20" />
                </i>
              </OverlayTrigger>
              <span className="item-name">Edit user</span>
            </Link>: ''
          }
          {' '}
          <Link
            className={`${
              location.pathname === "/home/perfil" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to={"/home/perfil"}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Profile</Tooltip>}
            >
              <i className="icon">
                <BsPersonBoundingBox className="icon-20" />
              </i>
            </OverlayTrigger>
            <span className="item-name">Profile</span>
          </Link>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  )
}

export default VerticalNav
