import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import CalorieChart from "../components/CalorieChart";
import WorkoutChart from "../components/WorkoutChart";
import { CALORIES_PER_HOUR } from "../constants";
import useWorkoutDb from "../hooks/useWorkoutDb";
import {Row,Col} from "react-bootstrap";
function Dashboard() {
  const { isFetchingWorkouts, workouts } = useWorkoutDb();

  const initialData = {
    today: 0,
    week: 0,
    month: 0,
  };

  const [calories, setCalories] = useState(initialData);

  useEffect(() => {
    setCalories(initialData);

    const today = new Date();
    const dayOfYear = format(today, "d");
    const weekNum = format(today, "w");
    const monthNum = format(today, "L");

    const calcCalories = () => {
      for (const { createdAt, secondsPassed } of workouts) {
        const formattedDate = new Date(createdAt.seconds * 1000);
        const day = format(formattedDate, "d");
        const week = format(formattedDate, "w");
        const month = format(formattedDate, "L");

        const newCalories = CALORIES_PER_HOUR * (secondsPassed / 3600);

        if (dayOfYear === day) {
          setCalories((calories) => ({
            ...calories,
            today: calories.today + newCalories,
          }));
        }
        if (weekNum === week) {
          setCalories((calories) => ({
            ...calories,
            week: calories.week + newCalories,
          }));
        }
        if (monthNum === month) {
          setCalories((calories) => ({
            ...calories,
            month: calories.month + newCalories,
          }));
        }
      }
    };

    if (!isFetchingWorkouts && workouts.length) {
      calcCalories();
    }
  }, [isFetchingWorkouts, workouts]);

  return (
    <div className="space-y-10 w-full">
      <main className="lg:flex lg:space-x-10 space-y-5 lg:space-y-0"><Row style={{borderRadius: "26px",marginTop: "10%",marginRight: "4%"}}>
        <section className="lg:w-72  text-white rounded-xl" style={{width:"30%"}}>
          <Col><div className="p-5 space-y-10">
            <h2 className="text-lg text-primary">Workouts</h2>
              <h5 className="font-light text-sm text-white">TOTAL</h5>
                {isFetchingWorkouts ? 0 : workouts.length}
          </div>
          <WorkoutChart />
        </Col></section>
        <section className="flex-grow  rounded-xl lg:flex" style={{width:"45%",paddingTop:"2%",paddingBottom:"10%"}}>
           <div className="p-10 space-y-10">
            <h2 className="text-lg text-primary">Calories</h2>
              <h5 className="font-light text-sm text-white">TODAY :
                {isFetchingWorkouts ? 0 : parseInt(calories.today)}<br></br>
                THIS WEEK : 
                {isFetchingWorkouts ? 0 : parseInt(calories.week)}<br></br>
                THIS MONTH : 
                {isFetchingWorkouts ? 0 : parseInt(calories.month)}</h5>
          </div>
          <Col><div className="flex-grow">
           <CalorieChart />
          </div></Col>  
        </section>
        
         <Link to="/workout">
        </Link>
          
      </Row></main>
    </div>
  );
}

export default Dashboard;
