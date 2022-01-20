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

import './ListofTeacher.css'
import {
  Button,
  TextField,
  Modal,
  Box,
} from "@material-ui/core";

import Stack from '@mui/material/Stack';
import AddTeacher from "./AddTeacher";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const ListofTeacher = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teachers, setTeacher] = useState([]);
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    firebase
      .firestore()
      .collection("teachers")
      .onSnapshot(snapshot => {
        const listTeacher = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }
        ))
        setTeacher(listTeacher)
      })
    return teachers
  }, [])

  console.log(teachers)

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  console.log(searchText)

  const teacherSearch = teachers.filter((teacher) => {
    return (
      teacher.userId.match(searchText)
    );
  })

  console.log("teacherSearch", teacherSearch)


  const deleteTeacher = (id) => {
    firebase.firestore().collection("teachers").doc(String(id)).delete()
      .then(() => {
        console.log("Document successfully deleted!");
        console.log(teachers)
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }




  return (
    <>
      <PageTitle title="List of Teachers" />
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
                <AddTeacher />
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
                {teacherSearch.map((teacher) =>
                  <TableRow key={teacher.id}>
                    <TableCell component="th" scope="row">
                      {teacher.name}
                    </TableCell>
                    <TableCell align="center">{teacher.userId}</TableCell>
                    <TableCell align="center">{teacher.birthday}</TableCell>
                    <TableCell align="center">{teacher.field}</TableCell>
                    <TableCell align="center">{teacher.joinYear}</TableCell>
                    <TableCell align="center">{teacher.email}</TableCell>
                    <TableCell align="center">{teacher.status}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-teacher/${teacher.id}`}>
                          Edit
                        </Button>
                        <Button variant="contained" onClick={() => deleteTeacher(teacher.id)} endIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>

                  </TableRow>
                )}
              </TableBody>
              : <TableBody>
              {teachers.map((teacher) =>
                <TableRow key={teacher.id}>
                  <TableCell component="th" scope="row">
                    {teacher.name}
                  </TableCell>
                  <TableCell align="center">{teacher.userId}</TableCell>
                  <TableCell align="center">{teacher.birthday}</TableCell>
                  <TableCell align="center">{teacher.field}</TableCell>
                  <TableCell align="center">{teacher.joinYear}</TableCell>
                  <TableCell align="center">{teacher.email}</TableCell>
                  <TableCell align="center">{teacher.status}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-teacher/${teacher.id}`}>
                        Edit
                      </Button>
                      <Button variant="contained" onClick={() => deleteTeacher(teacher.id)} endIcon={<DeleteIcon />}>
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

export default ListofTeacher;
