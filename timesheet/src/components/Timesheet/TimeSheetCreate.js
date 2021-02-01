import React from 'react';
import TimeSheetForm from "./TimeSheetForm";
import history from "../../history";
import sedinApi from "../../apis/sedin";

const TimeSheetCreate = () => {
  return (
    <div className="">
      <h3>Timesheet Entry</h3>
      <TimeSheetForm />
    </div>
  )
}

export default TimeSheetCreate;
