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
import DeleteIcon from '@mui/icons-material/Delete';
import PageTitle from "../../components/PageTitle";
import firebase from '../../Config/fbConfig';
import { Link } from 'react-router-dom';

import './ListofStudents.css'
import {
  Button,
  TextField,
  Modal,
  Box,
} from "@material-ui/core";

import Stack from '@mui/material/Stack';
import AddStudent from "./AddStudent";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const ListofStudents = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    firebase
      .firestore()
      .collection("students")
      .onSnapshot(snapshot => {
        const listStudent = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }
        ))
        setStudents(listStudent)
      })
    return students
  }, [])

  console.log(students)

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  console.log(searchText)

  const studentSearch = students.filter((student) => {
    return (
      student.userId.match(searchText)
    );
  })

  console.log("studentSearch", studentSearch)


  const deleteStudent = (id) => {
    firebase.firestore().collection("students").doc(String(id)).delete()
      .then(() => {
        console.log("Document successfully deleted!");
        console.log(students)
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }




  return (
    <>
      <PageTitle title="List of Students" />
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
                <AddStudent />
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
                <TableCell align="center">Birthday</TableCell>
                <TableCell align="center">Fields</TableCell>
                <TableCell align="center">Joining Year</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            {searchText.length > 0 ?
              <TableBody>
                {studentSearch.map((student) =>
                  <TableRow key={student.id}>
                    <TableCell component="th" scope="row">
                      {student.name}
                    </TableCell>
                    <TableCell align="center">{student.userId}</TableCell>
                    <TableCell align="center">{student.birthday}</TableCell>
                    <TableCell align="center">{student.field}</TableCell>
                    <TableCell align="center">{student.joinYear}</TableCell>
                    <TableCell align="center">{student.email}</TableCell>
                    <TableCell align="center">{student.status}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-student/${student.id}`}>
                          Edit
                        </Button>
                        <Button variant="contained" onClick={() => deleteStudent(student.id)} endIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>

                  </TableRow>
                )}
              </TableBody>
              : <TableBody>
              {students.map((student) =>
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.name}
                  </TableCell>
                  <TableCell align="center">{student.userId}</TableCell>
                  <TableCell align="center">{student.birthday}</TableCell>
                  <TableCell align="center">{student.field}</TableCell>
                  <TableCell align="center">{student.joinYear}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                  <TableCell align="center">{student.status}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-student/${student.id}`}>
                        Edit
                      </Button>
                      <Button variant="contained" onClick={() => deleteStudent(student.id)} endIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>

                </TableRow>
              )}
            </TableBody>}
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ListofStudents;
