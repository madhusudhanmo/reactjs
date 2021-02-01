import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import SignIn from '../src/components/SignIn';
import TimeSheetEntries from '../src/components/Timesheet/TimeSheetEntries';
import Header from '../src/components/Header';
import TimeSheetCreate from '../src/components/Timesheet/TimeSheetCreate';
import TimeSheetEdit from '../src/components/Timesheet/TimeSheetEdit';

const Routes = (props) => {
  return (
    <Switch>
      {props.isSignedIn ?
        <>
          <Header />
          <Route path="/" exact component={TimeSheetEntries} />
          <Route path="/time_sheet_entries/create" exact component={TimeSheetCreate} />
          <Route path="/time_sheet_entries/edit/:id" exact component={TimeSheetEdit} />
        </> :
        <Route path="/" exact component={SignIn} />
        }
    </Switch>
  )
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {})(Routes);
