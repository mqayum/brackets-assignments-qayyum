import Image from "next/image";
import {FaChevronRight, FaChevronLeft} from "react-icons/fa"

import sliderImage1 from "../public/images/slider/slider-3.jpg"
import sliderImage2 from "../public/images/slider/slider-2.jpg"
import sliderImage3 from "../public/images/slider/slider-1.jpg"
import Link from "next/link";

const Carousel = () => {
    const default_width = 1200
    const default_height = 700
    return (
        <div className="mt-5 carousel w-full h-96">
            <div id="slide1" className="carousel-item relative w-full">
                <Image src={sliderImage1} className="w-full" width={default_width} height={default_height} alt="Slider Image 1" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <Link href="#slide3" className="btn btn-secondary btn-circle btn-outline"><FaChevronLeft/></Link>
                    <Link href="#slide2" className="btn btn-secondary btn-circle btn-outline"><FaChevronRight/></Link>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <Image src={sliderImage2} className="w-full" width={default_width} height={default_height} alt="Slider Image 2" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <Link href="#slide1" className="btn btn-secondary btn-circle btn-outline"><FaChevronLeft/></Link>
                    <Link href="#slide3" className="btn btn-secondary btn-circle btn-outline"><FaChevronRight/></Link>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <Image src={sliderImage3} className="w-full" width={default_width} height={default_height} alt="Slider Image 3" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <Link href="#slide2" className="btn btn-secondary btn-circle btn-outline"><FaChevronLeft/></Link>
                    <Link href="#slide1" className="btn btn-secondary btn-circle btn-outline"><FaChevronRight/></Link>
                </div>
            </div>
        </div>
    )
}
export default Carousel