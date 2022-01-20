import React, { useEffect, Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import './EditClass.css'
import firebase from '../../Config/fbConfig';
import { withRouter } from "react-router-dom";


class EditClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            classId: '',
            field: '',
            subject: '',
            semester: '',
            department: '',
            start: '',
            end: '',
            status: '',
            schedule: [],
            students:[]
        };
    }


    componentDidMount() {
        const id = this.props.match.params.idRoute;
        const ref = firebase.firestore().collection('classes').doc(id);
        console.log(id)
        ref.get().then((doc) => {
            if (doc.exists) {
                const detailClass = doc.data();
                this.setState({
                    key: doc.id,
                    classId: detailClass.classId,
                    field: detailClass.field,
                    subject: detailClass.subject,
                    semester: detailClass.semester,
                    department: detailClass.department,
                    start: detailClass.start,
                    end: detailClass.end,
                    status: detailClass.status,
                    schedule: detailClass.schedule,
                    students: detailClass.students
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ detailClass: state });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.idRoute;
        console.log(id)
        const { classId, field, subject, semester, department, start, end, status, schedule,students } = this.state;
        const updateRef = firebase.firestore().collection('classes').doc(id);
        updateRef.set({
            classId,
            field,
            subject,
            semester,
            department,
            start,
            end,
            status,
            schedule,
            students
        }).then((docRef) => {
            this.setState({
                key: '',
                classId: '',
                field: '',
                subject: '',
                semester: '',
                department: '',
                start: '',
                end: '',
                status: '',
                schedule:[],
                students:[]
            });
            this.props.history.push("/app/list-of-classes")

        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <form autoComplete="off" className="modal-box-classes" onSubmit={this.onSubmit}>
                <h2 className="title">Edit Class</h2>
                <InputLabel id="label">Class ID</InputLabel>
                <Input type="text" name="classId" className="input-form" value={this.state.classId} onChange={this.onChange} />


                <InputLabel id="label">Field</InputLabel>
                <NativeSelect value={this.state.field} className="select-form" name="field" onChange={this.onChange}>
                    <option value="">Select Field</option>
                    <option value="IT">IT</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                </NativeSelect>


                <InputLabel id="label">Subject</InputLabel>
                <NativeSelect value={this.state.subject} className="select-form" name="subject" onChange={this.onChange}>
                    <option value="">Select Subject</option>
                    <option value="IT 1">IT 1</option>
                    <option value="IT 2">IT 2</option>
                    <option value="IT 3">IT 3</option>
                </NativeSelect>


                <InputLabel id="label">Semester</InputLabel>
                <NativeSelect value={this.state.semester} className="select-form" name="semester" onChange={this.onChange}>
                    <option value="">Select Semester</option>
                    <option value="Spring 2020">Spring 2020</option>
                    <option value="Summer 2020">Summer 2020</option>
                    <option value="Fall 2020">Fall 2020</option>
                    <option value="Spring 2021">Spring 2021</option>
                    <option value="Summer 2021">Summer 2021</option>
                    <option value="Fall 2021">Fall 2021</option>
                </NativeSelect>

                <InputLabel id="label">Department</InputLabel>
                <NativeSelect value={this.state.department} className="select-form" name="department" onChange={this.onChange}>
                    <option value="">Select Department</option>
                    <option value="Department 1">Department 1</option>
                    <option value="Department 2">Department 2</option>
                    <option value="Department 3">Department 3</option>
                </NativeSelect>

                <InputLabel id="label">Start</InputLabel>
                <Input name="start" type="date" className="input-form" value={this.state.start} onChange={this.onChange} />


                <InputLabel id="label">End</InputLabel>
                <Input name="end" type="date" className="input-form" value={this.state.end} onChange={this.onChange} />


                <InputLabel id="label">Status</InputLabel>
                <NativeSelect value={this.state.status} className="select-form" name="status" onChange={this.onChange}>
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

export default withRouter(EditClass);
