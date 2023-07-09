/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components

// Vision UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import Router from "./compo/router";


import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthProvider, useAuth} from "./compo/contexts/auth/AuthContext";
import { WorkoutProvider } from "./compo/contexts/workout/WorkoutContext";
import SignInLayout from "./compo/layouts/SignInLayout";
import Dashboard from "./compo/pages/Dashboard";
import Workout from "./compo/pages/Workout";
import Profile from "./compo/pages/Profile";
import SignIn from "./compo/pages/SignIn";
import SignUp from "./compo/pages/SignUp";

function Billing() {
  return (
    
    <BrowserRouter>
      <AuthProvider>
        <WorkoutProvider>
        <DashboardLayout>
        <DashboardNavbar/>

          <Dashboard/> 
          <Workout/>

        </DashboardLayout>
        </WorkoutProvider>
       </AuthProvider> 
    </BrowserRouter>

   
  );
}

function RouteWrapper({ page: Page, layout: Layout, privateRoute, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        privateRoute && !user ? (
          <Redirect to="/sign-in" />
        ) : (
          <Layout {...props}>
             <DashboardLayout>
             <DashboardNavbar />
                <VuiBox mt={4}></VuiBox>
                <Page {...props} />
              </DashboardLayout>
          </Layout>
        )
      
      }
    />
  );
}

export default Billing;


