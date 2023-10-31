import {React,useState,useMemo,useEffect,useCallback} from 'react';
// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import "./Meal.css"
import MealList from "./MealList"; //*********** */
import { ContentCutOutlined } from '@mui/icons-material';


import Calendarr from 'layouts/Calendarr';


const viewSettings = {
    timeline: {
        type: 'week',
        eventList: true
    }
};

const responsivePopup = {
    medium: {
        display: 'center',
        width: 400,
        fullScreen: false,
        touchUi: false,
        showOverlay: false
    }
};



/////////////////////////////////////////////////////////////////////////////////////////

function Tables(props) {   ///////////////////////////////////chacnged from {cal } to props and props.cal
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(props.cal);
    console.log("CALORIES TABLES=",props.cal);
    const extractElement = (data, element) => {
      return data.map((idx) => {
          return idx[element];
      })
    }
    
    var minCal=parseInt(props.cal)>2000?props.cal:parseInt(props.cal)+2000;
    console.log("CALORIES EATEN YESTERDAY=",props.cal);
    console.log("MIN CALORIES TO BE EATEN=",minCal);

    function getMealData() {
      var minCal=parseInt(props.cal)>2000?props.cal:parseInt(props.cal)+2000;
      console.log("CALORIES EATEN YESTERDAY=",props.cal);
      console.log("MIN CALORIES TO BE EATEN=",minCal);
      setCalories(`${minCal}`);
      fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=6108d1daaf3c4778b47d1d120303bafd&timeFrame=day&targetCalories=${props.cal}`
      )
        .then((response) => response.json())
        .then((data) => { 
          //var datee=new Date().getDay();console.log("date=",datee);
          //setCalories(extractElement(weekData, 'Calories')[datee-1]);//ADDED THIS TO MEAL PLANNNER*******
          //console.log("EXTRACTED+",extractElement(weekData, 'Calories')[datee-1]);               //RETURNS AN ARRAY FROM 0-6******
          setMealData(data);})
        .catch(() => {
          console.log("error");
        });
    }

  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  /////////////////////////////////////////////////////////////////////////////\
  const [myMeals, setMyMeals] = useState();
  const [tempMeal, setTempMeal] = useState();
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [caloriesx, setCaloriesx] = useState('');
  const [notes, setNotes] = useState('');
  const [headerText, setHeader] = useState('');
  const [type, setType] = useState(1);
  

  /////////////////////////////////////////////////////////////////////////////
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Customize your Meal 
                <section className="controls" style={{paddingLeft:20,paddingTop:-10}}>
         <VuiTypography variant="lg" color="white"> 
         Consume a minimum of {minCal} calories for energizing yourself
         </VuiTypography>               
         <br></br>
        <button onClick={getMealData} className="MealButton">Get Daily Meal Plan</button>
      </section>
      {mealData && <MealList mealData={mealData} />}
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
  {/*//////////////////////////////////////////////////////////////////////// */}
   <div style={{fontWeight:"700",color:"white",background:"rgba (0, 0, 0, 0.5)"}}>
     <Calendarr/>
  </div>
{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
    </DashboardLayout>
  );
}

export default Tables;
