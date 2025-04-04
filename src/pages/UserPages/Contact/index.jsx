import "./index.scss"
import banner from "/src/assets/ContactBanner.jpeg"
import {Link} from "react-router-dom";
import CircleText from "../../../components/UserComponents/CircleText/index.jsx";

function Contact() {
    return (
        <div id={"contact-page"}>
            <div className={"banner"}
                 style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`}}>
                <div className={'container'}>
                    <div className={"head"}>
                        <h1>Əlaqə</h1>
                    </div>
                    <p><Link to={"/"}>Ana səhifə</Link>
                        <div className={"dot"}></div>
                        <Link to={"/contact"}>Əlaqə</Link></p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"header"}>
                    <h1>Suallarınız Var? Biz buradayıq!</h1>
                    <div className={"circle"}><CircleText/></div>
                </div>

            </div>
            <div className={"contact"}>
                <div className={"container"}>
                    <div className={"row form-section"}>
                        <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                            <div className={"form"}>
                                <div className={"form-head"}>
                                    <hr/>
                                    <h2>Formu dolduraraq bizimlə əlaqə saxlayın</h2>
                                </div>
                                <div className={"form-body"}>
                                    <div className={"row"}>
                                        <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                                            <label>Ad</label> <br/>
                                            <input placeholder="Adınızı daxil edin"/>
                                        </div>
                                        <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                                            <label>Soyad</label> <br/>
                                            <input placeholder="Soyadınızı daxil edin"/>
                                        </div>
                                        <div className={"col-12"}>
                                            <label>Email</label> <br/>
                                            <input placeholder="sssogluinsaat@gmail.com"/>
                                        </div>
                                        <div className={"col-12"}>
                                            <label>Nömrə</label> <br/>
                                            <input placeholder="+994 55 643 25 88"/>
                                        </div>
                                        <div className={"col-12"}>
                                            <label>Qeyd</label> <br/>
                                            <textarea rows={5}/>
                                        </div>
                                        <div className={"col-12"}>
                                            <button>Göndər</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                            <div className="map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.896130987731!2d49.85555347640196!3d40.41115175597831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d003436b447%3A0xb8c6c13c52985f63!2sQAVO%20MMC!5e0!3m2!1sen!2saz!4v1743839328403!5m2!1sen!2saz"
                                    width="100%"
                                    height="610"
                                    style={{border: 0}}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;