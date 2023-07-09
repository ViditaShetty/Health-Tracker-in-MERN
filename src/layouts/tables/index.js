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
/////////////////////////////////////////////////////////////////////////////////////
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, snackbar, setOptions, Popup, Button, Input, Textarea, formatDate, getJson, SegmentedGroup, SegmentedItem } from '@mobiscroll/react';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const types = [{
    id: 1,
    name: 'Breakfast',
    color: '#e20f0f',
    kcal: '300 - 400 kcal',
    icon: '🍳'
}, {
    id: 2,
    name: 'Elevenses',
    color: '#157d13',
    kcal: '100 - 200 kcal',
    icon: '🍌'
}, {
    id: 3,
    name: 'Lunch',
    color: '#32a6de',
    kcal: '500 - 700 kcal',
    icon: '🍜'
}, {
    id: 4,
    name: 'Dinner',
    color: '#e29d1d',
    kcal: '400 - 600 kcal',
    icon: '🥙'
}, {
    id: 5,
    name: 'Snack',
    color: '#68169c',
    kcal: '100 - 200 kcal',
    icon: '🥨'
}];

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
  useEffect(() => {
      getJson('https://trial.mobiscroll.com/meal-planner/', (events) => {
          setMyMeals(events);
      }, 'jsonp');
  }, []);
  const saveEvent = useCallback(() => {
      const newEvent = {
          id: tempMeal.id,
          title: name,
          caloriesx: caloriesx,
          notes: notes,
          start: tempMeal.start,
          end: tempMeal.end,
          resource: tempMeal.resource,
      };
      if (isEdit) {
          // update the event in the list
          const index = myMeals.findIndex(x => x.id === tempMeal.id);;
          const newEventList = [...myMeals];

          newEventList.splice(index, 1, newEvent);
          setMyMeals(newEventList);
      } else {
          // add the new event to the list
          setMyMeals([...myMeals, newEvent]);
      }
      // close the popup
      setOpen(false);
  }, [isEdit, myMeals, caloriesx, notes, name, tempMeal]);
  const deleteEvent = useCallback((event) => {
      setMyMeals(myMeals.filter(item => item.id !== event.id));
      setTimeout(() => {
          snackbar({
              button: {
                  action: () => {
                      setMyMeals(prevEvents => [...prevEvents, event]);
                  },
                  text: 'Undo'
              },
              message: 'Event deleted'
          });
      });
  }, [myMeals]);
  const loadPopupForm = useCallback((event) => {
      setName(event.title);
      setCaloriesx(event.caloriesx);
      setNotes(event.notes);
  }, []);
  // handle popup form changes
  const nameChange = useCallback((ev) => {
      setName(ev.target.value);
  }, []);
  const caloriesChange = useCallback((ev) => {
      setCaloriesx(ev.target.value);
  }, []);
  const notesChange = useCallback((ev) => {
      setNotes(ev.target.checked);
  }, []);
  const onDeleteClick = useCallback(() => {
      deleteEvent(tempMeal);
      setOpen(false);
  }, [deleteEvent, tempMeal]);
  // scheduler options
  const onEventClick = useCallback((args) => {
      const event = args.event;
      setHeader('<div>New meal</div><div class="md-meal-type">' +
              formatDate('DDDD, DD MMMM YYYY', new Date(event.start)) + '</div>');
      setType(event.resource);
      setEdit(true);
      setTempMeal({ ...event });
      // fill popup form with event data
      loadPopupForm(event);
      setOpen(true);
  }, [loadPopupForm]);
  const onEventCreated = useCallback((args) => {
      const event = args.event;
      const resource = types.find((obj) => { return obj.id === event.resource });
      setHeader('<div>' + resource.name + '</div><div class="md-meal-type">' +
          formatDate('DDDD, DD MMMM YYYY', new Date(event.start)) + '</div>');
      setType(event.resource);
      setEdit(false);
      setTempMeal(event)
      // fill popup form with event data
      loadPopupForm(event);
      // open the popup
      setOpen(true);
  }, [loadPopupForm]);
  const typeChange = useCallback((ev) => {
      const value = +ev.target.value;
      setType(value);
      setTempMeal({...tempMeal, resource: value});
  }, [tempMeal]);

  const onEventDeleted = useCallback((args) => {
      deleteEvent(args.event)
  }, [deleteEvent]);
  // popup options
  const popupButtons = useMemo(() => {
      if (isEdit) {
          return ['cancel', {
              handler: () => {
                  saveEvent();
              },
              keyCode: 'enter',
              text: 'Save',
              cssClass: 'mbsc-popup-button-primary'
          }];
      } else {
          return ['cancel', {
              handler: () => {
                  saveEvent();
              },
              keyCode: 'enter',
              text: 'Add',
              cssClass: 'mbsc-popup-button-primary'
          }];
      }
  }, [isEdit, saveEvent]);
  const onClose = useCallback(() => {
      if (!isEdit) {
          // refresh the list, if add popup was canceled, to remove the temporary event
          setMyMeals([...myMeals]);
      }
      setOpen(false);
  }, [isEdit, myMeals]);
  
  const extendDefaultEvent = useCallback((args) => {
      return { 
          title: 'New meal',
          allDay: true
      };
  }, []);
  const renderMyResource = (resource) => {
      return <div className="md-meal-planner-cont">
          <div className="md-meal-planner-title" style={{ color: resource.color }}>
              <span className="md-meal-planner-icon" dangerouslySetInnerHTML={{ __html: resource.icon }}></span>
              {resource.name}
          </div>
          <div className="md-meal-planner-kcal">{resource.kcal}</div>
      </div>;
  }
  const myScheduleEvent = useCallback((args) => {
      const event = args.original;
      return <div className="md-meal-planner-event">
          <div className="md-meal-planner-event-title">{event.title}</div>
          {event.caloriesx && <div className="md-meal-planner-event-desc">Calories {event.caloriesx} kcal</div>}
      </div>
  }, []);
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
      <Eventcalendar
          view={viewSettings}
          data={myMeals}
          resources={types}
          dragToCreate={false}
          dragToResize={false}
          dragToMove={true}
          clickToCreate={true}
          extendDefaultEvent={extendDefaultEvent}
          onEventClick={onEventClick}
          onEventCreated={onEventCreated}
          onEventDeleted={onEventDeleted}
          renderResource={renderMyResource}
          renderScheduleEventContent={myScheduleEvent}
          cssClass="md-meal-planner-calendar"
      />
      <Popup
          display="bottom"
          fullScreen={true}
          contentPadding={false}
          headerText={headerText}
          buttons={popupButtons}
          isOpen={isOpen}
          onClose={onClose}
          responsive={responsivePopup}
          cssClass="md-meal-planner-popup"
      >
          <SegmentedGroup onChange={typeChange} value={type}>
          {types.map((type) => {
              return <SegmentedItem value={type.id} key={type.id}>{type.name}</SegmentedItem>
          })}
          </SegmentedGroup>
          <div className="mbsc-form-group">
              <Input label="Name" value={name} onChange={nameChange} />
              <Input label="Caloriesx" value={caloriesx} onChange={caloriesChange} />
              <Textarea label="Notes" value={notes} onChange={notesChange} />
          </div>
          {isEdit && <div className="mbsc-button-group">
              <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete meal</Button>
          </div>}
      </Popup>
  </div>
{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
    </DashboardLayout>
  );
}

export default Tables;
