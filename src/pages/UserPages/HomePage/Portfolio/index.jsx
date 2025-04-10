import React, { useRef } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import ProjectsCardTest from '../../../../components/UserComponents/ProjectsCardTest/index.jsx';
import './index.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const PortfolioHome = () => {
    const { t } = useTranslation();
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.5
                }
            },
            {
                // 600px-dən kiçik ekranlarda 1.2 kimi dəyər
                // kartların nisbətən daha böyük görünməsinə səbəb olur
                breakpoint: 600,
                settings: {
                    slidesToShow: 1.2
                }
            },
        ],
    };

    return (
        <section id="portfolioHome">
            <div className="container">
                <header className="head">
                    <div className="head__left" data-aos="fade-right">
                        <hr />
                        {/* i18next JSON açarını istifadə edirik */}
                        <h4>{t('portfolioHome.projects')}</h4>
                    </div>
                    <div className="head__right" data-aos="fade-left" data-aos-delay="100">
                        <h1>{t('portfolioHome.title')}</h1>
                    </div>
                </header>

                <div className="slider-wrapper" data-aos="fade-up">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        <ProjectsCardTest />
                        <ProjectsCardTest />
                        <ProjectsCardTest />
                        <ProjectsCardTest />
                        <ProjectsCardTest />
                    </Slider>

                    {/* Naviqasiya düymələri slider-in altında, sola hizalı */}
                    <div className="slider-nav">
                        <button
                            onClick={() => sliderRef.current.slickPrev()}
                            className="nav-button prev"
                        >
                            <HiArrowLeft />
                        </button>
                        <button
                            onClick={() => sliderRef.current.slickNext()}
                            className="nav-button next"
                        >
                            <HiArrowRight />
                        </button>
                    </div>
                    <div style={{display: "flex", justifyContent: "end"}}>
                        <div className="more" onClick={() => navigate('/portfolio')} data-aos="fade-up" data-aos-delay="200">
                            {t('portfolioHome.viewAll')}
                            <button onClick={() => navigate('/portfolio')}>
                                <RiArrowRightUpLine />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioHome;
