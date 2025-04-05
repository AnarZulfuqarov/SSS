import "./index.scss"
import banner from "../../../assets/DetailBanner.jpeg";
import {Link, useNavigate} from "react-router-dom";
import Slider from "../../../components/UserComponents/Slider/index.jsx";
import ProjectsCard from "../../../components/UserComponents/ProjectsCard/index.jsx";
import {RiArrowRightUpLine} from "react-icons/ri";
function PortfolioDetail() {
    const navigate = useNavigate();
    return (
        <div id={"detail-page"}>
            <div className={"banner"}
                 style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`,
                     backgroundRepeat: "no-repeat",
                 backgroundSize: "cover",}}>
                <div className={'container'}>
                    <div className={"head"}>
                        <h1>Sea Breeze</h1>
                    </div>
                    <p><Link to={"/"}>Ana səhifə</Link>
                        <div className={"dot"}></div>
                        <Link to={"/services"}>Layihələrimiz</Link>
                        <div className={"dot"}></div>
                    <Link to={""}>Sea BreezeSea Breeze</Link>
                </p>

                </div>
            </div>
            <div className={"container"}>
                <div className={"detail"}>
                    <div className={"head"}>
                      <div className={"row"}>
                          <div className={"col-4"}>
                              <div className="head-left">
                                  <div className="title-row">
                                      <hr />
                                      <h4>Sea Breeze</h4>
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
                          <div className={"col-4"}>
                              <div className={"head-center"}>
                                  <Slider/>
                              </div>
                          </div>
                          <div className={"col-4"}>
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
                                              {/* Kiçik dairə ikonu (bullet) üçün */}
                                              <span className="dot"></span>
                                              <span>Layihənin adı</span>
                                          </div>
                                          <div className="detail-value">Sea Breeze</div>
                                      </li>
                                      <li className="detail-item">
                                          <div className="detail-label">
                                              <span className="dot"></span>
                                              <span>Təmir ili</span>
                                          </div>
                                          <div className="detail-value">2024-2025</div>
                                      </li>
                                      <li className="detail-item">
                                          <div className="detail-label">
                                              <span className="dot"></span>
                                              <span>Müştəri</span>
                                          </div>
                                          <div className="detail-value">Sea Breeze</div>
                                      </li>
                                      <li className="detail-item">
                                          <div className="detail-label">
                                              <span className="dot"></span>
                                              <span>Layihə meneceri</span>
                                          </div>
                                          <div className="detail-value">Mr. Kithe. Pethe</div>
                                      </li>
                                      <li className="detail-item">
                                          <div className="detail-label">
                                              <span className="dot"></span>
                                              <span>Kontraktor</span>
                                          </div>
                                          <div className="detail-value">Mace</div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div className={"main"}>
                        <div className="header">
                            <div className="title-row">
                                <hr />
                                <span className="subtitle">Etibar və Keyfiyyət</span>
                            </div>
                            <h2 className="main-title">Digər Layihələrimizə keçid edin</h2>
                        </div>
                        <div className={"row"}>
                            <ProjectsCard/>
                            <ProjectsCard/>
                            <ProjectsCard/>
                        </div>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <div className={"more"}>
                                Daha çoxuna bax
                                <button><RiArrowRightUpLine onClick={()=>navigate("/portfolio")}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioDetail;