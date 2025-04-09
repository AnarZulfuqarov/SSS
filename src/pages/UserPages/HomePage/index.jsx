import BannerHome from "./Banner/index.jsx";
import AboutHome from "./About/index.jsx";
import CardsContainer from "./CardSection/index.jsx";
import WhyChoose from "./WhyChoose/index.jsx";
import ServiceHome from "./Services/index.jsx";
import Sponsor from "../../../components/UserComponents/Sponsor/index.jsx";
import './index.scss'
import React from "react";
import {useTranslation} from "react-i18next";
function HomePage() {
    const { t } = useTranslation();
    return (
        <div className="HomePage">
            <BannerHome />
            <AboutHome />
            <CardsContainer/>
            <WhyChoose/>
            {/*<AboutHome/>*/}
            <ServiceHome/>
            <div className={"brand"} data-aos="fade-in">
                <div className={"container"}>
                    <div className={"head"} data-aos="fade-up">
                        <div className={"head-left"} data-aos="fade-right">
                            <hr/>
                            <h4>{t('about.partnersTitle')}</h4>
                        </div>
                    </div>
                </div>
                <Sponsor data-aos="zoom-in" data-aos-delay="100"/>
            </div>
        </div>
    );
}

export default HomePage;