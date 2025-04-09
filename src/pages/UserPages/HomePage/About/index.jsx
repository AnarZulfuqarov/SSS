import './index.scss';
import { RiArrowRightUpLine } from "react-icons/ri";
import city from "/src/assets/city.png";
import certificate from "/src/assets/certificate.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";                 // AOS idxal edilir
import "aos/dist/aos.css";            // AOS stil faylı idxal olunur

function AboutHome() {
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
                        <h4>Biz kimik?</h4>
                    </div>
                    <div className={"head-right"} data-aos="fade-left" data-aos-delay="100">
                        <h1>Peşəkarlıq və Keyfiyyətin Ünvanı</h1>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"} data-aos="fade-right">
                        <div className={"text"}>
                            <h4>
                                Beynəlxalq Sertifikatlarla Təsdiqlənmiş Keyfiyyət və Yüzlərlə Uğurlu Layihə ilə Sübut
                                Olunmuş Təcrübə
                            </h4>
                            <p>
                                Şirkətimiz beynəlxalq standartlara cavab verən sertifikatları ilə peşəkarlığını və yüksək
                                keyfiyyətini hər zaman təsdiq edir. Fəaliyyət göstərdiyimiz müddət ərzində uğurla
                                tamamladığımız çoxsaylı layihələr, müştərilərimizin məmnuniyyətini və bizə olan güvənini
                                artıran ən əsas amillərdir. Təcrübəli mütəxəssislərimiz və əldə etdiyimiz sertifikatlar
                                sayəsində, hər bir layihəmizdə təhlükəsizlik, keyfiyyət və dəqiqlik prinsiplərinə sadiq
                                qalaraq, inşaat sektorunda nümunəvi bir mövqe qazanmışıq.
                            </p>
                            <div className={"more"} data-aos="fade-up" data-aos-delay="200">
                                Daha ətraflı bax
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
                                    <img src={city} alt="Şəhər təsviri" />
                                    <h3>100<sup>+</sup></h3>
                                    <p>Tamamlanmış layihə</p>
                                </div>
                                <div className={"orange box"} data-aos="zoom-in" data-aos-delay="100">
                                    <img src={certificate} alt="Sertifikat təsviri" />
                                    <h3>50<sup>+</sup></h3>
                                    <p>Qazanılmış sertifikat</p>
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
