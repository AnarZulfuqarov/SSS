import React from 'react';
import banner from "../../../assets/ServicesBanner.jpeg";
import {Link} from "react-router-dom";
import "./index.scss"
import ServicesCard from "../../../components/UserComponents/ServicesCard/index.jsx";

function Services() {
    return (
        <div id={"services-page"}>
            <div className={"banner"}
                 style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`}}>
                <div className={'container'}>
                    <div className={"head"}>
                        <h1>Xidmətlərimiz</h1>
                    </div>
                    <p><Link to={"/"}>Ana səhifə</Link>
                        <div className={"dot"}></div>
                        <Link to={"/services"}>Xidmətlər</Link></p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"services"}>
                    <div className={"head"}>
                        <div className={"head-left"}>
                            <hr/>
                            <h4>Biz nə edirik?</h4>
                        </div>
                        <div className={"head-center"}>
                            <h1>İxtisaslaşdığımız Xidmət Sahələri</h1>
                            <p>
                                Fəaliyyət sahəmizi əhatə edən geniş xidmət spektri ilə tikinti və layihələndirmə
                                proseslərini tam şəkildə əhatə edirik. Hər bir layihəyə fərdi yanaşma sərgiləyərək,
                                funksionallıq, estetik və dayanıqlılığı bir araya gətirən həllər təqdim edirik. Aşağıda
                                sizə təqdim etdiyimiz əsas xidmət istiqamətləri ilə tanış olaraq, ehtiyaclarınıza uyğun
                                doğru həlli seçə bilərsiniz.
                            </p>
                        </div>
                        <div className={"head-right"}>
                            <div>
                                <h1>18+</h1>
                                <p>İllik təcrübə</p>
                            </div>
                            <div>
                                <h1>98%</h1>
                                <p>Razı müştəri</p>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <ServicesCard/>
                        <ServicesCard/>
                        <ServicesCard/>
                        <ServicesCard/>
                        <ServicesCard/>
                        <ServicesCard/>
                        <ServicesCard/>
                        <ServicesCard/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;