import React from 'react';
import Navbar from '../google-drive/Navbar';
import Routine from './Routine';
import {
  Button,
  Intent
} from "@blueprintjs/core";

export default function Workouts() {
    let workout;
    const routine = {
      title: "First Workout",
      exercises: [
        { name: "Pull-ups", reps: 0 },
        { name: "Push-ups", reps: 0 },
      ],
    };

    function newRoutine(title, details) {
        return workout = new Routine(title, details);
        
    }

    function handleCreateClick() {
        newRoutine(routine.title, routine.exercises);
        console.log(workout);
    }
    

    

    return (
      <>
        <Navbar />
        <Button
          intent={Intent.SUCCESS}
          text={"Create Workout Routine"}
          onClick={handleCreateClick}
        />
      </>
    );
}
