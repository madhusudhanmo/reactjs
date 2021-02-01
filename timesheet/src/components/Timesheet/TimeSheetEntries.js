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
import Button from '@material-ui/core/Button';

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
    marginBottom: '5px',
  },
});

const TimeSheetEntries = (props) => {
  const classes = useStyles();
  const [timeSheetEntries, setTimeSheetEntries] = useState([]);

  useEffect(() => {
    const fetchTimesheetEntries = async () => {
      const { data } = await sedinApi.get("/api/v1/time_sheet", {
        headers: {
          Authorization: props.auth_key
        },
        params: {
          date: 'This Month'
        },
      });
      setTimeSheetEntries(data.time_sheet_entries)
    };
    fetchTimesheetEntries();
  }, []);

  return (
    <>
    <TableContainer component={Paper}  className={classes.root}>
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
