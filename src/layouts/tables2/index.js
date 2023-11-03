import {React,useState} from 'react';
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


//med reminder
import axios from "axios"
import DateTimePicker from "react-datetime-picker"
import {useEffect} from "react"
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import "./reminder.css"


function Tables2(){   
  {//********MED REMINDER *****************************************************/
  }
  const [ reminderMsg, setReminderMsg ] = useState("")
  const [ remindAt, setRemindAt ] = useState()
  const [ reminderList, setReminderList ] = useState([])

  useEffect(() => {
      axios.get("http://localhost:9000/getAllReminder").then( res => setReminderList(res.data))
  }, [])

  const addReminder = () => {
      axios.post("http://localhost:9000/addReminder", { reminderMsg, remindAt })
      .then( res => setReminderList(res.data))
      setReminderMsg("")
      setRemindAt()
  }

  const deleteReminder = (id) => {
    axios.post("http://localhost:9000/deleteReminder", { id })
    .then( res => setReminderList(res.data))
  }
  //END********
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
              <Row style={{padding:20,fontSize:25}}> Medicine Whatsapp Reminder </Row>
                  <Row>
                   {//MED REMINDER***************************
                   }
                    <div className="homepage">
                    <div className="homepage_header">
                      <h1 style={{fontSize:"25px"}}>Remind Me! </h1>
                      <input type="text" placeholder="Enter Name" value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} style={{backgroundColor:"white"}} />
                      <DateTimePicker 
                        value={remindAt}
                        onChange={setRemindAt}
                        minDate={new Date()}
                        minutePlaceholder="mm"
                        hourPlaceholder="hh"
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YYYY"
                        className="DateTimePicker"
                      />
                      
                      <div className="button" onClick={addReminder}>Add Reminder</div>
                    </div>

                    <div className="homepage_body">
                      {
                        reminderList.map( reminder => (
                          <div className="reminder_card" key={reminder._id}>
                            <h2 style={{fontSize:20}}>{reminder.reminderMsg}</h2>
                            <h3 style={{fontSize:20}}>Remind Me at:</h3>
                            <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"}))).slice(0,3)} , 
                               {String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"}))).slice(-40,-34)}
                               </p>
                            <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete</div>
                          </div>
                        ))
                      }
                    </div>
                    </div>
                  </Row>
              </VuiTypography>
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables2;
