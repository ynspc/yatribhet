import { Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MP4 from '../assets/img/top-attractions.mp4'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getDestiPlaces } from '../redux/actions/PlaceAction'
import { Link, NavLink, Redirect } from 'react-router-dom';
import SeeAll from '../components/SeeAll';

const TopDestination = (props) => {
    const { topDestiLists, reload } = useSelector(state => state.topDestination)
    const [page, setPage] = useState(2)
    const dispatch = useDispatch()
    const loadData = () => {
        setPage(page + 1)
        dispatch(getDestiPlaces(page))
    }
    return (
        <React.Fragment>
            <section className="destination-video">
                <Typography variant="h2" noWrap>
                    Top Destination
                </Typography>
                <div className="video-player">
                    <video loop="true" autoplay="true" muted playsinline>
                        <source src={MP4} type="video/mp4" />
                    </video>
                </div>
            </section>
            <section className="top-destionation pt-20 pb-20">
                <div className="container mx-auto">
                    <div className="w-1/2 pb-16">
                        <Typography variant="h5" gutterBottom>
                            For holidays and travel in Nepal, you will find all the current information here about business hours and the status of Nepal tourism providers.
                        </Typography>
                    </div>
                    {/* <SeeAll /> */}
                    <div className="see-all-page">
                        {
                            topDestiLists.length > 0 ? 
                            (
                                <InfiniteScroll
                                    dataLength={topDestiLists.length}
                                    next={loadData}
                                    hasMore={true}
                                    loader={<h4>Loading...</h4>}
                                >
                                    {topDestiLists.map(item => {
                                        return(
                                        <div className="see-all-item" key={item._id}>
                                            <NavLink to={'/PlaceDetail/' + item._id}>
                                                <div className="see-all-content">
                                                    <Typography className="text-white font-bold" variant="h4" Wrap>
                                                    {item.name}
                                                    </Typography>
                                                </div>
                                                <div className="see-all-background">
                                                    {/* <img src='https://i.ibb.co/jWmkR7h/kalle-kortelainen-6-F-u-GWod7-Xk-unsplash.jpg' alt="topDestination"/> */}
                                                    {
                                                        item.images > 0 ?
                                                        <img src={item.images} alt="topDestination1" /> :
                                                        <img className="img-fluid" src='https://i.ibb.co/RNj8w8D/Yatribhet.jpg' alt="topDestination" /> 
                                                    }
                                                </div>
                                            </NavLink>
                                        </div>
                                        )
                                    })}
                                </InfiniteScroll>
                            ) : 
                            (
                                <p>List is EMPTY.</p>
                            )
                        }
                    </div>
                </div>
                {/* <div className="container max-w-5xl mx-auto m-8">
                    {
                        topDestiLists.length > 0 ? 
                        (
                            <InfiniteScroll
                                dataLength={topDestiLists.length}
                                next={loadData}
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                            >
                                {topDestiLists.map(item => {
                                    return(
                                    <div className="flex items-center" key={item.id}>
                                        <div className="w-5/6 sm:w-1/2 p-6">
                                            <Typography className="leading-none pb-4" variant="h3" Wrap>
                                                {item.name}
                                            </Typography>
                                            <Typography className="font-medium pb-5" variant="subtitle1" gutterBottom>
                                                {item.description}
                                            </Typography>
                                            <a href="#">Read More</a>
                                        </div>
                                        <div className="w-full sm:w-1/2 p-6">
                                            {
                                                item.images > 0 ?
                                                <img src={item.images} alt="topDestination1" /> :
                                                <img className="img-fluid" src='https://i.ibb.co/RNj8w8D/Yatribhet.jpg' alt="topDestination" /> 
                                            }
                                        </div>
                                    </div>
                                    )
                                })}
                            </InfiniteScroll>
                        ) : 
                        (
                            <p>List is EMPTY.</p>
                        )
                    }
                </div> */}
            </section>
        </React.Fragment>
    )
}

export default TopDestination
