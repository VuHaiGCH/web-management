import React from 'react';
import { Formik } from "formik";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as yup from "yup";
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import firebase from '../../Config/fbConfig';

import './AddClass.css'
import { Box } from '@mui/system';


const validationSchema = yup.object({
    classId: yup
        .string()
        .nullable()
        .required("Class ID is required"),
    field: yup
        .string()
        .nullable()
        .required("Field is required"),
    subject: yup
        .string()
        .nullable()
        .required("Subject is required"),
    semester: yup
        .string()
        .nullable()
        .required("Semester is required"),
    department: yup
        .string()
        .required("Department is required")
        .nullable(),
    start: yup
        .string()
        .nullable()
        .required("Start time is required"),
    end: yup
        .string()
        .nullable()
        .required("End time is required"),
    status: yup
        .string()
        .nullable()
        .required("Status is required"),

});

export default function AddClass() {
    const [value, setValue] = React.useState(null);

    return (
        <Formik
            initialValues={{
                classId: null,
                field: null,
                subject: null,
                semester: null,
                department: null,
                start: null,
                end: null,
                status: null,
                students:[]
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                var arrayT = []
                for (var i = new Date(values.start); i <= new Date(values.end); i.setDate(i.getDate() + 7)) {
                    arrayT.push({date: new Date(i) })
                }
                firebase.firestore().collection('classes').add({
                    classId: values.classId,
                    field: values.field,
                    subject: values.subject,
                    semester: values.semester,
                    department: values.department,
                    start: values.start,
                    end: values.end,
                    status: values.status,
                    schedule: arrayT,
                    students: []
                });
                alert(JSON.stringify(values, null, 2));
                
            }}
        >
            {(formikProps) => (
                <form autoComplete="off" className="modal-box-classes" onSubmit={formikProps.handleSubmit}>
                    <h2 className="title">Add New Class</h2>
                    <InputLabel id="label">Class ID</InputLabel>
                    <Input type="text" name="classId" className="input-form" value={formikProps.values.classId} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.classId && formikProps.errors.classId}
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

                    {formikProps.values.field === "IT" && <Box>
                        <InputLabel id="label">Subject</InputLabel>
                        <NativeSelect value={formikProps.values.subject} className="select-form" name="subject" onChange={formikProps.handleChange}>
                            <option value="">Select Subject</option>
                            <option value="IT 1">IT 1</option>
                            <option value="IT 2">IT 2</option>
                            <option value="IT 3">IT 3</option>
                        </NativeSelect>
                        <p className="error">
                            {formikProps.touched.subject && formikProps.errors.subject}
                        </p>
                    </Box>}

                    {formikProps.values.field === "Business" && <Box>
                        <InputLabel id="label">Subject</InputLabel>
                        <NativeSelect value={formikProps.values.subject} className="select-form" name="subject" onChange={formikProps.handleChange}>
                            <option value="">Select Subject</option>
                            <option value="Business 1">Business 1</option>
                            <option value="Business 2">Business 2</option>
                            <option value="Business 3">Business 3</option>
                        </NativeSelect>
                        <p className="error">
                            {formikProps.touched.subject && formikProps.errors.subject}
                        </p>
                    </Box>}

                    {formikProps.values.field === "Marketing" && <Box>
                        <InputLabel id="label">Subject</InputLabel>
                        <NativeSelect value={formikProps.values.subject} className="select-form" name="subject" onChange={formikProps.handleChange}>
                            <option value="">Select Subject</option>
                            <option value="Marketing 1">Marketing 1</option>
                            <option value="Marketing 2">Marketing 2</option>
                            <option value="Marketing 3">Marketing 3</option>
                        </NativeSelect>
                        <p className="error">
                            {formikProps.touched.subject && formikProps.errors.subject}
                        </p>
                    </Box>}

                    <InputLabel id="label">Semester</InputLabel>
                    <NativeSelect value={formikProps.values.semester} className="select-form" name="semester" onChange={formikProps.handleChange}>
                        <option value="">Select Semester</option>
                        <option value="Spring 2020">Spring 2020</option>
                        <option value="Summer 2020">Summer 2020</option>
                        <option value="Fall 2020">Fall 2020</option>
                        <option value="Spring 2021">Spring 2021</option>
                        <option value="Summer 2021">Summer 2021</option>
                        <option value="Fall 2021">Fall 2021</option>
                    </NativeSelect>

                    <p className="error">
                        {formikProps.touched.semester && formikProps.errors.semester}
                    </p>

                    <InputLabel id="label">Department</InputLabel>
                    <NativeSelect value={formikProps.values.department} className="select-form" name="department" onChange={formikProps.handleChange}>
                        <option value="">Select Department</option>
                        <option value="Department 1">Department 1</option>
                        <option value="Department 2">Department 2</option>
                        <option value="Department 3">Department 3</option>
                    </NativeSelect>
                    <p className="error">
                        {formikProps.touched.department && formikProps.errors.department}
                    </p>

                    <InputLabel id="label">Start</InputLabel>
                    <Input name="start" type="date" className="input-form" value={formikProps.values.start} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.start && formikProps.errors.start}
                    </p>

                    <InputLabel id="label">End</InputLabel>
                    <Input name="end" type="date" className="input-form" value={formikProps.values.end} onChange={formikProps.handleChange} />
                    <p className="error">
                        {formikProps.touched.end && formikProps.errors.end}
                    </p>

                    <InputLabel id="label">Status</InputLabel>
                    <NativeSelect value={formikProps.values.status} className="select-form" name="status" onChange={formikProps.handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
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