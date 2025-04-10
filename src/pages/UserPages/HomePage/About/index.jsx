import "./index.scss";
import { RiArrowRightUpLine } from "react-icons/ri";
import city from "/src/assets/city.png";
import certificate from "/src/assets/certificate.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";                 // AOS idxal edilir
import "aos/dist/aos.css";            // AOS stil faylı idxal olunur
import { useTranslation } from "react-i18next";

function AboutHome() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000,  // Animasiya müddəti (ms)
            once: true       // Hər element yalnız bir dəfə animasiya edilsin
        });
    }, []);

    return (
        <div id={"aboutHome"}>
            <div className={"container"} data-aos="fade-up">
                <div className={"head"}>
                    <div className={"head-left"} data-aos="fade-right">
                        <hr />
                        <h4>{t("aboutHome.head.left")}</h4>
                    </div>
                    <div className={"head-right"} data-aos="fade-left" data-aos-delay="100">
                        <h1>{t("aboutHome.head.right")}</h1>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"} data-aos="fade-right">
                        <div className={"text"}>
                            <h4>{t("aboutHome.text.title")}</h4>
                            <p>{t("aboutHome.text.description")}</p>
                            <div className={"more"} onClick={() => navigate('/about')} data-aos="fade-up" data-aos-delay="200">
                                {t("aboutHome.more.buttonText")}
                                <button onClick={() => navigate('/about')}>
                                    <RiArrowRightUpLine />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"zakir col-6 col-md-6 col-sm-12 col-xs-12"} data-aos="fade-left">
                        <div className={"image"}>
                            <div className={"content"}>
                                <div className={"black box"} data-aos="zoom-in">
                                    <img src={city} alt={t("aboutHome.box.cityAlt")} />
                                    <h3>100<sup>+</sup></h3>
                                    <p>{t("aboutHome.box.projectCount")}</p>
                                </div>
                                <div className={"orange box"} data-aos="zoom-in" data-aos-delay="100">
                                    <img src={certificate} alt={t("aboutHome.box.certificateAlt")} />
                                    <h3>50<sup>+</sup></h3>
                                    <p>{t("aboutHome.box.certificateCount")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutHome;
