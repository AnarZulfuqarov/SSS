import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";
import "./index.scss";
import { PROJECT_IMAGES, PROJECT_VIDEOS } from "../../../contants.js";
import { Image } from "antd";
import {useTranslation} from "react-i18next";

function Slider({ images = [], openModal }) {
    const defaultImages = [
        "/src/assets/DetailBanner.jpeg",
        "/src/assets/ContactBanner.jpeg",
        "/src/assets/ServicesBanner.jpeg",
    ];

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

    const currentSlide = slides[currentIndex];
    const isVideo = currentSlide.endsWith(".webm") || currentSlide.endsWith(".mp4");
    const isDefaultImage = defaultImages.includes(currentSlide);
    const src = isDefaultImage
        ? currentSlide
        : isVideo
            ? PROJECT_VIDEOS + currentSlide
            : PROJECT_IMAGES + currentSlide;

    const handleVideoClick = () => {
        if (isVideo && openModal) {
            openModal(src);
        }
    };

    const {t} = useTranslation();

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
                    onClick={handleVideoClick}
                    style={{ cursor: "pointer" }}
                />
            ) : (
                <div className="image-wrapper">
                    <Image
                        src={src}
                        alt={`Slide ${currentIndex}`}
                        className="slider-image"
                        preview={{
                            mask: <div>{t('bax')}</div>,
                        }}
                    />
                </div>
            )}
            <button className="slider-btn slider-btn-left" onClick={handlePrev}>
                <IoIosArrowBack />
            </button>
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