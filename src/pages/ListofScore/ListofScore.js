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

import './ListofScore.css'
import {
  Button,
  TextField,
  Modal,
  Box,
} from "@material-ui/core";

import Stack from '@mui/material/Stack';
import AddScore from "./AddScore";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const ListofScore = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [listScore, setListScore] = useState([]);
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    firebase
      .firestore()
      .collection("score")
      .onSnapshot(snapshot => {
        const lScore = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }
        ))
        setListScore(lScore)
      })
    return listScore
  }, [])

  console.log(listScore)

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  console.log(searchText)

  const studentSearch = listScore.filter((score) => {
    return (
      score.userId.match(searchText)
    );
  })

  console.log("studentSearch", studentSearch)

  return (
    <>
      <PageTitle title="List of Score" />
      <Paper>
        <div className="form">
          <TextField id="outlined-search" label="Search by ID" className="search-bar" type="search"
            value={searchText} onChange={handleChange} />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleOpen} color="primary" endIcon={<AddIcon />}>
              New
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                <AddScore />
              </Box>
            </Modal>
          </Stack>
        </div>

        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Field</TableCell>
                <TableCell align="center">Class</TableCell>
                <TableCell align="center">Course</TableCell>
                <TableCell align="center">Assignment 1</TableCell>
                <TableCell align="center">Assignment 2</TableCell>
                <TableCell align="center">Final Project</TableCell>
                <TableCell align="center">Total Score</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            {searchText.length > 0 ?
              <TableBody>
                {studentSearch.map((score) =>
                  <TableRow key={score.name}>
                    <TableCell component="th" scope="row">
                      {score.name}
                    </TableCell>
                    <TableCell align="center">{score.userId}</TableCell>
                    <TableCell align="center">{score.field}</TableCell>
                    <TableCell align="center">{score.class}</TableCell>
                    <TableCell align="center">{score.course}</TableCell>
                    <TableCell align="center">{score.asm1}</TableCell>
                    <TableCell align="center">{score.asm2}</TableCell>
                    <TableCell align="center">{score.fTest}</TableCell>
                    <TableCell align="center">{(parseInt(score.asm1) + parseInt(score.asm2) + parseInt(score.fTest))/3}</TableCell>

                    <TableCell align="center">
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-student/${score.id}`}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              : <TableBody>
                {listScore.map((score) =>
                  <TableRow key={score.name}>
                    <TableCell component="th" scope="row">
                      {score.name}
                    </TableCell>
                    <TableCell align="center">{score.userId}</TableCell>
                    <TableCell align="center">{score.field}</TableCell>
                    <TableCell align="center">{score.class}</TableCell>
                    <TableCell align="center">{score.course}</TableCell>
                    <TableCell align="center">{score.asm1}</TableCell>
                    <TableCell align="center">{score.asm2}</TableCell>
                    <TableCell align="center">{score.fTest}</TableCell>
                    <TableCell align="center">{((parseInt(score.asm1) + parseInt(score.asm2) + parseInt(score.fTest))/3)>4?"Pass":"Fail"}
                    </TableCell>

                    <TableCell align="center">
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-student/${score.id}`}>
                        Edit
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

export default ListofScore;

