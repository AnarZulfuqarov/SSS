import React, { useEffect } from "react";
import "./index.scss";
import banner from "../../../assets/DetailBanner.jpeg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "../../../components/UserComponents/Slider/index.jsx";
import ProjectsCard from "../../../components/UserComponents/ProjectsCard/index.jsx";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useGetProjectByIdQuery } from "../../../services/userApi.jsx";
import AOS from "aos";              // AOS kitabxanasını idxal edirik
import "aos/dist/aos.css";         // AOS stil faylını idxal edirik

function PortfolioDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: getProjectById } = useGetProjectByIdQuery(id);
    const project = getProjectById?.data;
    console.log(project);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animasiya müddəti (ms)
            once: true,     // Element yalnız bir dəfə animasiya edilsin
        });
    }, []);

    return (
        <div id="detail-page">
            <div
                className="banner"
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                data-aos="fade-in" // Banner üçün fade-in animasiya
            >
                <div className="container" data-aos="fade-up">
                    <div className="head">
                        <h1 data-aos="fade-up">
                            {project ? project.title : "Layihə Başlığı"}
                        </h1>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="100">
                        <Link to={"/"}>Ana səhifə</Link>
                        <div className="dot"></div>
                        <Link to={"/services"}>Layihələrimiz</Link>
                        <div className="dot"></div>
                        <Link to={""}>
                            {project ? project.title : "Layihə"}
                        </Link>
                    </p>
                </div>
            </div>
            <div className="container">
                <div className="detail">
                    <div className="head">
                        <div className="row">
                            <div className="col-4 col-md-12 col-sm-12 col-xs-12">
                                <div className="head-left" data-aos="fade-right">
                                    <div className="title-row">
                                        <hr />
                                        <h4>{project ? project.title : "Layihə Adı"}</h4>
                                    </div>
                                    <h1 data-aos="fade-right">Bizi Daha Yaxından Tanıyın</h1>
                                    <p data-aos="fade-right" data-aos-delay="100">
                                        Şirkətimiz tikinti və layihələndirmə sahəsində fəaliyyəti göstərən,
                                        etibarlılığı və keyfiyyəti ilə seçilən peşəkar komandadır. Uğurla
                                        tamamladığımız layihələr və məmnun müştərilərimiz bizim üçün ən böyük
                                        göstəricidir. Biz hər işə məsuliyyətlə yanaşır, modern texnologiyalar
                                        və təcrübə ilə dayanıqlı həllər təqdim edirik.
                                    </p>
                                </div>
                            </div>
                            <div className="col-4 col-md-12 col-sm-12 col-xs-12">
                                <div className="head-center" data-aos="zoom-in">
                                    <Slider />
                                </div>
                            </div>
                            <div className="col-4 col-md-12 col-sm-12 col-xs-12">
                                <div className="project-details" data-aos="fade-left">
                                    <div className="details-header">
                                        <hr />
                                        <h3>Ətraflı</h3>
                                    </div>
                                    <ul className="details-list">
                                        <li className="detail-item" data-aos="fade-left" data-aos-delay="100">
                                            <div className="detail-label">
                                                <span className="dot"></span>
                                                <span>Layihənin adı</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.title : "-"}
                                            </div>
                                        </li>
                                        <li className="detail-item" data-aos="fade-left" data-aos-delay="150">
                                            <div className="detail-label">
                                                <span className="dot"></span>
                                                <span>Təmir ili</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.repairYear : "-"}
                                            </div>
                                        </li>
                                        <li className="detail-item" data-aos="fade-left" data-aos-delay="200">
                                            <div className="detail-label">
                                                <span className="dot"></span>
                                                <span>Müştəri</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.client : "-"}
                                            </div>
                                        </li>
                                        <li className="detail-item" data-aos="fade-left" data-aos-delay="250">
                                            <div className="detail-label">
                                                <span className="dot"></span>
                                                <span>Layihə meneceri</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.projectManager : "-"}
                                            </div>
                                        </li>
                                        <li className="detail-item" data-aos="fade-left" data-aos-delay="300">
                                            <div className="detail-label">
                                                <span className="dot"></span>
                                                <span>Kontraktor</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.contractor : "-"}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        <div className="header" data-aos="fade-up">
                            <div className="title-row">
                                <hr />
                                <span className="subtitle">Etibar və Keyfiyyət</span>
                            </div>
                            <h2 className="main-title" data-aos="fade-up" data-aos-delay="100">
                                Digər Layihələrimizə keçid edin
                            </h2>
                        </div>
                        <div className="row" data-aos="fade-up" data-aos-delay="150">
                            <ProjectsCard />
                            <ProjectsCard />
                            <ProjectsCard />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }} data-aos="zoom-in" data-aos-delay="200">
                            <div className="more">
                                Daha çoxuna bax
                                <button onClick={() => navigate("/portfolio")}>
                                    <RiArrowRightUpLine />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioDetail;
