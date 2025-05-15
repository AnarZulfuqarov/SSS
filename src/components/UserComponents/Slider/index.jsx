import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";
import "./index.scss";
import { PROJECT_IMAGES, PROJECT_VIDEOS } from "../../../contants.js";

function Slider({ images = [], openModal }) {
    // Default images for when no images are passed
    const defaultImages = [
        "/src/assets/DetailBanner.jpeg",
        "/src/assets/ContactBanner.jpeg",
        "/src/assets/ServicesBanner.jpeg",
    ];

    // Use provided images or fallback to default images
    const slides = images.length > 0 ? images : defaultImages;

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

    // Determine if the current slide is a video and get the correct source
    const currentSlide = slides[currentIndex];
    const isVideo = currentSlide.endsWith(".webm") || currentSlide.endsWith(".mp4");
    const isDefaultImage = defaultImages.includes(currentSlide);
    const src = isDefaultImage
        ? currentSlide
        : isVideo
            ? PROJECT_VIDEOS + currentSlide
            : PROJECT_IMAGES + currentSlide;

    const handleMediaClick = () => {
        openModal({ src, isVideo });
    };

    return (
        <div className="slider-container">
            {isVideo ? (
                <video
                    src={src}
                    alt={`Slide ${currentIndex}`}
                    className="slider-image"
                    controls
                    autoPlay
                    muted
                    loop
                    onClick={handleMediaClick}
                    style={{ cursor: "pointer" }}
                />
            ) : (
                <img
                    src={src}
                    alt={`Slide ${currentIndex}`}
                    className="slider-image"
                    onClick={handleMediaClick}
                    style={{ cursor: "pointer" }}
                />
            )}
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
    images: PropTypes.arrayOf(PropTypes.string),
    openModal: PropTypes.func,
};

export default Slider;