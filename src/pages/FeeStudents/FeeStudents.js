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

import './FeeStudents.css'
import {
  Button,
  TextField,
  Modal,
  Box,
} from "@material-ui/core";

import Stack from '@mui/material/Stack';
import AddFee from "./AddFee";


const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const FeeStudents = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [listFee, setListFee] = useState([]);
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    firebase
      .firestore()
      .collection("fee")
      .onSnapshot(snapshot => {
        const listF = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }
        ))
        setListFee(listF)
      })
    return listFee
  }, [])

  console.log(listFee)

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  console.log(searchText)

  const feeSearchID = listFee.filter((fee) => {
    return (
      fee.userId.match(searchText)
    );
  })

  console.log("feeSearch", feeSearchID)


  const deleteFee = (id) => {
    firebase.firestore().collection("fee").doc(String(id)).delete()
      .then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }




  return (
    <>
      <PageTitle title="List of Tuition Fee" />
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
                <AddFee />
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
                <TableCell align="center">Fields</TableCell>
                <TableCell align="center">Semester</TableCell>
                <TableCell align="center">Fee</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            {searchText.length > 0 ?
              <TableBody>
                {feeSearchID.map((fee) =>
                  <TableRow key={fee.id}>
                    <TableCell component="th" scope="row">
                      {fee.name}
                    </TableCell>
                    <TableCell align="center">{fee.userId}</TableCell>
                    <TableCell align="center">{fee.field}</TableCell>
                    <TableCell align="center">{fee.semester}</TableCell>
                    <TableCell align="center">{fee.feeMoney}$</TableCell>
                    <TableCell align="center">{fee.type}</TableCell>
                    <TableCell align="center">{fee.status}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-fee/${fee.id}`}>
                          Edit
                        </Button>
                        <Button variant="contained" onClick={() => deleteFee(fee.id)} endIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>

                  </TableRow>
                )}
              </TableBody>
              : <TableBody>
                {listFee.map((fee) =>
                  <TableRow key={fee.id}>
                    <TableCell component="th" scope="row">
                      {fee.name}
                    </TableCell>
                    <TableCell align="center">{fee.userId}</TableCell>
                    <TableCell align="center">{fee.field}</TableCell>
                    <TableCell align="center">{fee.semester}</TableCell>
                    <TableCell align="center">{fee.fee}$</TableCell>
                    <TableCell align="center">{fee.type}</TableCell>
                    <TableCell align="center">{fee.status}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" startIcon={<EditIcon />} component={Link} to={`/app/edit-fee/${fee.id}`}>
                          Edit
                        </Button>
                        <Button variant="contained" onClick={() => deleteFee(fee.id)} endIcon={<DeleteIcon />}>
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

export default FeeStudents;
