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
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

import './FeedbackClass.css'
import {
  Button,
  TextField,
  Modal,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const FeedbackClass = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [listFeedback, setListFeedback] = useState([]);


  useEffect(() => {
    firebase
      .firestore()
      .collection("feedbackClasses")
      .onSnapshot(snapshot => {
        const lFeedback = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }
        ))
        setListFeedback(lFeedback)
      })
    return listFeedback
  }, [])

  console.log(listFeedback)


  return (
    <>
      <PageTitle title="List of Feedback" />
      <Paper>

        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Field</TableCell>
                <TableCell align="center">Class</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Action</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {listFeedback.map((feedback) =>
                <TableRow key={feedback.name}>
                  <TableCell component="th" scope="row">
                    {feedback.name}
                  </TableCell>
                  <TableCell align="center">{feedback.field}</TableCell>
                  <TableCell align="center">{feedback.class}</TableCell>
                  <TableCell align="center">{feedback.rating}</TableCell>
                  <TableCell align="center">
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/feedback-class/${feedback.id}`}>
                        Detail
                      </Button>
                    </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default FeedbackClass;

