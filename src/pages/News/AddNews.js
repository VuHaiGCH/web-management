import React from 'react';
import { Formik } from "formik";
import InputLabel from '@material-ui/core/InputLabel';
import * as yup from "yup";
import Button from '@mui/material/Button';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './AddNews.css'
import firebase from '../../Config/fbConfig';


const validationSchema = yup.object({
    title: yup
    .string()
    .nullable()
    .required("Title is required"),
    content: yup
        .string()
        .nullable()
        .required("content is required"),
});

export default function AddNews() {
    const [value, setValue] = React.useState(null);

    return (
        <Formik
            initialValues={{
                title: null,
                content: null,
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                const propRef = firebase.firestore().collection('news').add(
                    {title: values.title,
                    content: values.content,
                    postTime: Date.now()
                    }
                );
                alert(JSON.stringify(values, null, 2));
                // history.goBack();
            }}
        >
            {(formikProps) => (
                <form autoComplete="off" className="modal-box-news" onSubmit={formikProps.handleSubmit}>
                    <h2 className="title">Add News</h2>
                    <InputLabel id="label">Title of News</InputLabel>
                    <Input type="text" name="title" value={formikProps.values.title} onChange={formikProps.handleChange} />

                    <p className="error">
                        {formikProps.touched.title && formikProps.errors.title}
                    </p>

                    <InputLabel id="label">Content of News</InputLabel>
                    <TextareaAutosize maxRows={5} style={{height:"200px"}} name="content" className="input-form-news" value={formikProps.values.content} onChange={formikProps.handleChange}
                    />
                    <p className="error">
                        {formikProps.touched.content && formikProps.errors.content}
                    </p>

                    <Button variant="contained" color="success" type="submit" className="submitButton">
                        Submit
                    </Button>
                </form>
            )}
        </Formik>
    );
}