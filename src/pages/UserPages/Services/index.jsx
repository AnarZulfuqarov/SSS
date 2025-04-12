import React, {useEffect, useState} from 'react';
import banner from "../../../assets/ServicesBanner.jpeg";
import { Link } from "react-router-dom";
import "./index.scss";
import ServicesCard from "../../../components/UserComponents/ServicesCard/index.jsx";
import { useGetAllServicesQuery } from "../../../services/userApi.jsx";
import AOS from "aos"; // AOS idxal edirik
import "aos/dist/aos.css"; // AOS-ın stil faylını idxal edirik
import { useTranslation } from "react-i18next";

function Services() {
    const { t } = useTranslation();
    const { data: getAllServices } = useGetAllServicesQuery();
    const services = getAllServices?.data;
    const [activeCard, setActiveCard] = useState(null);
    useEffect(() => {
        AOS.init({
            duration: 1000, // animasiya müddəti (ms ilə)
            once: true,     // animasiya hər element üçün yalnız bir dəfə
        });
    }, []);

    return (
        <div id={"services-page"}>
            <div className={"banner"}
                 style={{
                     background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`
                 }}
                 data-aos="fade-in" // Banner üçün animasiya
            >
                <div className={'container'} data-aos="fade-up">
                    <div className={"head"}>
                        <h1>{t("services.bannerTitle")}</h1>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="100">
                        <Link to={"/"}>{t("menu.home")}</Link>
                        <div className={"dot"}></div>
                        <Link to={"/services"}>{t("services.bannerTitle")}</Link>
                    </p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"services"}>
                    <div className={"head"}>
                        <div className={"head-left"} data-aos="fade-right">
                            <hr/>
                            <h4>{t("services.head.left")}</h4>
                        </div>
                        <div className={"head-center"} data-aos="fade-up">
                            <h1>{t("services.head.center.title")}</h1>
                            <p>
                                {t("services.head.center.description")}
                            </p>
                        </div>
                        <div className={"head-right"} data-aos="fade-left">
                            <div>
                                <h1>{t("services.head.right.experienceValue")}</h1>
                                <p>{t("services.head.right.experience")}</p>
                            </div>
                            <div>
                                <h1>{t("services.head.right.satisfactionValue")}</h1>
                                <p>{t("services.head.right.satisfaction")}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        {services && services.map((service, index) => (
                            <ServicesCard
                                key={service.id}
                                service={service}
                                index={index}
                                activeCard={activeCard}
                                setActiveCard={setActiveCard}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100} // kartlar arasında gecikmə
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
