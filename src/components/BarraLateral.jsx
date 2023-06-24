import { useEffect, memo, Fragment, useContext, Suspense, Component } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

//react-shepherd
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd'
// header
import Header from "./partials/headerstyle/Header";

//sidebar
import Sidebar from './partials/sidebarstyle/Siderbar'

//footer
import Footer from './partials/footerstyle/Footer'

//seetingoffCanvas
import SettingOffCanvas from '../components/setting/SettingOffCanvas'

// Import selectors & action from setting store
import * as SettingSelector from '../store/setting/selectors'

// Redux Selector / Action
import { useSelector } from 'react-redux';

const Tour = () => {
    const tour = useContext(ShepherdTourContext);
    const { pathname } = useLocation()
    useEffect(() => {
      if (pathname === '/' && sessionStorage.getItem('tour') !== 'true') {
        tour?.start();
      }
    });
    return (
      <Fragment>
      </Fragment>
    );
};

const BarraLateral = () => {

    const pageLayout = useSelector(SettingSelector.page_layout)
    const appName = useSelector(SettingSelector.app_name)
    useEffect(() => {
    })

    const closeTour = () => {
        sessionStorage.setItem('tour', 'true')
    }

    // shepherd
    const newSteps = [
    {
      title: "<h4>Menu</h4>",
      text: '<p className="mb-0">Check the content under Menu Style. Click to view all oavailable Menu Style options for you.</p>',
      attachTo: { element: ".sidebar ", on: "right" },
      buttons: [
        {
          type: "next",
          text: "Next"
        }
      ],
      when: {
        show: () => {
          document.querySelector('.shepherd-modal-overlay-container').classList.add('shepherd-modal-is-visible')
        },
        cancel: () => closeTour()
      }
    },
    {
      title: "<h4>Profile Setting</h4>",
      text: '<p className="mb-0">Configure your Profile using Profile Settings. Edit, save and update your profile from here.</p>',
      attachTo: { element: ".iq-tour ", on: "bottom" },
      buttons: [
        {
          type: "back",
          classes: "shepherd-button-secondary",
          text: "Back"
        },
        {
          type: "next",
          text: "Next"
        }
      ],
      when: {
        cancel: () => closeTour()
      }
    },
    {
      title: "<h4>Live Customizer</h4>",
      text: '<p className="mb-0">Transform the entire look, color, style and appearance of using Live Customizer settings. Change and copy the settings from here.</p>',
      attachTo: { element: ".btn-setting", on: "left" },
      buttons: [
        {
          type: "back",
          classes: "shepherd-button-secondary",
          text: "Back"
        },
        {
          action() {
            sessionStorage.setItem('tour', 'true')
            return this.next();
          },
          text: "Done"
        }
      ],
      when: {
        cancel: () => closeTour()
      }
    },
    ];

    const tourOptions = {
        defaultStepOptions: {
          cancelIcon: {
            enabled: true
          }
        },
        when: {
          cancel: function () {
          }
        }
    };

    var subHeader = '';
    var commanclass = '';

  return (
    <Fragment>
      <ShepherdTour steps={newSteps} tourOptions={tourOptions}>
        {/* <Loader /> */}
        <Sidebar app_name={appName} />
        <Tour />
        <main className="main-content">
          <div className={`${commanclass} position-relative `}>
            <Header />
            {subHeader}
          </div>
          <div className={` ${pageLayout} content-inner pb-0`}>
            <Suspense fallback="loading">
              <Outlet></Outlet>
            </Suspense>
          </div>
          <Footer />
        </main>
      </ShepherdTour>
    </Fragment>
  )
}

export default BarraLateral
