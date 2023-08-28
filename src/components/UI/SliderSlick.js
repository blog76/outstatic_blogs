/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderSlick = ({ latest }) => {
    const router = useRouter();
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrow: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        centermargin: "50px",
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };

    return (
        <Slider {...settings}>
            {latest.map((item, ind) => (
                <div
                    key={ind}
                    className="bg-white border border-gray-200 rounded-lg shadow text-dark mt-5 sm:mt-0"
                >
                    <a href="#">
                        <img
                            className="rounded-t-lg w-full h-[200px]"
                            src={item.coverImage}
                            alt=""
                        />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-black">
                                {item.title.slice(0, 18)}
                                {item.title.length < 15 ? "" : "...."}
                            </h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {item.description}
                        </p>
                        <div
                            onClick={() => router.push(`/category/latests/${item.slug}`)}
                            href="#"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Read more
                            <svg
                                className="w-3.5 h-3.5 ml-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default SliderSlick