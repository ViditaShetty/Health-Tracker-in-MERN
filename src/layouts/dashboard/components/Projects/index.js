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

import { useState ,useEffect} from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsCheckCircleFill } from "react-icons/bs";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

// Data
//import data from "layouts/dashboard/components/Projects/data";

///////for med notifications
import Tables2 from "../../../tables2";
import axios from "axios"
import Tooltip from "@mui/material/Tooltip";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

function Projects() {
  //const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );


{/* //////////////med notification */}
  const [ reminderMsg, setReminderMsg ] = useState("")
  const [ remindAt, setRemindAt ] = useState()
  const [ reminderList, setReminderList ] = useState([])

  useEffect(() => {
      axios.get("http://localhost:9000/getAllReminder").then( res => setReminderList(res.data))
  }, [])

  const avatars = (Time) =>
  Time.map(([image, name]) => (
    <Tooltip key={name} title={name} placeholder="bottom">
      <VuiAvatar
        src={image}
        alt="name"
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { dark } }) =>
            `${borderWidth[2]} solid ${dark.focus}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    </Tooltip>
  ));
  ///////////////////////////////////////////////for med notif redefine rowsand columns here instead od fata folder    
   const columns= [
      { name: "Medicines", align: "left" },
      { name: "Time", align: "left" },
      { name: "Date", align: "center" },
      { name: "Taken", align: "center" },
    ]
   var rows=[];
    reminderList.map( reminder => (
      rows.push({Medicines: (<VuiBox display="flex" alignItems="center"><Atlassian size="20px" /><VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
                {reminder.reminderMsg}</VuiTypography></VuiBox>),
             Time: (<VuiTypography variant="button" color="white" fontWeight="bold">
                  {String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"}))).slice(-40,-34)} </VuiTypography>),
             Date: (<VuiTypography variant="button" color="white" fontWeight="bold">
                 {String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"}))).slice(0,3)}</VuiTypography>),
             Taken: (<VuiBox width="8rem" textAlign="left"><VuiTypography color="white" variant="button" fontWeight="bold">
                 done</VuiTypography> <VuiProgress value={40} color="info" label={false} sx={{ background: "#2D2E5F" }} /></VuiBox> )})  ))
      
  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Medicine Notifications
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>30 done</strong> this month
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </VuiBox>
        {renderMenu}
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

  
        <Table columns={columns} rows={rows} />
        {/* //////////////med notification */}
       
      </VuiBox>
    </Card>
  );
}

export default Projects;
