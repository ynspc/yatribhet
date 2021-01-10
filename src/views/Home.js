import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, NavLink, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PaperCard from '../components/PaperCard';
import { getDestiPlaces } from '../redux/actions/PlaceAction'
import { logout } from '../redux/actions/AuthAction'
import Typography from '@material-ui/core/Typography';
import { ReactComponent as HomeIcon } from '../assets/img/Home.svg'
import { ReactComponent as MultipleUsersIcon } from '../assets/img/multiple-users.svg'
import { ReactComponent as VideoIcon } from '../assets/img/video.svg'
import { ReactComponent as WorldIcon } from '../assets/img/world.svg'
import { ReactComponent as LogoutIcon } from '../assets/img/log-out.svg'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
}))
const Home = () => {
    const classes = useStyles();
    const {topDestiLists, reload} = useSelector(state => state.topDestination)
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
    console.log(topDestiLists);
    console.log(reload);
    const dispatch = useDispatch()
    
    const accessToken = localStorage.getItem('accessToken')
   
    useEffect(() => {
        if(isAuthenticated && reload){
            dispatch(getDestiPlaces())
        }
    }, [reload])

    let logedIn = true
    if(accessToken == null){
         logedIn = false
    }

    const LogoutHandler = () => {
        dispatch(logout())
      }

    if(logedIn === false || isAuthenticated === false){
        return <Redirect to='/login' />
    }

    // const redirectTopDesti = () => {
    //     alert('hi')
    //     return <Redirect to='/topDestination' />
    // }

    return (
        <div className='p-5'>
            <Grid container className={classes.root} spacing={2}>
                <Grid item lg={1}>
                    <div className="side-menu-bar">
                        <div className="top-navbar">
                            <NavLink to='/home'>
                                <HomeIcon className='home__icon'/>
                                <Typography variant="subtitle2" gutterBottom>Home</Typography>
                            </NavLink>
                            <NavLink to='/group'>
                                <MultipleUsersIcon className='home__icon'/>
                                <Typography variant="subtitle2" gutterBottom>Group</Typography>
                            </NavLink>
                            <NavLink to='/watch'>
                                <VideoIcon className='home__icon'/> 
                                <Typography variant="subtitle2" gutterBottom>Watch</Typography>
                            </NavLink>
                            <NavLink to='/explore'>
                                <WorldIcon className='home__icon'/> 
                                <Typography variant="subtitle2" gutterBottom>Explore</Typography>
                            </NavLink>
                           
                        </div>
                            <NavLink to='/login' onClick={LogoutHandler}>
                                <LogoutIcon className='home__icon'/> 
                                <Typography variant="subtitle2" gutterBottom>Log Out</Typography>
                            </NavLink>
                    </div>
                </Grid>
                <Grid item lg={7}>
                    a
                </Grid>
                <Grid item lg={4}>
                    <PaperCard topDestiLists={topDestiLists} name="Top Destination" btnName="See All" />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
