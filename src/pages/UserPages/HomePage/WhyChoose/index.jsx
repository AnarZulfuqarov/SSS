import React, { useEffect } from "react";
import "./index.scss";
import why from '/src/assets/why.jpeg';
import kran from "/src/assets/kran.png";
import AOS from "aos";                 // AOS idxal edilir
import "aos/dist/aos.css";            // AOS stil faylı idxal olunur
import { useTranslation } from "react-i18next";

function WhyChoose() {
    const { t } = useTranslation();

    useEffect(() => {
        AOS.init({
            duration: 1000,  // Animasiya müddəti (ms)
            once: true       // Hər element yalnız bir dəfə animasiya edilsin
        });
    }, []);

    return (
        <div id={"whyChoose"}>
            <div className={"container"} data-aos="fade-up">
                <div className={"head"}>
                    <div className={"head-left"} data-aos="fade-right">
                        <hr />
                        <h4>{t("whyChoose.head.left")}</h4>
                    </div>
                    <div className={"head-right"} data-aos="fade-left" data-aos-delay="100">
                        <h1>{t("whyChoose.head.right")}</h1>
                    </div>
                    <img src={kran} alt={t("whyChoose.head.kranAlt")} data-aos="zoom-in" data-aos-delay="200" />
                </div>
            </div>
            <div className={"whyChoose"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-6 col-md-12 col-sm-12 col-xs-12"} data-aos="fade-right">
                            <div className={"image"}>
                                <img src={why} alt={t("whyChoose.imageAlt")} />
                            </div>
                        </div>
                        <div className={"col-6 col-md-12 col-sm-12 col-xs-12"} data-aos="fade-left">
                            <div className={"text"}>
                                <h2>{t("whyChoose.text.title")}</h2>
                                <p>{t("whyChoose.text.description")}</p>
                                <div className="row" data-aos="fade-up" data-aos-delay="150">
                                    <div className="col-6 left-list">
                                        <ul>
                                            <li>{t("whyChoose.list.item1")}</li>
                                            <li>{t("whyChoose.list.item2")}</li>
                                            <li>{t("whyChoose.list.item3")}</li>
                                        </ul>
                                    </div>
                                    <div className="col-6 right-list">
                                        <ul>
                                            <li>{t("whyChoose.list.item4")}</li>
                                            <li>{t("whyChoose.list.item5")}</li>
                                            <li>{t("whyChoose.list.item6")}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"back"} data-aos="fade-in"></div>
            </div>
        </div>
    );
}

export default WhyChoose;
