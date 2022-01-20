import React, { useEffect, Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import './EditFee.css'
import firebase from '../../Config/fbConfig';
import { withRouter } from "react-router-dom";


class EditFee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            name: '',
            userId: '',
            field: '',
            semester: '',
            type: '',
            fee: '',
            status: '',
        };
    }


    componentDidMount() {
        const id = this.props.match.params.idRoute;
        const ref = firebase.firestore().collection('fee').doc(id);
        console.log(id)
        ref.get().then((doc) => {
            if (doc.exists) {
                const tuiFee = doc.data();
                this.setState({
                    key: doc.id,
                    name: tuiFee.name,
                    userId: tuiFee.userId,
                    field: tuiFee.field,
                    semester: tuiFee.semester,
                    type: tuiFee.type,
                    fee: tuiFee.fee,
                    status: tuiFee.status,
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ tuiFee: state });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.idRoute;

        const { name, userId, field, semester, type, fee, status } = this.state;
        const updateRef = firebase.firestore().collection('fee').doc(id);
        updateRef.set({
            name,
            userId,
            field,
            semester,
            type,
            fee,
            status,
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                userId: '',
                field: '',
                semester: '',
                type: '',
                fee: '',
                status: '',
            });
            this.props.history.push("/app/fee-students")

        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <form autoComplete="off" className="modal-box-fee" onSubmit={this.onSubmit}>
                    <h2 className="title">Add Tuition Fee For Student</h2>
                    <InputLabel id="label">Name</InputLabel>
                    <Input type="text" name="name" className="input-form" value={this.state.name} onChange={this.onChange} />


                    <InputLabel id="label">Student ID</InputLabel>
                    <Input type="text" name="userId" className="input-form" value={this.state.userId} onChange={this.onChange} />


                    <InputLabel id="label">Field</InputLabel>
                    <NativeSelect value={this.state.field} className="select-form" name="field" onChange={this.onChange}>
                        <option value="">Select Field</option>
                        <option value="IT">IT</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                    </NativeSelect>


                    <InputLabel id="label">Semester</InputLabel>
                    <NativeSelect value={this.state.semester} className="select-form" name="semester" onChange={this.onChange}>
                        <option value="">Select Semester</option>
                        <option value="Spring 2020">Spring 2020</option>
                        <option value="Summer 2020">Summer 2020</option>
                        <option value="Fall 2020">Fall 2020</option>
                        <option value="Spring 2020">Spring 2021</option>
                        <option value="Summer 2020">Summer 2022</option>
                        <option value="Fall 2020">Fall 2022</option>
                    </NativeSelect>



                    <InputLabel id="label">Type</InputLabel>
                    <NativeSelect value={this.state.type} className="select-form" name="type" onChange={this.onChange}>
                        <option value="">Select Type</option>
                        <option value="New">New</option>
                        <option value="Re-study">Re-study</option>
                    </NativeSelect>


                    <InputLabel id="label">Fee</InputLabel>
                    <Input name="fee" type="number" className="input-form" value={this.state.fee} onChange={this.onChange} />


                    <InputLabel id="label">Status</InputLabel>
                    <NativeSelect value={this.state.status} className="select-form" name="status" onChange={this.onChange}>
                        <option value="">Select Status</option>
                        <option value="Done">Done</option>
                        <option value="Not Yet">Not Yet</option>
                    </NativeSelect>


                    <Button variant="contained" color="success" type="submit" className="submitButton">
                        Submit
                    </Button>
                </form>
        );
    }
}

export default withRouter(EditFee);
