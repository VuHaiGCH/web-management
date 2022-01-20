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
import moment from 'moment'

import './ListofNews.css'
import {
  Button,
  TextField,
  Modal,
  Box,
} from "@material-ui/core";

import Stack from '@mui/material/Stack';
import AddNews from './AddNews'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const ListofNews = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [news, setNews] = useState([]);
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    firebase
      .firestore()
      .collection("news")
      .onSnapshot(snapshot => {
        const listStudent = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }
        ))
        setNews(listStudent)
      })
    return news
  }, [])

  console.log(news)

  const handleChange = event => {
    setSearchText(event.target.value);
  };




  const deleteNews = (id) => {
    firebase.firestore().collection("news").doc(String(id)).delete()
      .then(() => {
        console.log("Document successfully deleted!");
        console.log(news)
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }




  return (
    <>
      <PageTitle title="List of News" />
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
                <AddNews />
              </Box>
            </Modal>
          </Stack>
        </div>

        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Content</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

              <TableBody>
                {news.map((newsDetail) =>
                  <TableRow key={newsDetail.id}>
                    <TableCell component="th" scope="row">
                      {newsDetail.title}
                    </TableCell>
                    <TableCell align="center">{newsDetail.content}</TableCell>

                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => deleteNews(newsDetail.id)} endIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                      </Stack>
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

export default ListofNews;
