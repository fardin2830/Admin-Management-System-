import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const properties = {
    prevArrow: <button className='hidden'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" /></svg></button>,
    nextArrow: <button className='hidden'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z" /></svg></button>
}

const Slider = () => {

    const images = [
        {
            img: "https://i.ibb.co/xGxd9Q8/emplye.jpg",
            title: "Join as employee",
            link: "/joinemployee"
        },
        {
            img: "https://i.ibb.co/kQzcgTm/hrbg.jpg",
            title: "Join as HR/ADMIN",
            link: "/joinadmin"
        }
    ];

    return (
        <div className='w-96 md:w-full h-32 lg:h-96  mx-auto'>
            <Zoom scale={0.0000000001} indicators={true} {...properties}>
                {images.map((each, index) => (
                    <div key={index}>
                        <img className='w-full h-32 lg:h-96 relative' style={{ objectFit: "cover"}} alt="Slide Image" src={each.img} />
                        <span className=' h-full -mt-32 lg:-mt-96 absolute w-full bg-[#00000061]'></span>
                        <Link to={each.link}><Button className='z-10 absolute ml-10 lg:ml-28 bg-[#DCAFA4] text-black -mt-16 lg:-mt-32' variant="contained">{each.title}</Button></Link>
                    </div>
                ))}
            </Zoom>
        </div>
    );
};

export default Slider;