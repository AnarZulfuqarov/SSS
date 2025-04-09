import { useState, useEffect } from 'react';
import './index.scss';
import banner from '/src/assets/ServicesBanner.jpeg';
import bannerC from '/src/assets/ContactBanner.jpeg';
import bannerD from '/src/assets/DetailBanner.jpeg';
import { RiArrowRightUpLine } from "react-icons/ri";
import CircleTextWhite from "../../../../components/UserComponents/CircleTextWhite/index.jsx";
import { useNavigate } from "react-router-dom";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import AOS from "aos";                 // AOS idxal edilir
import "aos/dist/aos.css";            // AOS stil faylı idxal olunur
import { useTranslation } from "react-i18next";

const slidesData = [
    {
        image: banner,
        title: 'Birinci Slayd',
        subtitle: 'Slayd açıqlaması',
    },
    {
        image: bannerC,
        title: 'İkinci Slayd',
        subtitle: 'Slayd açıqlaması',
    },
    {
        image: bannerD,
        title: 'Üçüncü Slayd',
        subtitle: 'Slayd açıqlaması',
    },
];

const BannerHome = () => {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slidesData.length;
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000); // Hər 5 saniyədən bir slaydı dəyişir
        return () => clearInterval(interval);
    }, [totalSlides]);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="banner-slider">
            {slidesData.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{
                        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image}) no-repeat center center/cover`,
                    }}
                />
            ))}

            <div className="container">
                <div className="banner-content">
                    <CircleTextWhite />
                    <h1>{t("bannerHome.headline")}</h1>
                </div>
                <div className={"hr"}></div>

                <div className="pagination-dots">
                    {slidesData.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></span>
                    ))}
                </div>
                <div className={"bannerfoot"}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
                        <VscWorkspaceTrusted style={{ color: "#76FF37", width: "24px", height: "24px" }} />
                        <div>
                            <div style={{
                                width: "80%",
                                color: '#EE9026',
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: 'space-between',
                                gap: "5px",
                                marginBottom: "5px"
                            }}>
                                {/* Burada ulduzlar və ya digər dekorativ elementlər yerləşə bilər */}
                            </div>
                            <p>{t("bannerHome.experience")}</p>
                        </div>
                    </div>
                    <div className={"more"}>
                        {t("bannerHome.moreButton")}
                        <button onClick={() => navigate("/portfolio")}>
                            <RiArrowRightUpLine />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerHome;
