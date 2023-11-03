import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './cal.css';
import {useEffect} from "react";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "(512 cal)Donuts,Shrimp,Salad",
        start: new Date(2023, 10, 1),
        end: new Date(2023, 10, 2),

    },
    {
        title: "(620 cal)Chicken Breast,Sandwich,Salad",
        start: new Date(2023, 10, 3),
        end: new Date(2023, 10, 3),
    },
];

function Calendarr() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    var [allEvents, setAllEvents] = useState(events);

    useEffect(()=>{
        if(!localStorage.getItem('foods')){localStorage.setItem('foods',"")}
        else{
            localStorage.getItem('foods').split(",").map((i)=>{
                //setAllEvents([...allEvents,{title:(i.split("*****")[0]), start:(i.split("*****")[1])  }] );
                
                allEvents=[...allEvents,{title:(i.split("*****")[0]), start:(new Date(i.split("*****")[1])),end:(i.split("*****")[1])  }]
                console.log("Allevents**&&&&*===",allEvents,{title:(i.split("*****")[0]), start:(i.split("*****")[1]) ,end:(i.split("*****")[1]) })

            })
            setAllEvents(allEvents)
            //setAllEvents(localStorage.getItem('foods'))
            console.log("Allevents***===",allEvents)
         }
    },[])

    function handleAddEvent() {
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].start);
            const d4 = new Date(newEvent.start);
    
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);      
       {/**     if (( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&(d4 <= d3) ))
            {   
                alert("CLASH"); 
                break;
             } */} 
    
        }
        
        console.log("Allevents===",allEvents)
        //setAllEvents([...allEvents, newEvent]);

        localStorage.setItem('foods',[ localStorage.getItem('foods') ,  newEvent.title+"*****"+newEvent.start ]);
        allEvents=[...allEvents,{title:(newEvent.title), start:(new Date(newEvent.start)),  end:(new Date(newEvent.start)) }]
        console.log("Allevents**&&&*===",allEvents)

        setAllEvents(allEvents)

    }

    return (
        <div className="Call">
            <h1>Food Chart</h1>
            <div>
                <input className="CallIp" type="text" placeholder="Add Title" style={{ width: "20%", marginLeft: "400px",background:"transparent",border:"1px solid white",padding:"3px 6px",color:"white" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <span className="CallDate"><DatePicker placeholderText="📆 " style={{ marginRight: "10px",background:"transparent"}} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start,start })} /></span>
                <button style={{ margin: "10px 20px",border:"none",borderRadius:"100px",background:"blue",padding:"10px 20px",color:"white",border:"1px solid white"}} onClick={handleAddEvent}>
                    Add Entry
                </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default Calendarr;