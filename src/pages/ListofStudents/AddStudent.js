import React from 'react';
import { Formik } from "formik";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as yup from "yup";
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import './AddStudent.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import firebase from '../../Config/fbConfig';

const validationSchema = yup.object({
    name: yup
        .string()
        .nullable()
        .required("Name is required"),
    birthday: yup
        .string()
        .nullable()
        .required("Birthday is required"),
    field: yup
        .string()
        .nullable()
        .required("Fields is required"),
    joinYear: yup
        .number()
        .required("Join Year is required")
        .positive()
        .integer(),
    userId: yup
        .string()
        .nullable()
        .required("ID is required"),
    email: yup
        .string()
        .nullable()
        .email('Enter a valid email')
        .required("Email type is required"),
    password: yup
        .string('Enter your password')
        .min(3, 'Password should be of minimum 3 characters length')
        .required('Password is required'),
    avatar: yup
        .string()
        .nullable()
        .required("Avatar is required"),
    status: yup
        .string()
        .nullable()
        .required("Status is required"),

});

export default function AddStudent() {
    const [value, setValue] = React.useState(null);

    return (
        <Formik
            initialValues={{
                name: null,
                userId: null,
                birthday: null,
                avatar: null,
                field: null,
                joinYear: null,
                email: null,
                password: null,
                status: null
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                firebase.firestore().collection('students').add(values);
                firebase.auth().createUserWithEmailAndPassword(
                    values.email, 
                    values.password
                  )
                alert(JSON.stringify(values, null, 2));
                // history.goBack();
            }}
        >
            {(formikProps) => (
                <form autoComplete="off" className="modal-box-students" onSubmit={formikProps.handleSubmit}>
                    <h2 className="title">Add New Student</h2>
                    <Box sx={{ flexGrow: 1, marginTop:3 }}>
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
                                <InputLabel id="label">Birthday</InputLabel>
                                <Input type="date" name="birthday" className="input-form" value={formikProps.values.birthday} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.birthday && formikProps.errors.birthday}
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="label">Avatar</InputLabel>
                                <Input name="avatar" type="file" className="input-form" value={formikProps.values.avatar} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.avatar && formikProps.errors.avatar}
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
                                </p>                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel id="label">Join Year</InputLabel>
                                <Input name="joinYear" className="input-form" value={formikProps.values.joinYear} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.joinYear && formikProps.errors.joinYear}
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="label">Email</InputLabel>
                                <Input name="email" className="input-form" value={formikProps.values.email} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.email && formikProps.errors.email}
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="label">Password</InputLabel>
                                <Input name="password" className="input-form" value={formikProps.values.password} onChange={formikProps.handleChange} />
                                <p className="error">
                                    {formikProps.touched.password && formikProps.errors.password}
                                </p>
                            </Grid>
                        </Grid>
                    </Box>


                    <InputLabel id="label">Status</InputLabel>
                    <NativeSelect value={formikProps.values.status} name="status" onChange={formikProps.handleChange}>
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