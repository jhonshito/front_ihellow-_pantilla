import { useEffect, memo, Fragment, useState } from 'react'

//React-bootstrap
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'

//Router
import { Link } from 'react-router-dom'

//Componets
import CustomToggle from '../../dropdowns'
import Logo from '../../../assets/iHellow-Logo.webp'

// Component
import SubNav from "./SubNav";

//Img
import flag1 from '../../../assets/images/Flag/flag001.png'
import flag2 from '../../../assets/images/Flag/flag-02.png'
import flag3 from '../../../assets/images/Flag/flag-03.png'
import flag4 from '../../../assets/images/Flag/flag-04.png'
import flag5 from '../../../assets/images/Flag/flag-05.png'
import flag6 from '../../../assets/images/Flag/flag-06.png'
import shapes1 from '../../../assets/images/shapes/01.png'
import shapes2 from '../../../assets/images/shapes/02.png'
import shapes3 from '../../../assets/images/shapes/03.png'
import shapes4 from '../../../assets/images/shapes/04.png'
import shapes5 from '../../../assets/images/shapes/05.png'
import avatars1 from '../../../assets/images/avatars/01.png'
import avatars2 from '../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../assets/images/avatars/avtar_5.png'


const Header = () => {

    useEffect(() => {
        //offcanvase code
        const result = window.matchMedia("(max-width: 1200px)");
        window.addEventListener("resize", () => {
          if (result.matches === true) {
            if (show1 === true) {
              document.documentElement.style.setProperty("overflow", "hidden");
            } else {
              document.documentElement.style.removeProperty("overflow");
            }
          } else {
            document.documentElement.style.removeProperty("overflow");
          }
        });
        if (window.innerWidth <= "1200") {
          if (show1 === true) {
            document.documentElement.style.setProperty("overflow", "hidden");
          } else {
            document.documentElement.style.removeProperty("overflow");
          }
        } else {
          document.documentElement.style.removeProperty("overflow");
        }
    });
    
    const [show1, setShow1] = useState(false);

    //collapse
    const [open, setOpen] = useState(false);

    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }


  return (
    <Navbar expand="xl" className="nav iq-navbar">
      <Container fluid className="navbar-inner">
        <div className="navbar-brand">
          <img src={Logo} className="w-25" alt="" />
        </div>
        <div
          className="sidebar-toggle"
          data-toggle="sidebar"
          data-active="true"
          onClick={minisidebar}
        >
          <i className="icon d-flex">
            <svg width="20px" viewBox="0 0 24 24" className="icon-20">
              <path
                fill="currentColor"
                d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
              />
            </svg>
          </i>
        </div>
        <div className="d-flex align-items-center justify-content-between product-offcanvas">
          <div className="breadcrumb-title border-end me-3 pe-3 d-none d-xl-block">
            <small className="mb-0 text-capitalize">
              {" "}
              {`${
                location.pathname === "/"
                  ? "home"
                  : "" || location.pathname === "/analytics"
                  ? "Analytics"
                  : ""
              }`}
            </small>
          </div>
          <div
            className={`offcanvas offcanvas-end shadow-none iq-product-menu-responsive ${
              show1 === true ? "show" : ""
            } `}
            tabIndex="-1"
            id="offcanvasBottom"
            style={{ visibility: `${show1 === true ? "visible" : "hidden"}` }}
          >
            <div className="offcanvas-body">
              <ul className="iq-nav-menu list-unstyled">
                <Nav.Item as="li" className="active">
                  <Nav.Link
                    className="nav-link menu-arrow justify-content-start active"
                    onClick={() => setOpen(!open)}
                    aria-controls="homeData"
                    aria-expanded={open}
                    role="button"
                  >
                    <svg
                      width="20"
                      className="icon-20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="nav-text ms-2">Home</span>
                  </Nav.Link>
                </Nav.Item>
              </ul>
            </div>
          </div>
        </div>
        <SubNav />
      </Container>
    </Navbar>
  )
}

export default Header
