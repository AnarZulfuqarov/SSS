import React, { useEffect } from "react";
import "./index.scss";
import why from '/src/assets/why.jpeg';
import kran from "/src/assets/kran.png";
import AOS from "aos";                 // AOS idxal edilir
import "aos/dist/aos.css";            // AOS stil faylı idxal olunur

function WhyChoose() {
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
                        <h4>Biz niyə seçməlisiz?</h4>
                    </div>
                    <div className={"head-right"} data-aos="fade-left" data-aos-delay="100">
                        <h1>Bizimlə Daha Etibarlı, Daha Keyfiyyətli</h1>
                    </div>
                    <img src={kran} alt="kran" data-aos="zoom-in" data-aos-delay="200" />
                </div>
            </div>
            <div className={"whyChoose"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-6"} data-aos="fade-right">
                            <div className={"image"}>
                                <img src={why} alt="why" />
                            </div>
                        </div>
                        <div className={"col-6"} data-aos="fade-left">
                            <div className={"text"}>
                                <h2>Layihələriniz Üçün Təminatımız</h2>
                                <p>
                                    Biz hər bir layihəyə yalnız bir iş kimi deyil, məsuliyyət və etibar layihəsi kimi yanaşırıq. Müştəri məmnuniyyətini əsas prioritet kimi qəbul edərək, sizə problemsiz, şəffaf və etibarlı bir əməkdaşlıq vəd edirik.
                                </p>
                                <div className="row" data-aos="fade-up" data-aos-delay="150">
                                    <div className="col-6 left-list">
                                        <ul>
                                            <li>Vaxtında Təslim</li>
                                            <li>Vaxtında Təslim</li>
                                            <li>Vaxtında Təslim</li>
                                        </ul>
                                    </div>
                                    <div className="col-6 right-list">
                                        <ul>
                                            <li>Vaxtında Təslim</li>
                                            <li>Vaxtında Təslim</li>
                                            <li>Vaxtında Təslim</li>
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
