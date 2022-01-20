import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PageTitle from "../../components/PageTitle";
import firebase from '../../Config/fbConfig';
import { Link } from 'react-router-dom';

import './FeedbackTeacher.css'
import {
  Button,
  TextField,
  Modal,
  Box,
} from "@material-ui/core";

import Stack from '@mui/material/Stack';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const FeedbackTeacher = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [listFeedback, setListFeedback] = useState([]);
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    firebase
      .firestore()
      .collection("teachers")
      .onSnapshot(snapshot => {
        const lFeed = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }
        ))
        setListFeedback(lFeed)
      })
    return listFeedback
  }, [])

  console.log(listFeedback)

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  console.log(searchText)

  const studentSearch = listFeedback.filter((feedback) => {
    return (
      feedback.userId.match(searchText)
    );
  })

  console.log("studentSearch", studentSearch)

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
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            {searchText.length > 0 ?
              <TableBody>
                {studentSearch.map((feedback) =>
                  <TableRow key={feedback.name}>
                    <TableCell component="th" scope="row">
                      {feedback.name}
                    </TableCell>
                    <TableCell align="center">{feedback.field}</TableCell>

                    <TableCell align="center">
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/feedback-detail/${feedback.id}`}>
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              : <TableBody>
                {listFeedback.map((feedback) =>
                  <TableRow key={feedback.name}>
                    <TableCell component="th" scope="row">
                      {feedback.name}
                    </TableCell>
                    <TableCell align="center">{feedback.field}</TableCell>

                    <TableCell align="center">
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/feedback-detail/${feedback.id}`}>
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            }
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default FeedbackTeacher;

