
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import {IoWalkSharp} from "react-icons/io5";
import {IoTimeSharp} from "react-icons/io5";
import {IoHeartSharp} from "react-icons/io5";
import {IoFootsteps} from "react-icons/io5";
// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import {useState,useEffect} from 'react';

  function Dashboard(props) {
  console.log("PROPS DASHBOARD=",props);
  const { gradients } = colors;
  const { cardContent } = gradients;
  ///////////////ADDED THIS
  const { getRequestHeaders, getWeeklyData } = require('../../Utility/DataRequestManager.js');
  const [weekData, setWeekData] = useState([]);
  const accessToken = props.user.accessToken;
  console.log("ACCESS TOKEN=",accessToken);
  let selected = [0,1,2,3,4,5,6];
  const callBack = (state) => {
    setWeekData(state);
  }
  console.log(accessToken);
  const requestHeaders = getRequestHeaders(accessToken);
  console.log("REQUEST HEADER+ACCESS TOKEN=",requestHeaders);
  const timeRightNow = new Date().getTime();
  console.log(timeRightNow);
  getWeeklyData(timeRightNow, requestHeaders, callBack, weekData);
  console.log("WEEK DATA=",weekData);;
  if (selected.length === 0) {
    selected = [0,1,2,3,4,5,6];
  }
  const aggData = {
    Calories:0,
    Heart:0,
    Move:0,
    Steps:0
  }; 
  const lineWeekData = {
    Move:[100,200],
    Steps:[100,300],
    Calories:[300,400],
  };
  var i=0;
  if (weekData.length > 0) {
    selected.forEach((idx) => {
      aggData.Calories +=weekData[idx].Calories;
      aggData.Heart += weekData[idx].Heart;
      aggData.Move += weekData[idx].Move;
      aggData.Steps += weekData[idx].Steps;
      lineWeekData.Move[i]=weekData[idx].Move;
      lineWeekData.Steps[i]=weekData[idx].Steps;
      lineWeekData.Calories[i]=weekData[idx].Calories;
      i+=1;
      console.log("week i=",i);
    })
  }
  console.log(lineWeekData);
////added this for passing meal data
  var datee=new Date().getDay();console.log("date=",datee);
      props.setCal(lineWeekData.Calories[datee-1]);//ADDED THIS TO MEAL PLANNNER*******
      console.log("EXTRACTED+",lineWeekData.Calories[datee-1]);               //RETURNS AN ARRAY FROM 0-6******
      
////////////////ENDS HERE

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Calories  Burnt", fontWeight: "regular" }}
                count={aggData.Calories}
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoWalkSharp size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Move  Minutes" }}
                count={aggData.Move}
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoTimeSharp size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Heart  Points" }}
                count={aggData.Heart}
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <IoHeartSharp size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Weekly Step Count" }}
                count={aggData.Steps}
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <IoFootsteps size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={7}>
              <WelcomeMark name={props.user.name}/></Grid>
            <Grid item xs={12} lg={6} xl={5}>
               <ReferralTracking/></Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Weekly Progress Overview<br></br>
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <span style={{marginLeft:"70%",fontSize:"17px"}}>
                    1 minute/Move units<br></br>100steps/Step unit
                    </span>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    {/*************CHART LOADED WITH ONLY INTITIAL 2 VALUES AND DID NOT UPDATE AFTER UPDATING LINEWEEKDATA ARRAY */}
                    {//lineWeekData.Move[2]?  ///*************IF THE WEEKLY DATA HAS BEEN LOADED AFTER THE 2 DEFAULT ELEMENTS ONLY THEN RENDER CHART SINCE IT RENDERS ONLY ONCE */
                    <LineChart
                      lineChartData={ [
                        {
                          name: "Move Minutes",
                          data: [lineWeekData.Move[0],lineWeekData.Move[1],lineWeekData.Move[2],
                                lineWeekData.Move[3],lineWeekData.Move[4],lineWeekData.Move[5],lineWeekData.Move[6],],
                        },
                        {
                          name: "Steps",
                          data: [(parseInt(`${lineWeekData.Steps[0]}`)/100),parseInt(`${lineWeekData.Steps[1]}`)/100 ,parseInt(`${lineWeekData.Steps[2]}`)/100 ,
                          parseInt(`${lineWeekData.Steps[3]}`)/100 ,parseInt(`${lineWeekData.Steps[4]}`)/100 ,parseInt(`${lineWeekData.Steps[5]}`)/100 ,
                          parseInt(`${lineWeekData.Steps[6]}`)/100 ,],
                        },
                      ]}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                   // :
                   // null
                   }
                  </VuiBox>
                </VuiBox> 
                     {console.log("WEEK DATE MOVE=",lineWeekData.Move)}
                     {console.log("WEEK DATE STEPS=",lineWeekData.Steps)}
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    {lineWeekData.Move[3]? 
                    <BarChart
                      barChartData={ [
                        {
                          name: "Calories Burnt",
                          data: [lineWeekData.Calories[0],lineWeekData.Calories[1],lineWeekData.Calories[2],
                          lineWeekData.Calories[3],lineWeekData.Calories[4],lineWeekData.Calories[5],lineWeekData.Calories[6],],
                        }]}
                      barChartOptions={barChartOptionsDashboard}
                    />
                    :
                    null}
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Workout Count , Calorie Count
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Workouts
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Calories
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,420
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Reps
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        240
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Laps
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
