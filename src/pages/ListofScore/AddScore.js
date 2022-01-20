import React from 'react';
import { Formik } from "formik";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as yup from "yup";
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import firebase from '../../Config/fbConfig';

import './AddScore.css'


const validationSchema = yup.object({
    name: yup
        .string()
        .nullable()
        .required("Name is required"),
    userId: yup
        .string()
        .nullable()
        .required("Student ID is required"),
    email: yup
        .string()
        .nullable()
        .email('Enter a valid email')
        .required("Email type is required"),
    field: yup
        .string()
        .nullable()
        .required("Field is required"),
    class: yup
        .string()
        .nullable()
        .required("Class is required"),
    course: yup
        .string()
        .required("Course is required")
        .nullable(),
    asm1: yup
        .number()
        .nullable()
        .required("Assignment 1' score is required"),
    asm2: yup
        .number()
        .nullable()
        .required("Assignment 2' score is required"),

    fTest: yup
        .number()
        .nullable()
        .required("Final Test Score is required"),
    semester: yup
        .string()
        .nullable()
        .required("Semester is required"),
});

export default function AddScore() {
    const [value, setValue] = React.useState(null);

    return (
        <Formik
            initialValues={{
                name: null,
                email: null,
                userId: null,
                field: null,
                class: null,
                course: null,
                asm1: null,
                asm2: null,
                fTest: null,
                semester: null,
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                const propRef = firebase.firestore().collection('score').add(values);
                alert(JSON.stringify(values, null, 2));
                // history.goBack();
            }}
        >
            {(formikProps) => (
                <form autoComplete="off" className="modal-box-students" onSubmit={formikProps.handleSubmit}>
                    <h2 className="title">Add New Score</h2>
                    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <InputLabel id="label">Name</InputLabel>
                                <Input type="text" name="name" className="input-form" value={formikProps.values.name} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.name && formikProps.errors.name}
                                </p>
                            </Grid>


                            <Grid item xs={6}>
                                <InputLabel id="label">User Id</InputLabel>
                                <Input name="userId" className="input-form" value={formikProps.values.userId} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.userId && formikProps.errors.userId}
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="label">Fields</InputLabel>
                                <NativeSelect value={formikProps.values.field} className="select-form" name="field" onChange={formikProps.handleChange}>
                                    <option value="">Select Field</option>
                                    <option value="IT">IT</option>
                                    <option value="Business">Business</option>
                                    <option value="Design">Design</option>
                                </NativeSelect>

                                <p className="error">
                                    {formikProps.touched.field && formikProps.errors.field}
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="label">Class</InputLabel>
                                <Input name="class" type="text" className="input-form" value={formikProps.values.class} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.class && formikProps.errors.class}
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="label">Assignment 1</InputLabel>
                                <Input name="asm1" className="input-form" value={formikProps.values.asm1} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.asm1 && formikProps.errors.asm1}
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="label">Assignment 2</InputLabel>
                                <Input name="asm2" className="input-form" value={formikProps.values.asm2} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.asm2 && formikProps.errors.asm2}
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="label">Final Test</InputLabel>
                                <Input name="fTest" className="input-form" value={formikProps.values.fTest} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.fTest && formikProps.errors.fTest}
                                </p>
                            </Grid>
                            <Grid item xs={6}>
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
                            </Grid>
                        </Grid>
                    </Box>

                    <InputLabel id="label">Course</InputLabel>
                    <Input name="course" className="input-form" value={formikProps.values.course} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.course && formikProps.errors.course}
                    </p>

                    <InputLabel id="label">Email</InputLabel>
                    <Input type="email" name="email" className="input-form" value={formikProps.values.email} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.email && formikProps.errors.email}
                    </p>

                    <Button variant="contained" color="success" type="submit" className="submitButton">
                        Submit
                    </Button>
                </form>
            )}
        </Formik>
    );
}