import { Typography } from '@material-ui/core';
import React from 'react'
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/AuthAction';
import RoomIcon from '@material-ui/icons/Room';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import HotelIcon from '@material-ui/icons/Hotel';
import BannerImg from '../assets/img/phewa.jpg'
import NepalMap from '../assets/img/nepalMap.svg'
import AcUnitIcon from '@material-ui/icons/AcUnit';


const PlaceDetail = (props) => {
    const aas = parseInt(props.match.params.id)
    const topDestiLists  = useSelector(state => state.topDestination.topDestiLists)
    const DestiItem = topDestiLists.filter( list => list._id === props.match.params.id )
    // const productObject = Object.assign({}, ...DestiItem)
    // console.log(productObject);
    console.log(DestiItem);
    console.log(aas);
    console.log(topDestiLists);
    return (
        <div className="container mx-auto">
            <div className="place-detail">
                <Typography variant="h3" className="pt-10 pb-1" fontWeight="fontWeightBold">
                    <Box fontWeight="fontWeightBold">
                        Phewa Lake, Pokhara
                    </Box>  
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Gandaki Province
                </Typography>
                <img src={BannerImg} alt="PhewaLake" className="w-full py-5" />
                <div className="flex">
                    <div class="w-2/3 p-6">
                        <Typography variant="body1" gutterBottom>
                            <Box lineHeight={1.8} className="mb-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo similique fuga, quasi ipsum praesentium numquam nam ut culpa nulla reprehenderit ullam fugiat, suscipit aperiam blanditiis labore sunt facere, eius aliquid.
                            </Box>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <Box lineHeight={1.8} >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo similique fuga, quasi ipsum praesentium numquam nam ut culpa nulla reprehenderit ullam fugiat, suscipit aperiam blanditiis labore sunt facere, eius aliquid.
                            </Box>
                        </Typography>
                        <div className="place-detail-map pt-10 pb-10">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14062.941241861554!2d83.93898859450442!3d28.215353359003633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39959520918498bb%3A0xfca6adfa336fd6c7!2sPhewa%20Lake!5e0!3m2!1sen!2snp!4v1608693794368!5m2!1sen!2snp" width="100%" height="500px" ></iframe>
                        </div>
                        <ul className="outline-itinerary my-7">
                            <li className="mb-3">
                                <Typography variant="h6" gutterBottom>
                                    <Box fontWeight="fontWeightBold">
                                        Day 1: Arrival to Kathmandu (1,350m)
                                    </Box>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <Box lineHeight={1.8} >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima minus tempore obcaecati voluptatum aliquid temporibus ducimus animi debitis ab? Facere voluptas ipsam, sunt et incidunt nostrum animi ratione minima sed?
                                    </Box>
                                </Typography>
                                <ul className="place-information flex py-3">
                                    <li className="pr-5">
                                        <span color="primary"><RoomIcon color="primary" /></span> Kathmandu
                                    </li>
                                    <li className="pr-5">
                                        <span color="primary"><FilterHdrIcon color="primary" /></span> 1,350m
                                    </li>
                                    <li className="pr-5">
                                        <span color="primary"><HotelIcon color="primary" /></span> Hotel
                                    </li>
                                </ul>
                            </li>
                            <li className="mb-3">
                                <Typography variant="h6" gutterBottom>
                                    <Box fontWeight="fontWeightBold">
                                        Day 2: Fly/Drive to Pokhara
                                    </Box>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <Box lineHeight={1.8} >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima minus tempore obcaecati voluptatum aliquid temporibus ducimus animi debitis ab? Facere voluptas ipsam, sunt et incidunt nostrum animi ratione minima sed?
                                    </Box>
                                </Typography>
                                <ul className="place-information flex py-3">
                                    <li className="pr-5">
                                        <span color="primary"><RoomIcon color="primary" /></span> Kathmandu
                                    </li>
                                    <li className="pr-5">
                                        <span color="primary"><FilterHdrIcon color="primary" /></span> 1,350m
                                    </li>
                                    <li className="pr-5">
                                        <span color="primary"><HotelIcon color="primary" /></span> Hotel
                                    </li>
                                </ul>
                            </li>
                            <li className="mb-3">
                                <Typography variant="h6" gutterBottom>
                                    <Box fontWeight="fontWeightBold">
                                        Day 3: Drive to Nayapul and trek to Hike
                                    </Box>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <Box lineHeight={1.8} >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima minus tempore obcaecati voluptatum aliquid temporibus ducimus animi debitis ab? Facere voluptas ipsam, sunt et incidunt nostrum animi ratione minima sed?
                                    </Box>
                                </Typography>
                                <ul className="place-information flex py-3">
                                    <li className="pr-5">
                                        <span color="primary"><RoomIcon color="primary" /></span> Kathmandu
                                    </li>
                                    <li className="pr-5">
                                        <span color="primary"><FilterHdrIcon color="primary" /></span> 1,350m
                                    </li>
                                    <li className="pr-5">
                                        <span color="primary"><HotelIcon color="primary" /></span> Hotel
                                    </li>
                                </ul>
                            </li>
                            <li className="mb-3">
                                <Typography variant="h6" gutterBottom>
                                    <Box fontWeight="fontWeightBold">
                                        Day 4: Trek to Ghorepani
                                    </Box>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <Box lineHeight={1.8} >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima minus tempore obcaecati voluptatum aliquid temporibus ducimus animi debitis ab? Facere voluptas ipsam, sunt et incidunt nostrum animi ratione minima sed?
                                    </Box>
                                </Typography>
                                <ul className="place-information flex py-3">
                                    <li className="pr-5">
                                        <span color="primary"><RoomIcon color="primary" /></span> Kathmandu
                                    </li>
                                    <li className="pr-5">
                                        <span color="primary"><FilterHdrIcon color="primary" /></span> 1,350m
                                    </li>
                                    <li className="pr-5">
                                        <span color="primary"><HotelIcon color="primary" /></span> Hotel
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="w-1/3 p-6">
                        <img src={NepalMap} alt='logo' />
                        <ul className="mt-10">
                            <li className="mb-6">
                                <Typography>
                                    <span className="block"> <AcUnitIcon color="primary"/> DIFFICULT LEVEL</span>
                                    <Box fontWeight="fontWeightBold" className="pl-8">
                                        Hard
                                    </Box>
                                </Typography>
                            </li>
                            <li className="mb-6">
                                <Typography>
                                    <span className="block"> <AcUnitIcon color="primary"/> GROUP SIZE</span>
                                    <Box fontWeight="fontWeightBold" className="pl-8">
                                        02 - 16
                                    </Box>
                                </Typography>
                            </li>
                            <li className="mb-6">
                                <Typography>
                                    <span className="block"> <AcUnitIcon color="primary"/> HIGEST ALTITUDE</span>
                                    <Box fontWeight="fontWeightBold" className="pl-5">
                                    5,345 Meters
                                    </Box>
                                </Typography>
                            </li>
                            <li className="mb-6">
                                <Typography>
                                    <span className="block"> <AcUnitIcon color="primary"/> START LOCATION</span>
                                    <Box fontWeight="fontWeightBold" className="pl-8">
                                    Lukla (2,869m)
                                    </Box>
                                </Typography>
                            </li>
                            <li className="mb-6">
                                <Typography>
                                    <span className="block"> <AcUnitIcon color="primary"/> FINISH LOCATION</span>
                                    <Box fontWeight="fontWeightBold" className="pl-8">
                                    Lukla (2,869m)
                                    </Box>
                                </Typography>
                            </li>
                            <li className="mb-6">
                                <Typography>
                                    <span className="block"> <AcUnitIcon color="primary"/> ACCOMMODATION</span>
                                    <Box fontWeight="fontWeightBold" className="pl-8">
                                    2 star hotel in cities & tea house / Lodge on trek
                                    </Box>
                                </Typography>
                            </li>
                            <li className="mb-6">
                                <Typography>
                                    <span className="block"> <AcUnitIcon color="primary"/> BEST SEASON</span>
                                    <Box fontWeight="fontWeightBold" className="pl-8">
                                    Anytime Except For July-August
                                    </Box>
                                </Typography>
                            </li>
                            <li className="mb-6">
                                <Typography>
                                    <span className="block"> <AcUnitIcon color="primary"/> COST</span>
                                    <Box fontWeight="fontWeightBold" className="pl-8">
                                    Rs 10K
                                    </Box>
                                </Typography>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceDetail
