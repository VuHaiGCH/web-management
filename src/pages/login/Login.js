import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Formik } from "formik";
import * as yup from "yup";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import './styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebase from '../../Config/fbConfig';
import { useHistory } from 'react-router';

const theme = createTheme();

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(3, 'Password should be of minimum 3 characters length')
    .required('Password is required'),

});

export default function Login(props) {
  const history = useHistory();
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images1.content-hci.com/commimg/video/CH/myhc_279666.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Formik
            initialValues={{
              email: null,
              password: null,
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                  // Signed in
                  console.log(values)
                  props.history.push('/app/dashboard')
                })
                .catch((error) => {
                  console.log(values)
                  var errorCode = error.code;
                  var errorMessage = error.message;
                });
            }}
          >
            {(formikProps) => (
              <form autoComplete="off" className="modal-box" onSubmit={formikProps.handleSubmit}>
                <h2 className="title">Add New Student</h2>
                <InputLabel id="label">Email</InputLabel>
                <Input type="text" name="email" className="input-form" value={formikProps.values.email} onChange={formikProps.handleChange} />
                <p className="error">
                  {formikProps.touched.email && formikProps.errors.email}
                </p>

                <InputLabel id="label">Password</InputLabel>
                <Input type="password" name="password" className="input-form" value={formikProps.values.password} onChange={formikProps.handleChange} />
                <p className="error">
                  {formikProps.touched.password && formikProps.errors.password}
                </p>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}