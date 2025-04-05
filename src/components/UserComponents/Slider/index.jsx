import "./index.scss";
import {useState} from "react";
import image from "/src/assets/DetailBanner.jpeg";
import image2 from "/src/assets/ContactBanner.jpeg";
import image3 from "/src/assets/ServicesBanner.jpeg";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
const images = [
    image,
    image2,
    image3,
];

function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="slider-container">
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="slider-image"
            />
            {/* Sol Ox */}
            <button className="slider-btn slider-btn-left" onClick={handlePrev}>
                <IoIosArrowBack />
            </button>
            {/* Sağ Ox */}
            <button className="slider-btn slider-btn-right" onClick={handleNext}>
                <IoIosArrowForward />
            </button>
        </div>
    );
}

export default Slider;
