import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";


// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";

// context
import { useLayoutState } from "../../context/LayoutContext";
import ListofStudents from "../../pages/ListofStudents/ListofStudents";
import ListofTeacher from "../../pages/ListofTeachers/ListofTeachers";
import FeedbackTeachers from "../../pages/FeedbackTeacher/FeedbackTeacher";
import FeeStudents from "../../pages/FeeStudents/FeeStudents";
import ListofScore from "../../pages/ListofScore/ListofScore";
import ListofClasses from "../../pages/Classes/ListofClasses";
import FeedbackClass from "../../pages/FeedbackofClass/FeedbackClass";
import ListofNews from "../../pages/News/ListofNews";
import EditStudent from "../../pages/ListofStudents/EditStudent";
import EditFee from "../../pages/FeeStudents/EditFee";
import EditTeacher from "../../pages/ListofTeachers/EditTeacher";
import EditClass from "../../pages/Classes/EditClass";
import DetailClass from "../../pages/Classes/DetailClass";
import DetailFeedbackClass from "../../pages/Classes/DetailFeedbackClass";
import DetailFeedback from "../../pages/FeedbackTeacher/DetailFeedback";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
            
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/list-of-students" component={ListofStudents} />
              <Route path="/app/edit-student/:idRoute" component={EditStudent} />
              <Route path="/app/fee-students" component={FeeStudents} />
              <Route path="/app/edit-fee/:idRoute" component={EditFee} />
              <Route path="/app/list-of-score" component={ListofScore} />


              <Route path="/app/list-of-teachers" component={ListofTeacher} />
              <Route path="/app/edit-teacher/:idRoute" component={EditTeacher} />
              <Route path="/app/feedback-teachers" component={FeedbackTeachers} />
              <Route path="/app/feedback-detail/:idRoute" component={DetailFeedback} />
              <Route path="/app/list-of-classes" component={ListofClasses} />
              <Route path="/app/edit-class/:idRoute" component={EditClass} />
              <Route path="/app/detail-class/:idRoute" component={DetailClass} />
              <Route path="/app/feedback-classes" component={FeedbackClass} />
              <Route path="/app/feedback-class/:idRoute" component={DetailFeedbackClass} />


              <Route path="/app/list-of-news" component={ListofNews} />


            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
