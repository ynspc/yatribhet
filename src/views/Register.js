import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Alert, AlertTitle} from '@material-ui/lab';
import {
    Box,
    Grid,
    Paper,
    Select,
    Button,
    Checkbox,
    TextField,
    makeStyles,
    InputLabel,
    Typography,
    FormControl,
    CssBaseline
} from '@material-ui/core';

import {register} from '../redux/actions/AuthAction';
import logo from '../assets/img/logo.svg';

const Register = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userName: "",
        gender: "",
        termsAndCondition: false
    });

    /*const ErrorMessage = useSelector(state => state.ErrorReducer.message);
    const SuccessMessage = useSelector(state => state.AuthReducer.message);*/
    const dispatch = useDispatch();

    const submitHandler = event => {
        event.preventDefault();
        dispatch(register(form))
    }
    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.type === 'checkbox' ?
                event.target.checked :
                event.target.value
        })
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'space-evenly',
        },
        flex: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        image: {
            backgroundImage: 'linear-gradient(rgb(250 100 0 / 40%), rgb(250 100 0 / 60%)), url(https://i.ibb.co/bF3jn6P/login.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '100px 50px',
            display: 'flex',
        },
        paper: {
            margin: theme.spacing(5, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    return (
        <div className="form">
            {/*<div className="alert-msg">
                {SuccessMessage ? <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {SuccessMessage}
                </Alert> : ''}
                {ErrorMessage ? <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {ErrorMessage}
                </Alert> : ''}

            </div>*/}
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid className={classes.flex} item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <div className="form-input">
                            <img src={logo} alt="logo"/>
                            <Typography variant="h5" gutterBottom>
                                <b>Signin</b>
                            </Typography>
                            <p>It's free to join and gain full access to explore, meet, travel.</p>
                            <form onSubmit={submitHandler} className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={changeHandler}
                                    label="Firstname"
                                    type="text"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={changeHandler}
                                    label="Lastname"
                                    type="text"
                                />

                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
                                    <Select
                                        native
                                        value={form.gender}
                                        onChange={changeHandler}
                                        label="Gender"
                                        inputProps={{
                                            name: 'gender',
                                            id: 'outlined-age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value=""/>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Select>
                                </FormControl>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                    label="Email"
                                    autoComplete="email"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                />
                                 <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="userName"
                                    value={form.userName}
                                    onChange={changeHandler}
                                    label="Username"
                                    type="text"
                                />

                                <div>
                                    <Checkbox
                                        checked={form.termsAndCondition}
                                        color="primary"
                                        name="termsAndCondition"
                                        onChange={changeHandler}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        I have read the
                                        {' '}
                                        <Link
                                            color="secondary"
                                            to="#"
                                            underline="always"
                                            variant="h6"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </Typography>
                                </div>

                                <Button type="submit" value="Login" fullWidth variant="contained" color="primary">
                                    Signin
                                </Button>
                                <Grid container direction="column" align="center">
                                    <Grid item>
                                        <Box mt={2}>
                                            Already have an account? &nbsp;
                                            <Link to="/login" color="warning.main">
                                                Log in
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={false} sm={4} md={6} className={classes.image}>
                    <div className="form-img-content">
                        <Typography variant="h2" gutterBottom>
                            Get Started With <br/> Yatribhet
                        </Typography>
                        <div className="form-social-links">
                            <ul>
                                <li><Link href="#" to=""><FontAwesomeIcon icon={['fab', 'facebook']}/></Link></li>
                                <li><Link href="#" to=""><FontAwesomeIcon icon={['fab', 'instagram']}/></Link></li>
                                <li><Link href="#" to=""><FontAwesomeIcon icon={['fab', 'linkedin']}/></Link></li>
                            </ul>
                            <Typography vvariant="h2" gutterBottom>
                                Use your anyone existing profile
                            </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Register
