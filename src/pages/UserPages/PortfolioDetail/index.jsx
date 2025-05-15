import { useEffect, useState } from "react";
import "./index.scss";
import banner from "../../../assets/DetailBanner.jpeg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "../../../components/UserComponents/Slider";
import ProjectsCard from "../../../components/UserComponents/ProjectsCard";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useGetAllProjectQuery, useGetProjectByIdQuery } from "../../../services/userApi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { FaSearchPlus, FaSearchMinus, FaRedo } from "react-icons/fa"; // İkonlar için

function PortfolioDetail() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: getProjectById } = useGetProjectByIdQuery(id);
    const project = getProjectById?.data;
    const { data: getAllProject } = useGetAllProjectQuery();
    const projects = getAllProject?.data
        ?.filter((item) => item.id !== id)
        .slice(0, 3);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1); // Büyütme seviyesi
    const [rotation, setRotation] = useState(0); // Çevirme açısı

    const sliderImages = project?.images;

    const openModal = (media) => {
        setSelectedMedia(media);
        setIsModalOpen(true);
        setZoomLevel(1); // Modal açıldığında büyütmeyi sıfırla
        setRotation(0); // Modal açıldığında çevirmeyi sıfırla
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedia(null);
        setZoomLevel(1);
        setRotation(0);
    };

    // Büyütme ve Küçültme Fonksiyonları
    const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 3)); // Maksimum 3x
    const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5)); // Minimum 0.5x
    const rotate = () => setRotation((prev) => prev + 90); // 90 derece çevir

    const getLocalizedTitle = (project) => {
        if (!project) return t("portfolioDetail.projectFallback");
        switch (i18n.language) {
            case "en":
                return project.titleEng || project.title;
            case "ru":
                return project.titleRu || project.title;
            default:
                return project.title;
        }
    };

    const getLocalizedSubTitle = (project) => {
        if (!project) return "";
        switch (i18n.language) {
            case "en":
                return project.subTitleEng || project.subTitle;
            case "ru":
                return project.subTitleRu || project.subTitle;
            default:
                return project.subTitle;
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
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
                data-aos="fade-in"
            >
                <div className="container" data-aos="fade-up">
                    <div className="head">
                        <h1 data-aos="fade-up">
                            {project ? getLocalizedTitle(project) : t("portfolioDetail.bannerFallback")}
                        </h1>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="100">
                        <Link to={"/"}>{t("menu.home")}</Link>
                        <div className="dot"></div>
                        <Link to={"/services"}>{t("portfolioDetail.breadcrumb")}</Link>
                        <div className="dot"></div>
                        <Link to={""}>
                            {project ? getLocalizedTitle(project) : t("portfolioDetail.projectFallback")}
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
                                        <h4>{t("portfolioDetail.details.projectNameFallback")}</h4>
                                    </div>
                                    <h1 data-aos="fade-right">
                                        {project ? getLocalizedTitle(project) : ""}
                                    </h1>
                                    <p data-aos="fade-right" data-aos-delay="100">
                                        {project ? getLocalizedSubTitle(project) : ""}
                                    </p>
                                </div>
                            </div>
                            <div className="col-4 col-md-12 col-sm-12 col-xs-12">
                                <div className="head-center" data-aos="zoom-in">
                                    <Slider images={sliderImages} openModal={openModal} />
                                </div>
                            </div>
                            <div className="col-4 col-md-12 col-sm-12 col-xs-12">
                                <div className="project-details" data-aos="fade-left">
                                    <div className="details-header">
                                        <hr />
                                        <h3>{t("portfolioDetail.details.header")}</h3>
                                    </div>
                                    <ul className="details-list">
                                        {project?.title && (
                                            <li className="detail-item" data-aos="fade-left" data-aos-delay="100">
                                                <div className="detail-label">
                                                    <span className="dot"></span>
                                                    <span>{t("portfolioDetail.details.label.projectName")}</span>
                                                </div>
                                                <div className="detail-value">
                                                    {getLocalizedTitle(project)}
                                                </div>
                                            </li>
                                        )}
                                        {project?.repairYear && (
                                            <li className="detail-item" data-aos="fade-left" data-aos-delay="150">
                                                <div className="detail-label">
                                                    <span className="dot"></span>
                                                    <span>{t("portfolioDetail.details.label.repairYear")}</span>
                                                </div>
                                                <div className="detail-value">
                                                    {project.repairYear}
                                                </div>
                                            </li>
                                        )}
                                        {project?.client && (
                                            <li className="detail-item" data-aos="fade-left" data-aos-delay="200">
                                                <div className="detail-label">
                                                    <span className="dot"></span>
                                                    <span>{t("portfolioDetail.details.label.client")}</span>
                                                </div>
                                                <div className="detail-value">
                                                    {project.client}
                                                </div>
                                            </li>
                                        )}
                                        {project?.projectManager && (
                                            <li className="detail-item" data-aos="fade-left" data-aos-delay="250">
                                                <div className="detail-label">
                                                    <span className="dot"></span>
                                                    <span>{t("portfolioDetail.details.label.projectManager")}</span>
                                                </div>
                                                <div className="detail-value">
                                                    {project.projectManager}
                                                </div>
                                            </li>
                                        )}
                                        {project?.contractor && (
                                            <li className="detail-item" data-aos="fade-left" data-aos-delay="300">
                                                <div className="detail-label">
                                                    <span className="dot"></span>
                                                    <span>{t("portfolioDetail.details.label.contractor")}</span>
                                                </div>
                                                <div className="detail-value">
                                                    {project.contractor}
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        <div className="header" data-aos="fade-up">
                            <div className="title-row">
                                <hr />
                                <span className="subtitle">{t("portfolioDetail.main.subtitle")}</span>
                            </div>
                            <h2 className="main-title" data-aos="fade-up" data-aos-delay="100">
                                {t("portfolioDetail.main.title")}
                            </h2>
                        </div>
                        <div className="row" data-aos="fade-up" data-aos-delay="150">
                            {projects &&
                                projects.map((item, index) => (
                                    <ProjectsCard key={item.id} project={item} index={index} />
                                ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }} data-aos="zoom-in" data-aos-delay="200">
                            <div className="more" onClick={() => navigate("/portfolio")}>
                                {t("portfolioDetail.main.moreButton")}
                                <button onClick={() => navigate("/portfolio")}>
                                    <RiArrowRightUpLine />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlayy" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal}>
                            ×
                        </button>
                        {/* Büyütme ve Çevirme Kontrolleri */}
                        <div className="modal-controls">
                            <button onClick={zoomIn} title="Zoom In">
                                <FaSearchPlus />
                            </button>
                            <button onClick={zoomOut} title="Zoom Out">
                                <FaSearchMinus />
                            </button>
                            <button onClick={rotate} title="Rotate">
                                <FaRedo />
                            </button>
                        </div>
                        {selectedMedia?.isVideo ? (
                            <video
                                src={selectedMedia.src}
                                className="modal-media"
                                controls
                                autoPlay
                                muted
                                loop
                                style={{
                                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                                    transition: "transform 0.3s ease",
                                }}
                            />
                        ) : (
                            <img
                                src={selectedMedia?.src}
                                alt="Modal media"
                                className="modal-media"
                                style={{
                                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                                    transition: "transform 0.3s ease",
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PortfolioDetail;