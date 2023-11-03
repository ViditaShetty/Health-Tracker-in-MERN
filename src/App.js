
import { useState, useEffect, useMemo } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Vision UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Vision UI Dashboard React routes
import routes from "routes";

// Vision UI Dashboard React contexts
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";

/////**************ADDED THIS***********/
import {React} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from "gapi-script";
import logoo from './logoo.png';
import {Row,Col} from 'react-bootstrap'
import LogoutIcon from '@mui/icons-material/Logout';
import { ContentCutOutlined } from "@mui/icons-material";
import Dashboard from "layouts/dashboard";
import Tables from 'layouts/tables';
import Tables2 from 'layouts/tables2';
import Billing from "layouts/billing";
//CLEAR SETTINGS->ADVANCED->CACHED IMAGS IF NOT WORKING
//OR LOGIN-LOGOUT AGAIN
//AccessToken NOT Access_token
//GO TO GOOOGLE CONSOLE=>MAKE NEW PROJECT
//=>GET CREDENTIALS=> ENABLE FIT API=> MAKE OAUTH CONSOLE SCREEN
//=>ADD TEST USERS****=>ADD SCOPES=>GET CLIENT ID
//LOAD GAPI SCRIPTS*****
//ERROR 401=ACCESS TOKEN /AUTHORIZATION ERROR
//COOKIES=STORING LOGIN INO SINCE AFTER LOGIN = STATE CHANGE= THUS RE-RENDER/RELOAD OF PAGE LOSES INFO
//ERROR 403=ADD  scope={'https://www.googleapis.com/auth/fitness.activity.read'}  TO GAPI.INIT AND GOOGLE LOGIN

import "react-datepicker/dist/react-datepicker.css"
export default function App() {

//////*********ADDED ********/
  const { SetCookie, DeleteCookie, hasCookie } = require('./Utility/CookieManager');
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  var UserName = process.env.REACT_APP_USER_NAME;
  console.log("NAME+",UserName);
  /////ENDED**************///
  const [user, setUser] = useState({ haslogin: false, accessToken: '' });
  const [userResponse, setUserResponse] = useState({ accessToken: '',name:'' });


  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:"961301757571-dfvqu22rmor1s6o58nn250lg0ru6fgrc.apps.googleusercontent.com",
      plugin_name: "chat",
      scope: "email",
      scope:"https://www.googleapis.com/auth/fitness.activity.read"
    });
  });
  
  
  
  function login(response) {
    console.log("LOGIN SUCCESSFUL==");
    console.log(response);
    console.log(response.accessToken);
    /////adding this********to set global env username after login
    UserName=response.profileObj.name;
    console.log(":::=",UserName);
    if (response.accessToken) {
      setUserResponse({
        accessToken: response.accessToken,
        name:response.profileObj.name
       }) //////77
       console.log("User=",userResponse.accessToken);////////777  
       console.log("UserName=",userResponse.name);////////777  
       setUser({
        ...response.profileObj,
        haslogin: true,
        accessToken: response.accessToken
      })
    }
    SetCookie({
      ...response.profileObj,
      accessToken: response.accessToken
    });
    
  }
  
  function logout(response) {
    setUser({ haslogin: false, accessToken: '' });
    DeleteCookie(['accessToken', 'email', 'givenName', 'familyName', 'imageUrl', 'name', 'googleId']);
  }
  
  function handleLoginFailure(response) {
    console.log("Failed to login. Please allow 3rd party cookies 👁️‍🗨️ ",{response});
    alert('Failed to log in.. Please allow 3rd party cookie👁️‍🗨️.');
  }
  function handleLogoutFailure(response) {
    alert('Failed to log out');
  }
  ///////***************ADDED END */
  
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  ///////////ADDED THIS*********************
  useEffect(() => {
    const cookieObject = hasCookie();
    if (cookieObject.haslogin) { 
      setUser({
        ...cookieObject
      });
    }
  }, []);

  /////ENDED**************///

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
////MAKE A STATE TO PASS DATA(CALORIES) BETWEEN SIBLINGS DASHBOARD 
///AND TABLES 
const[cal,setCal]=useState('2500');
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
////////////////****ADDED USER TO PASS PROPS TO DASHBOARD*/
      if (route.route == '/dashboard') { 
        return <Route  exact path="/dashboard"  render={(props) => <Dashboard {...props} user={userResponse} setCal={setCal}/>} key={route.key}/>;
      }
      else if (route.route == '/tables') { 
        return <Route  exact path="/tables"  render={(props) => <Tables {...props} cal={cal}/>} key={route.key}/>;
      }
      else if (route.route == '/tables2') { 
        return <Route  exact path="/tables2"  render={(props) => <Tables2 {...props}  />} key={route.key}/>;
      }
      else if (route.route == '/billing') { 
        return <Route  exact path="/billing"  render={(props) => <Billing {...props}  />} key={route.key}/>;
      }
      else if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      } 

      return null;
    });

  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="info"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </VuiBox>
  );

  return (
    <div>
  { user.haslogin ?
    <>
      <ThemeProvider theme={theme}>
      <Navbar style={{marginLeft:"91%"}}>
        <GoogleLogout
                clientId={CLIENT_ID}
                buttonText='Logout'
                onLogoutSuccess={logout}
                onFailure={handleLogoutFailure}>
              {console.log("User=",process.env.USER_NAME)}
        </GoogleLogout></Navbar>
        <CssBaseline />
        {layout === "dashboard" && (<>
            <Sidenav
              color={sidenavColor}
              brand=""
              brandName="HEALTH TRACKER"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}</>
        )}
        {layout === "vr" && <Configurator />}
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard"/>
        </Switch>
      </ThemeProvider>
    </>
    :
    <div style={{backgroundColor:"black",width:"100vw",height:"100vh",margin:"-10px"}}>
      <img src={logoo} style={{width:"170px",marginTop:"100px",marginLeft:"650px"}}></img>
      <div style={{color:"white",marginTop:"10px",marginLeft:"500px",fontWeight:"700",fontSize:"60px"}}>HEALTH TRACKER </div>
      <div style={{color:"white",marginTop:"10px",marginLeft:"650px",fontWeight:"700",fontSize:"60px"}}>
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText='Sign In WIth Google'
      onSuccess={login}
      onFailure={handleLoginFailure}
      cookiePolicy={'single_host_origin'}
      responseType='code,token'
      scope={'https://www.googleapis.com/auth/fitness.activity.read'}
      />
      </div>
      </div>
          }
    </div>
  );
}

