import React, { useState, useEffect } from "react";
import "./index.scss";
import banner from "../../../assets/ContactBanner.jpeg";
import image from "/src/assets/aboutUsImage1.jpeg";
import { Link } from "react-router-dom";
import CircleText from "../../../components/UserComponents/CircleText/index.jsx";
import Sponsor from "../../../components/UserComponents/Sponsor/index.jsx";
import CardCertificate from "../../../components/UserComponents/Cards/index.jsx";
import Pagination from "../../../components/UserComponents/Pagination/index.jsx";
import AOS from "aos";                // AOS idxal edilir
import "aos/dist/aos.css";           // AOS stil faylı idxal olunur

function AboutUs() {
    const cardsData = [
        { id: 1, image: banner, number: '01', text: 'Sertifikat' },
        { id: 2, image: image, number: '02', text: 'Sertifikat' },
        { id: 3, image: banner, number: '03', text: 'Sertifikat' },
        { id: 4, image: image, number: '04', text: 'Sertifikat' },
        { id: 4, image: image, number: '05', text: 'Sertifikat' },
        // İstədiyiniz qədər əlavə kart məlumatı əlavə oluna bilər...
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Hər səhifədə görünəcək kartların sayı
    const totalPages = Math.ceil(cardsData.length / itemsPerPage);

    const handlePageChange = (page) => {
        console.log("Səhifə dəyişdi:", page);
        setCurrentPage(page);
    };

    // Cari səhifə üçün göstəriləcək kartların alt-massivi
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCards = cardsData.slice(startIndex, endIndex);

    // AOS initializasiyası
    useEffect(() => {
        AOS.init({
            duration: 1000,  // Animasiya müddəti (ms)
            once: true       // Hər element yalnız bir dəfə animasiya edilsin
        });
    }, []);

    return (
        <div id={"aboutUs"}>
            <div
                className={"banner"}
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`,
                }}
                data-aos="fade-in"  // Banner fade-in animasiya ilə görünəcək
            >
                <div className={'container'} data-aos="fade-up">
                    <div className={"head"} data-aos="fade-up" data-aos-delay="50">
                        <h1>Haqqımızda</h1>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="100">
                        <Link to={"/"}>Ana səhifə</Link>
                        <div className={"dot"}></div>
                        <Link to={"/about"}>Haqqımızda</Link>
                    </p>
                </div>
            </div>

            <div className={"aboutUs"}>
                <div className={"section1"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-6 col-md-12 col-sm-12 col-xs-12"} data-aos="fade-right">
                                <div className={"image"}>
                                    <img src={image} alt="Haqqımızda Şəkili" />
                                </div>
                            </div>
                            <div className={"col-6 col-md-12 col-sm-12 col-xs-12"} data-aos="fade-left">
                                <div className={"text"}>
                                    <h2>Tikintidə Etibara və Keyfiyyətə Söykənən Yolçuluğumuz</h2>
                                    <p>
                                        Şirkətimiz tikinti və layihələndirmə sahəsində fəaliyyət göstərən, etibarlılığı və
                                        keyfiyyəti ilə seçilən peşəkar komandadır. Uğurla tamamladığımız layihələr və məmnun
                                        müştərilərimiz bizim üçün ən böyük göstəricidir. Hər bir işə məsuliyyətlə yanaşır,
                                        modern texnologiyalar və təcrübə ilə dayanıqlı həllər təqdim edirik.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={"circleText"} data-aos="zoom-in" data-aos-delay="150">
                            <CircleText />
                        </div>
                    </div>
                    <div className={"back"} data-aos="fade-in"></div>
                </div>

                <div className={"card-section"}>
                    <div className={"container"}>
                        <div className={"head"} data-aos="fade-up">
                            <div className={"head-left"} data-aos="fade-right">
                                <hr/>
                                <h4>Etibar və Keyfiyyət</h4>
                            </div>
                            <div className={"head-right"} data-aos="fade-left">
                                <h1>Keyfiyyəti Təsdiqləyən Sertifikatlar</h1>
                            </div>
                        </div>
                        <div className={"row"} style={{ padding:"0 16px" }}>
                            {paginatedCards.map((card, index) => (
                                <CardCertificate
                                    key={card.id}
                                    index={index}
                                    image={card.image}
                                    number={card.number}
                                    text={card.text}
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 100}
                                />
                            ))}
                        </div>
                        <div style={{ display:"flex", justifyContent:"end", marginTop:"30px" }} data-aos="fade-up">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={"brand"} data-aos="fade-in">
                <div className={"container"}>
                    <div className={"head"} data-aos="fade-up">
                        <div className={"head-left"} data-aos="fade-right">
                            <hr/>
                            <h4>Tərəfdaşlarımız kimlərdir?</h4>
                        </div>
                    </div>
                </div>
                <Sponsor data-aos="zoom-in" data-aos-delay="100"/>
            </div>
        </div>
    );
}

export default AboutUs;
