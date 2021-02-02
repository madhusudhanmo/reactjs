import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sedinApi from '../../apis/sedin';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, TextField, NativeSelect } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#659EC7',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  root: {
    width: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
    boxShadow: "0px 0px",
  },
  table: {
    minWidth: 700,
  },
  header: {
    backgroundColor: '#1D8FCE',
  },
  addNew: {
    float: 'right',
  },
  select: {
    marginBottom: '5px',
    marginLeft: '10px',
  }
});

const options = [
    {selected: false, value: "Today"},
    {selected: false, value: "Yesterday"},
    {selected: false, value: "This Week"},
    {selected: false, value: "Last Week"},
    {selected: true, value: "This Month"},
    {selected: false, value: "Last Month"},
    {selected: false, value: "Custom Date"}]

const TimeSheetEntries = (props) => {
  const classes = useStyles();
  const [timeSheetEntries, setTimeSheetEntries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [month, setMonth] = useState('This Month');
  const [project, setProject] = useState(null);

  useEffect(() => {
    callApi();

    const fetchProjects = async () => {
      const { data } = await sedinApi.get("/api/v1/time_sheet/employee_projects", {
        headers: {
          Authorization: props.auth_key
        },
      });

      setProjects(data.projects)
    }
    fetchProjects();
  }, []);

  const callApi = () => {
    const fetchTimesheetEntries = async () => {
      const { data } = await sedinApi.get("/api/v1/time_sheet", {
        headers: {
          Authorization: props.auth_key
        },
        params: {
          date: month,
          project_id: project
        },
      });
      setTimeSheetEntries(data.time_sheet_entries)
    };
    fetchTimesheetEntries();
  }

  const fetchData = () => {
    callApi();
  }

  return (
    <>
    <TableContainer component={Paper} className={classes.root}>
      <Button variant="contained" className={classes.select}>
        <NativeSelect
          name="month"
          inputProps={{ 'aria-label': 'age' }}
          onChange={(e) => setMonth(e.target.value)}
        >
          {options.map((option) => (
            <option defaultValue={month} key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </NativeSelect>
      </Button>
      <Button variant="contained" className={classes.select}>
        <NativeSelect
          name="project_id"
          inputProps={{ 'aria-label': 'age' }}
          onChange={(e) => setProject(e.target.value)}
        >
          <option defaultValue={true} key='all projects'>
            All Projects
          </option>
          {projects.map((project) => (
            <option defaultValue={project} key={project.name} value={project.id}>
              {project.name}
            </option>
          ))}
        </NativeSelect>
      </Button>
      <Button variant="contained" className={classes.select} color="primary" onClick={fetchData}>
        Search
      </Button>
      <Link to={`/time_sheet_entries/create`} className="ui button primary">
        <Button variant="contained" color="primary" className={classes.addNew}>
          Add New
        </Button>
      </Link>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.header}>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Project</StyledTableCell>
            <StyledTableCell>Hours</StyledTableCell>
            <StyledTableCell>Comment</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSheetEntries.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell>{row.project}</StyledTableCell>
              <StyledTableCell>{row.hours}</StyledTableCell>
              <StyledTableCell>{row.comments}</StyledTableCell>
              <StyledTableCell>
                <Link to={`/time_sheet_entries/edit/${row.id}`} className="ui button primary">
                  <EditIcon />
                </Link>
                <DeleteIcon />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

const mapStateToProps = (state) => {
  return { auth_key: state.auth.currentUser.auth_token }
}

export default connect(mapStateToProps, {})(TimeSheetEntries);
