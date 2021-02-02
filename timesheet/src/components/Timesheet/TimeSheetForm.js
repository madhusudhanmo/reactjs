import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import  history from "../../history"
import sedinApi from "../../apis/sedin";
import {
  TextField,
} from "@material-ui/core";

const TimeSheetForm = (props) => {
  const [date, setDate] = useState('')
  const [project, setProject] = useState('')
  const [hours, setHours] = useState('')
  const [comment, setComment] = useState('')
  const onSubmitForm = (e) => {
    e.preventDefault()
    const params = {time_sheet: {project_id: project, date: date, comments: comment, hours: hours}}
    const response = sedinApi.post('/api/v1/time_sheet/time_sheet_entries', {}, {
      headers: {
        Authorization: props.auth.currentUser.auth_token
      },
      params: params
    })
    // history.push('/');
  }

  return (
    <form noValidate className="formDaila">
      <TextField name="date" onChange={(e) => setDate(e.target.value)} label="Date" /><br />
      <TextField name="project" onChange={(e) => setProject(e.target.value)} label="Project" /><br />
      <TextField name="hours" onChange={(e) => setHours(e.target.value)} label="Hours" /><br />
      <TextField name="comment" onChange={(e) => setComment(e.target.value)} label="Comments" /><br />
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={(e) => onSubmitForm(e)}
      >
        Save
      </Button>
    </form>
  )
}

const mapStateToProps = state => {
  return { ...state }
}

export default connect(mapStateToProps)(TimeSheetForm);
