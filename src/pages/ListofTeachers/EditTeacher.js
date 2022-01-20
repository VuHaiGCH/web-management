import React, { useEffect, Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import './EditTeacher.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import firebase from '../../Config/fbConfig';
import { withRouter } from "react-router-dom";


class EditTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            name: '',
            userId: '',
            birthday: '',
            field: '',
            joinYear: '',
            email: '',
            status: ''
        };
    }


    componentDidMount() {
        const id = this.props.match.params.idRoute;
        const ref = firebase.firestore().collection('teachers').doc(id);
        console.log(id)
        ref.get().then((doc) => {
            if (doc.exists) {
                const student = doc.data();
                this.setState({
                    key: doc.id,
                    name: student.name,
                    userId: student.userId,
                    birthday: student.birthday,
                    field: student.field,
                    joinYear: student.joinYear,
                    email: student.email,
                    status: student.status
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ student: state });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.idRoute;

        const { name, userId, birthday, field, joinYear, email, status } = this.state;
        const updateRef = firebase.firestore().collection('teachers').doc(id);
        updateRef.set({
            name,
            userId,
            birthday,
            field,
            joinYear,
            email,
            status
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                userId: '',
                birthday: '',
                field: '',
                joinYear: '',
                email: '',
                status: ''
            });
            this.props.history.push("/app/list-of-teachers")

        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <form autoComplete="off" className="modal-box-edit-teacher" onSubmit={this.onSubmit}>
                <h2 className="title">Edit Teacher</h2>
                <Box sx={{ flexGrow: 1, marginTop: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel id="label">Name</InputLabel>
                            <Input type="text" name="name" className="input-form" value={this.state.name} onChange={this.onChange} />

                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel id="label">User Id</InputLabel>
                            <Input name="userId" className="input-form" value={this.state.userId} onChange={this.onChange} />

                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel id="label">Birthday</InputLabel>
                            <Input type="date" name="birthday" className="input-form" value={this.state.birthday} onChange={this.onChange} />

                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel id="label">Fields</InputLabel>
                            <NativeSelect value={this.state.field} className="select-form" name="field" onChange={this.onChange}>
                                <option value="">Select Field</option>
                                <option value="IT">IT</option>
                                <option value="Business">Business</option>
                                <option value="Design">Design</option>
                            </NativeSelect>

                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel id="label">Join Year</InputLabel>
                            <Input name="joinYear" className="input-form" value={this.state.joinYear} onChange={this.onChange} />
                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel id="label">Email</InputLabel>
                            <Input name="email" className="input-form" value={this.state.email} onChange={this.onChange} />
                        </Grid>

                    </Grid>
                </Box>


                <InputLabel id="label">Status</InputLabel>
                <NativeSelect value={this.state.status} name="status" onChange={this.onChange}>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </NativeSelect>

                <Button variant="contained" color="success" type="submit" className="submitButton">
                    Submit
                </Button>
            </form>
        );
    }
}

export default withRouter(EditTeacher);
