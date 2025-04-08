import "./index.scss";
import banner from "../../../assets/DetailBanner.jpeg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "../../../components/UserComponents/Slider/index.jsx";
import ProjectsCard from "../../../components/UserComponents/ProjectsCard/index.jsx";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useGetProjectByIdQuery } from "../../../services/userApi.jsx";

function PortfolioDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: getProjectById } = useGetProjectByIdQuery(id);
    const project = getProjectById?.data;
    console.log(project);

    return (
        <div id="detail-page">
            <div
                className="banner"
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="head">
                        {/* Əgər project varsa, başlıq olaraq onun title‑sini göstəririk */}
                        <h1>{project ? project.title : "Layihə Başlığı"}</h1>
                    </div>
                    <p>
                        <Link to={"/"}>Ana səhifə</Link>
                        <div className="dot"></div>
                        <Link to={"/services"}>Layihələrimiz</Link>
                        <div className="dot"></div>
                        {/* Son breadcrumb linkində də dinamik dəyər göstərilir */}
                        <Link to={""}>{project ? project.title : "Layihə"}</Link>
                    </p>
                </div>
            </div>
            <div className="container">
                <div className="detail">
                    <div className="head">
                        <div className="row">
                            <div className="col-4">
                                <div className="head-left">
                                    <div className="title-row">
                                        <hr />
                                        {/* Dinamik olaraq layihə adını göstəririk */}
                                        <h4>{project ? project.title : "Layihə Adı"}</h4>
                                    </div>
                                    <h1>Bizi Daha Yaxından Tanıyın</h1>
                                    <p>
                                        Şirkətimiz tikinti və layihələndirmə sahəsində fəaliyyəti göstərən,
                                        etibarlılığı və keyfiyyəti ilə seçilən peşəkar komandadır. Uğurla
                                        tamamladığımız layihələr və məmnun müştərilərimiz bizim üçün ən böyük
                                        göstəricidir. Biz hər işə məsuliyyətlə yanaşır, modern texnologiyalar
                                        və təcrübə ilə dayanıqlı həllər təqdim edirik.
                                    </p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="head-center">
                                    <Slider />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="project-details">
                                    {/* Başlıq hissəsi */}
                                    <div className="details-header">
                                        <hr />
                                        <h3>Ətraflı</h3>
                                    </div>

                                    {/* Məlumatların siyahısı */}
                                    <ul className="details-list">
                                        <li className="detail-item">
                                            <div className="detail-label">
                                                {/* Kiçik dairə ikonu (bullet) */}
                                                <span className="dot"></span>
                                                <span>Layihənin adı</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.title : "-"}
                                            </div>
                                        </li>
                                        <li className="detail-item">
                                            <div className="detail-label">
                                                <span className="dot"></span>
                                                <span>Təmir ili</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.repairYear : "-"}
                                            </div>
                                        </li>
                                        <li className="detail-item">
                                            <div className="detail-label">
                                                <span className="dot"></span>
                                                <span>Müştəri</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.client : "-"}
                                            </div>
                                        </li>
                                        <li className="detail-item">
                                            <div className="detail-label">
                                                <span className="dot"></span>
                                                <span>Layihə meneceri</span>
                                            </div>
                                            <div className="detail-value">
                                                {project ? project.projectManager : "-"}
                                            </div>
                                        </li>
                                        <li className="detail-item">
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
                        <div className="header">
                            <div className="title-row">
                                <hr />
                                <span className="subtitle">Etibar və Keyfiyyət</span>
                            </div>
                            <h2 className="main-title">Digər Layihələrimizə keçid edin</h2>
                        </div>
                        <div className="row">
                            <ProjectsCard />
                            <ProjectsCard />
                            <ProjectsCard />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
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
