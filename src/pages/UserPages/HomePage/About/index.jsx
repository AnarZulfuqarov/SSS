import './index.scss'
import {RiArrowRightUpLine} from "react-icons/ri";
import city from "/src/assets/city.png"
import certificate from "/src/assets/certificate.png"
function AboutHome() {
    return (
        <div id={"aboutHome"}>
            <div className={"container"}>
                <div className={"head"}>
                    <div className={"head-left"}>
                        <hr/>
                        <h4>Biz kimik?</h4>
                    </div>
                    <div className={"head-right"}>
                        <h1>Peşəkarlıq və Keyfiyyətin Ünvanı</h1>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <div className={"text"}>
                            <h4>Beynəlxalq Sertifikatlarla Təsdiqlənmiş Keyfiyyət və Yüzlərlə Uğurlu Layihə ilə Sübut Olunmuş Təcrübə</h4>
                            <p>Şirkətimiz beynəlxalq standartlara cavab verən sertifikatları ilə peşəkarlığını və yüksək keyfiyyətini hər zaman təsdiq edir. Fəaliyyət göstərdiyimiz müddət ərzində uğurla tamamladığımız çoxsaylı layihələr, müştərilərimizin məmnuniyyətini və bizə olan güvənini artıran ən əsas amillərdir. Təcrübəli mütəxəssislərimiz və əldə etdiyimiz sertifikatlar sayəsində, hər bir layihəmizdə təhlükəsizlik, keyfiyyət və dəqiqlik prinsiplərinə sadiq qalaraq, inşaat sektorunda nümunəvi bir mövqe qazanmışıq.</p>
                            <div className={"more"}>
                                Daha ətraflı
                                <button><RiArrowRightUpLine /></button>
                            </div>
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"image"}>
                            <div className={"content"}>
                                <div className={"black box"}>
                                    <img src={city}/>
                                    <h3>100<sup>+</sup></h3>
                                    <p>Tamamlanmış layihə</p>
                                </div>
                                <div className={"orange box"}>
                                    <img src={certificate}/>
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