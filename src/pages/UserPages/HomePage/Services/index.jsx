import './index.scss';
import back from "/src/assets/back.png";
import ServicesCard from "../../../../components/UserComponents/ServicesCard/index.jsx";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ServicesCardHome from "../../../../components/UserComponents/ServicesCardHome/index.jsx";
import { useGetAllServicesQuery } from "../../../../services/userApi.jsx";
import { useEffect } from "react";
import AOS from "aos";                // AOS idxal edilir
import "aos/dist/aos.css";           // AOS stil faylı idxal olunur
import { useTranslation } from "react-i18next";

function ServiceHome() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: getAllServices } = useGetAllServicesQuery();
    const services = getAllServices?.data;

    useEffect(() => {
        AOS.init({
            duration: 1000,   // Animasiya müddəti (ms)
            once: true        // Hər element yalnız bir dəfə animasiya edilsin
        });
    }, []);

    return (
        <div id={"serviceHome"}>
            <div className={"container"} data-aos="fade-up">
                <div className={"head"}>
                    <div className={"head-left"} data-aos="fade-right">
                        <hr />
                        <h4>{t("serviceHome.head.left")}</h4>
                    </div>
                    <div className={"head-right"} data-aos="fade-left" data-aos-delay="100">
                        <h1>{t("serviceHome.head.right")}</h1>
                    </div>
                </div>
                <div className={"row"} data-aos="fade-up" data-aos-delay="200">
                    {services && services.map((service, index) => (
                        <ServicesCard key={service.id} service={service} index={index} />
                    ))}
                </div>
                <div data-aos="fade-up" data-aos-delay="300">
                    <div className={"more"} onClick={() => navigate("/services")}>
                        {t("serviceHome.moreButton")}
                        <button onClick={() => navigate("/services")}>
                            <RiArrowRightUpLine />
                        </button>
                    </div>
                </div>
            </div>
            <img src={back} alt={t("serviceHome.backAlt")} className="img-fluid" data-aos="zoom-in" data-aos-delay="400"/>
        </div>
    );
}

export default ServiceHome;
