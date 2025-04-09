import './index.scss'
import {FaPhone} from "react-icons/fa6";
import {FiMail} from "react-icons/fi";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <section id={"footer"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-4 col-md-12 col-sm-12 col-xs-12"}>
                        <div className={"main-text"}>
                            <h2>SSS Constraction</h2>
                            <div className={"foot-contact"}>
                                <div className={"icons"}>
                                    <FaPhone className={"icon"}/>
                                </div>
                                <div className={"content"}>
                                    <span>Bizə zəng edin</span>
                                    <p><a href={"tel:994552999555"}>+994 55 299 95 55</a></p>
                                </div>
                            </div>
                            <div className={"foot-contact"}>
                                <div className={"icons"}>
                                    <FiMail className={"icon"}/>
                                </div>
                                <div className={"content"}>
                                    <span>Bizə mail yazın</span>
                                    <p><a href={"mailto:info.sssinsaat@gmail.com"}>info.sssinsaat@gmail.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-8 col-md-12 col-sm-12 col-xs-12"}>
                        <div className={"row"}>
                            <div className={"col-4 col-md-12 col-sm-12 col-xs-12"}>
                                <div className={"services"}>
                                    <h3>Keçidlər</h3>
                                    <li><Link to={"/"}>Ana səhifə</Link></li>
                                    <li><Link to={"/portfolio"}>Portfolio</Link></li>
                                    <li><Link to={"/services"}>Xidmətlər</Link></li>
                                    <li><Link to={"/about"}>Haqqımızda</Link></li>
                                    <li><Link to={"/contact"}>Əlaqə</Link></li>
                                </div>
                            </div>
                            <div className={"col-4 col-md-12 col-sm-12 col-xs-12"}>
                                <div className={"services"}>
                                    <h3>Şərtlər və Qaydalar</h3>
                                    <li>Rezervasiya və ödənişlər</li>
                                    <li>Ləğv etmə və Geri Ödənişlər</li>
                                    <li>Səyahət Sığortası</li>
                                    <li>Müştəri Məsuliyyəti</li>
                                </div>
                            </div>
                            <div className={"col-4 col-md-12 col-sm-12 col-xs-12"}>
                                <div className={"services"}>
                                    <h3>Əlaqə məlumatları</h3>
                                    <li><a href={"tel:994552999555"}>+994 55 299 95 55</a></li>
                                    <li><a href={"mailto:info.sssinsaat@gmail.com"}>info.sssinsaat@gmail.com</a></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;