import React from 'react';
import { Formik } from "formik";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as yup from "yup";
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import firebase from '../../Config/fbConfig';

import './AddFee.css'


const validationSchema = yup.object({
    name: yup
        .string()
        .nullable()
        .required("Name is required"),
    email: yup
        .string()
        .nullable()
        .email('Enter a valid email')
        .required("Email type is required"),
    userId: yup
        .string()
        .nullable()
        .required("Student ID is required"),
    field: yup
        .string()
        .nullable()
        .required("Field is required"),
    semester: yup
        .string()
        .nullable()
        .required("Semester is required"),
    type: yup
        .string()
        .required("Type is required")
        .nullable(),
    fee: yup
        .number()
        .nullable()
        .required("Fee is required"),
    status: yup
        .string()
        .nullable()
        .required("Status type is required"),

});

export default function AddFee() {
    const [value, setValue] = React.useState(null);

    return (
        <Formik
            initialValues={{
                name: null,
                email: null,
                field: null,
                semester: null,
                type: null,
                fee: null,
                status: null,
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                firebase.firestore().collection('fee').add(values);
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {(formikProps) => (
                <form autoComplete="off" className="modal-box-fee" onSubmit={formikProps.handleSubmit}>
                    <h2 className="title">Add Tuition Fee For Student</h2>
                    <InputLabel id="label">Name</InputLabel>
                    <Input type="text" name="name" className="input-form" value={formikProps.values.name} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.name && formikProps.errors.name}
                    </p>

                    <InputLabel id="label">Student ID</InputLabel>
                    <Input type="text" name="userId" className="input-form" value={formikProps.values.userId} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.userId && formikProps.errors.userId}
                    </p>

                    <InputLabel id="label">Email</InputLabel>
                    <Input type="email" name="email" className="input-form" value={formikProps.values.email} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.email && formikProps.errors.email}
                    </p>

                    <InputLabel id="label">Field</InputLabel>
                    <NativeSelect value={formikProps.values.field} className="select-form" name="field" onChange={formikProps.handleChange}>
                        <option value="">Select Field</option>
                        <option value="IT">IT</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                    </NativeSelect>
                    <p className="error">
                        {formikProps.touched.field && formikProps.errors.field}
                    </p>

                    <InputLabel id="label">Semester</InputLabel>
                    <NativeSelect value={formikProps.values.semester} className="select-form" name="semester" onChange={formikProps.handleChange}>
                        <option value="">Select Semester</option>
                        <option value="Spring 2020">Spring 2020</option>
                        <option value="Summer 2020">Summer 2020</option>
                        <option value="Fall 2020">Fall 2020</option>
                        <option value="Spring 2020">Spring 2021</option>
                        <option value="Summer 2020">Summer 2022</option>
                        <option value="Fall 2020">Fall 2022</option>
                    </NativeSelect>

                    <p className="error">
                        {formikProps.touched.semester && formikProps.errors.semester}
                    </p>

                    <InputLabel id="label">Type</InputLabel>
                    <NativeSelect value={formikProps.values.type} className="select-form" name="type" onChange={formikProps.handleChange}>
                        <option value="">Select Type</option>
                        <option value="New">New</option>
                        <option value="Re-study">Re-study</option>
                    </NativeSelect>
                    <p className="error">
                        {formikProps.touched.type && formikProps.errors.type}
                    </p>

                    <InputLabel id="label">Fee</InputLabel>
                    <Input name="fee" type="number" className="input-form" value={formikProps.values.fee} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.fee && formikProps.errors.fee}
                    </p>

                    <InputLabel id="label">Status</InputLabel>
                    <NativeSelect value={formikProps.values.status} className="select-form" name="status" onChange={formikProps.handleChange}>
                        <option value="">Select Status</option>
                        <option value="Done">Done</option>
                        <option value="Not Yet">Not Yet</option>
                    </NativeSelect>
                    <p className="error">
                        {formikProps.touched.status && formikProps.errors.status}
                    </p>

                    <Button variant="contained" color="success" type="submit" className="submitButton">
                        Submit
                    </Button>
                </form>
            )}
        </Formik>
    );
}