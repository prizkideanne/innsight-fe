import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({ children }) {
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,

    }
    return (
        <div>

            <Slider  {...setting}>
                <div key={1} className='w-full h-60 bg-red-700'>
                    <p>Hello</p>
                </div>
                <div key={2} className='w-full h-60 bg-blue-700'>
                    <p>Hello</p>
                </div>
                <div key={3} className='w-full h-60 bg-green-700'>
                    <p>Hello</p>
                </div>
            </Slider>
        </div>

    )
}

export default Carousel
