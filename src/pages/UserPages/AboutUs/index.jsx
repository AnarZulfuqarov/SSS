import './index.scss'
import banner from "../../../assets/ContactBanner.jpeg";
import image from "/src/assets/aboutUsImage1.jpeg"
import {Link} from "react-router-dom";
import CircleText from "../../../components/UserComponents/CircleText/index.jsx";
import Sponsor from "../../../components/UserComponents/Sponsor/index.jsx";

function AboutUs() {
    return (
        <div id={"aboutUs"}>
            <div
                className={"banner"}
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`,
                }}
            >
                <div className={'container'}>
                    <div className={"head"}>
                        <h1>Haqqımızda</h1>
                    </div>
                    <p>
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
                            <div className={"col-6"}>
                                <div className={"image"}>
                                    <img src={image} alt=""/>
                                </div>
                            </div>
                            <div className={"col-6"}>
                                <div className={"text"}>
                                    <h2>Tikintidə Etibara və Keyfiyyətə Söykənən Yolçuluğumuz</h2>
                                    <p>Şirkətimiz tikinti və layihələndirmə sahəsində fəaliyyət göstərən, etibarlılığı və
                                        keyfiyyəti ilə seçilən peşəkar komandadır. Uğurla tamamladığımız layihələr və məmnun
                                        müştərilərimiz bizim üçün ən böyük göstəricidir. Hər bir işə məsuliyyətlə yanaşır,
                                        modern texnologiyalar və təcrübə ilə dayanıqlı həllər təqdim edirik.</p>
                                </div>
                            </div>
                        </div>
                        <div className={"circleText"}>
                            <CircleText/>
                        </div>
                    </div>
                    <div className={"back"}></div>
                </div>
                <div className={"card-section"}>
                    <div className={"container"}>
                        <div className={"head"}>
                            <div className={"head-left"}>
                                <hr/>
                                <h4>Etibar və Keyfiyyət</h4>
                            </div>
                            <div className={"head-right"}>
                                <h1>Keyfiyyəti Təsdiqləyən Sertifikatlar</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"brand"}>
                <div className={"container"}>
                    <div className={"head"}>
                        <div className={"head-left"}>
                            <hr/>
                            <h4>Tərəfdaşlarımız kimlərdir?</h4>
                        </div>
                    </div>
                </div>
                <Sponsor/>
            </div>
        </div>
    );
}

export default AboutUs;