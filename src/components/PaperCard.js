import React, { useState, useEffect} from 'react'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getDestiPlaces } from '../redux/actions/PlaceAction'


const PaperCard = (props) => {
    const { topDestiLists, name, btnName, func } = props
    const [page, setPage] = useState(2)
    const dispatch = useDispatch()
    const loadData = () => {
        setPage( page + 1)
        dispatch(getDestiPlaces(page))
    }
    const topDestiListing = topDestiLists.length > 0 ? 
    (
        <>
            {topDestiLists.slice(0, 10).map(item => {
                return(
                    <Paper className="desti-card" key={item._id} square >
                        {
                            item.images > 0 ?
                            <img src={item.images} alt="topDestination1" /> :
                            <img src='https://i.ibb.co/RNj8w8D/Yatribhet.jpg' alt="topDestination" /> 
                            
                        }
                        <Typography variant="subtitle2" gutterBottom>
                            {item.name}
                        </Typography>
                    </Paper>
                )
            })}
        </>
    ) : 
    (
        <p>Loading...</p>
    )
    return (
        <>
            <div className="top-destination mt-4">
                <div className="pb-4 card-header flex items-center justify-between">
                    <Typography variant="h6" noWrap>
                        {name}
                    </Typography>
                    <Link to="/topDestination" color="warning.main">
                        <Button color="primary" onClick={func} > {btnName} </Button>
                    </Link>
                </div>
                    <div className={classNames("desti-items")} >
                        {topDestiListing}
                    </div>
            </div>
        </>
    )
}

export default PaperCard
