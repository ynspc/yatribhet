import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { login } from '../redux/actions/AuthAction';
import logo from '../assets/img/logo.svg'

import {
    Paper,
    Checkbox,
    TextField,
    CssBaseline,
    FormControlLabel,
    Box,
    Grid,
    Button,
    makeStyles,
    Typography
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = () => {
    let message;
    const [serverMessage, setServerMessage] = useState({
        message: '',
        code: 0
    });
    const [input, setInput] = useState({
        userName: "",
        password: "",
        deviceId: "123456",
        deviceToken: "98758567"
    })
    const dispatch = useDispatch();

    const submitHandler = event => {
        event.preventDefault();
        dispatch(login(input));
    };

    message = useSelector(state => state.error);
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
    console.log(isAuthenticated);

    useEffect(() => {
        setServerMessage({
            ...serverMessage,
            message: message.message,
            code: message.code
        });

    }, [message]);

    const changeHandler = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        flex: {
            height: '100vh',
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
            height: '100vh',
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
    if(isAuthenticated){
        return <Redirect to='/home'/>
    }
    return (
        <div className="form">
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid className={classes.flex} item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <div className="form-input">
                            <img src={logo} alt="logo" />
                            <Typography variant="h5" gutterBottom>
                                <b>Login</b>
                            </Typography>
                            { serverMessage.code !== 0 ? <p> { serverMessage.message } </p> : null }
                            <form onSubmit={submitHandler} className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="userName"
                                    value={input.userName}
                                    onChange={changeHandler}
                                    label="Username"
                                    type="text"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password" value={input.password} onChange={changeHandler}
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                />

                                <Box mt={1} mb={2}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Keep me logged in"
                                    />
                                </Box>

                                <Button type="submit" value="Login" fullWidth variant="contained" color="primary">
                                    Login
                                </Button>
                                <Grid container direction="column" align="center" >
                                    <Grid item >
                                        <Box mt={2}>
                                            Don't have an account? &nbsp;
                                            <Link to="/register" color="warning.main">
                                                Sign Up
                                            </Link>
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Box mt={1}>
                                            <Link to="/forgot-password" variant="body2">
                                                Forgot password?
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
                            Welcome to <br /> Yatribhet
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

export default Login;
