import React, { useEffect } from 'react';
import banner from "../../../assets/ServicesBanner.jpeg";
import { Link } from "react-router-dom";
import "./index.scss";
import ServicesCard from "../../../components/UserComponents/ServicesCard/index.jsx";
import { useGetAllServicesQuery } from "../../../services/userApi.jsx";
import AOS from "aos"; // AOS idxal edirik
import "aos/dist/aos.css"; // AOS-ın stil faylını idxal edirik

function Services() {
    const { data: getAllServices } = useGetAllServicesQuery();
    const services = getAllServices?.data;

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
                        <h1>Xidmətlərimiz</h1>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="100">
                        <Link to={"/"}>Ana səhifə</Link>
                        <div className={"dot"}></div>
                        <Link to={"/services"}>Xidmətlər</Link>
                    </p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"services"}>
                    <div className={"head"}>
                        <div className={"head-left"} data-aos="fade-right">
                            <hr/>
                            <h4>Biz nə edirik?</h4>
                        </div>
                        <div className={"head-center"} data-aos="fade-up">
                            <h1>İxtisaslaşdığımız Xidmət Sahələri</h1>
                            <p>
                                Fəaliyyət sahəmizi əhatə edən geniş xidmət spektri ilə tikinti və layihələndirmə
                                proseslərini tam şəkildə əhatə edirik. Hər bir layihəyə fərdi yanaşma sərgiləyərək,
                                funksionallıq, estetik və dayanıqlılığı bir araya gətirən həllər təqdim edirik. Aşağıda
                                sizə təqdim etdiyimiz əsas xidmət istiqamətləri ilə tanış olaraq, ehtiyaclarınıza uyğun
                                doğru həlli seçə bilərsiniz.
                            </p>
                        </div>
                        <div className={"head-right"} data-aos="fade-left">
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
                        {services && services.map((service, index) => (
                            <ServicesCard
                                key={service.id}
                                service={service}
                                index={index}
                                // Hər bir xidmət kartına animasiya əlavə edirik
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
