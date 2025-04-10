import './index.scss'
import { FaPhone } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";

function Footer() {
    const { t } = useTranslation();

    return (
        <section id={"footer"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-4 col-md-12 col-sm-12 col-xs-12"}>
                        <div className={"main-text"}>
                            <h2>{t('footer.company')}</h2>
                            <div className={"foot-contact"}>
                                <div className={"icons"}>
                                    <FaPhone className={"icon"} />
                                </div>
                                <div className={"content"}>
                                    <span>{t('footer.call')}</span>
                                    <p><a href={"tel:994552999555"}>+994 55 299 95 55</a></p>
                                </div>
                            </div>
                            <div className={"foot-contact"}>
                                <div className={"icons"}>
                                    <FiMail className={"icon"} />
                                </div>
                                <div className={"content"}>
                                    <span>{t('footer.mail')}</span>
                                    <p>
                                        <a href={"mailto:info.sssinsaat@gmail.com"}>
                                            info.sssinsaat@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-8 col-md-12 col-sm-12 col-xs-12"}>
                        <div className={"row"}>
                            <div className={"col-4 col-md-12 col-sm-12 col-xs-12"}>
                                <div className={"services"}>
                                    <h3>{t('footer.navigation')}</h3>
                                    <li><Link to={"/"}>{t('menu.home')}</Link></li>
                                    <li><Link to={"/portfolio"}>{t('menu.portfolio')}</Link></li>
                                    <li><Link to={"/services"}>{t('menu.services')}</Link></li>
                                    <li><Link to={"/about"}>{t('menu.about')}</Link></li>
                                    <li><Link to={"/contact"}>{t('menu.contact')}</Link></li>
                                </div>
                            </div>
                            <div className={"col-4 col-md-12 col-sm-12 col-xs-12"}>
                                <div className={"services"}>
                                    <h3>{t('footer.termsTitle')}</h3>
                                    <li>{t('footer.terms.item1')}</li>
                                    <li>{t('footer.terms.item2')}</li>
                                    <li>{t('footer.terms.item3')}</li>
                                    <li>{t('footer.terms.item4')}</li>
                                </div>
                            </div>
                            <div className={"col-4 col-md-12 col-sm-12 col-xs-12"}>
                                <div className={"services"}>
                                    <h3>{t('footer.contactInfo')}</h3>
                                    <li><a href={"tel:994552999555"}>+994 55 299 95 55</a></li>
                                    <li><a href={"mailto:info.sssinsaat@gmail.com"}>info.sssinsaat@gmail.com</a></li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <div className={"row created"}>
                            <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                                <div className={"permision"}>
                                    {t('footer.rightsText')}
                                </div>
                            </div>
                            <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                                <div className={"createdBy"}>
                                    <Trans
                                        i18nKey="footer.createdBy"
                                        components={[
                                            <a
                                                href="https://qavo.codes"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                key="qavo"
                                            ></a>
                                        ]}
                                    />
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
