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
import InfoIcon from '@mui/icons-material/Info';
import PageTitle from "../../components/PageTitle";
import firebase from '../../Config/fbConfig';
import { Link } from 'react-router-dom';

import './ListofClasses.css'
import {
  Button,
  TextField,
  Modal,
  Box,
} from "@material-ui/core";

import Stack from '@mui/material/Stack';
import AddClass from "./AddClass";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const ListofClasses = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [classeStudent, setClassStudent] = useState([]);
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    firebase
      .firestore()
      .collection("classes")
      .onSnapshot(snapshot => {
        const listClasses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }
        ))
        setClassStudent(listClasses)
      })
    return classeStudent
  }, [])

  console.log(classeStudent)

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  console.log(searchText)

  const classSearch = classeStudent.filter((classStudent) => {
    return (
      classStudent.classId.match(searchText)
    );
  })

  console.log("studentSearch", classSearch)


  const deleteClass = (id) => {
    firebase.firestore().collection("classes").doc(String(id)).delete()
      .then(() => {
        console.log("Document successfully deleted!");
        console.log(classeStudent)
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }




  return (
    <>
      <PageTitle title="List of Classes" />
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
                <AddClass />
              </Box>
            </Modal>
          </Stack>
        </div>

        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Class ID</TableCell>
                <TableCell align="center">Fields</TableCell>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Semester</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Start</TableCell>
                <TableCell align="center">End</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            {searchText.length > 0 ?
              <TableBody>
                {classSearch.map((classSearch) =>
                  <TableRow key={classSearch.id}>
                    <TableCell component="th" scope="row">
                      {classSearch.classId}
                    </TableCell>
                    <TableCell align="center">{classSearch.field}</TableCell>
                    <TableCell align="center">{classSearch.subject}</TableCell>
                    <TableCell align="center">{classSearch.semester}</TableCell>
                    <TableCell align="center">{classSearch.department}</TableCell>
                    <TableCell align="center">{classSearch.start}</TableCell>
                    <TableCell align="center">{classSearch.end}</TableCell>
                    <TableCell align="center">{classSearch.status}</TableCell>

                    <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-class/${classSearch.id}`}>
                        Edit
                      </Button>
                      <Button variant="contained" onClick={() => deleteClass(classSearch.id)} endIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                      <Button variant="contained" startIcon={<InfoIcon />} component={Link} to={`/app/detail-class/${classSearch.id}`}>
                        Detail
                      </Button>
                    </Stack>
                    </TableCell>

                  </TableRow>
                )}
              </TableBody>
              : <TableBody>
              {classeStudent.map((classDetail) =>
                <TableRow key={classDetail.id}>
                  <TableCell component="th" scope="row">
                    {classDetail.classId}
                  </TableCell>
                  <TableCell align="center">{classDetail.field}</TableCell>
                  <TableCell align="center">{classDetail.subject}</TableCell>
                  <TableCell align="center">{classDetail.semester}</TableCell>
                  <TableCell align="center">{classDetail.department}</TableCell>
                  <TableCell align="center">{classDetail.start}</TableCell>
                  <TableCell align="center">{classDetail.end}</TableCell>
                  <TableCell align="center">{classDetail.status}</TableCell>

                  <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                      <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-class/${classDetail.id}`}>
                        Edit
                      </Button>
                      <Button variant="contained" onClick={() => deleteClass(classDetail.id)} endIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                      <Button variant="outlined" startIcon={<InfoIcon />} component={Link} to={`/app/detail-class/${classDetail.id}`}>
                        Detail
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

export default ListofClasses;
