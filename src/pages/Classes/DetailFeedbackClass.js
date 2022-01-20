import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PageTitle from "../../components/PageTitle";
import firebase from '../../Config/fbConfig';
import { useParams } from 'react-router-dom';
import './DetailFeedbackClass.css'
import moment from 'moment'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const DetailFeedbackClass = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [detailFeedback, setdetailFeedback] = useState([]);
  let { idRoute } = useParams();

  console.log(idRoute)


  useEffect(() => {
    var docRef = firebase.firestore().collection("classes").doc(idRoute);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setdetailFeedback([doc.data()])
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [])

  console.log(detailFeedback)

  return (
    <>
      <PageTitle title="Detail of Class" />
      <Paper>

        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Class ID</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            {detailFeedback.map((detail) =>
              <TableBody>
                {detail.schedule.map((detailSchedule =>

                  <TableRow key={detail.id}>
                    <TableCell component="th" scope="row">
                      {detail.classId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {detail.subject}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {detail.department}
                    </TableCell>
                    <TableCell>{moment.unix(detailSchedule.date.seconds).format('MM/DD/YYYY')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default DetailFeedbackClass;
