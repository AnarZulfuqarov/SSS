import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";
import "./index.scss";
import {PROJECT_IMAGES} from "../../../contants.js";

function Slider({ images = [] }) {
    // If no images are passed, you can define some default images.
    const slides = images.length > 0 ? images : [
        "/src/assets/DetailBanner.jpeg",
        "/src/assets/ContactBanner.jpeg",
        "/src/assets/ServicesBanner.jpeg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="slider-container">
            <img
                src={PROJECT_IMAGES + slides[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="slider-image"
            />
            {/* Left Arrow */}
            <button className="slider-btn slider-btn-left" onClick={handlePrev}>
                <IoIosArrowBack />
            </button>
            {/* Right Arrow */}
            <button className="slider-btn slider-btn-right" onClick={handleNext}>
                <IoIosArrowForward />
            </button>
        </div>
    );
}

Slider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string)
};

export default Slider;
