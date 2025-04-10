import { useState, useEffect } from "react";
import "./index.scss";
import banner from "/src/assets/ContactBanner.jpeg";
import { Link } from "react-router-dom";
import CircleText from "../../../components/UserComponents/CircleText/index.jsx";
import { usePostContactMutation } from "../../../services/userApi.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import showToast from "../../../components/ToastMessage.js";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

function Contact() {
    const { t } = useTranslation();
    const [postContact] = usePostContactMutation();

    // Form state-ləri
    const [name, setFirstName] = useState("");
    const [surname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [description, setNote] = useState("");

    // Validasiya error state-i
    const [errors, setErrors] = useState({});

    // AOS initializasiyası
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animasiya müddəti (ms)
            once: true      // Hər element yalnız bir dəfə animasiya edilsin
        });
    }, []);

    // Validasiya funksiyası: hər bir sahəni required kimi yoxlayır
    const validate = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = t("contact.form.errors.firstNameRequired") || "Adınızı daxil edin";
        }
        if (!surname.trim()) {
            newErrors.surname = t("contact.form.errors.lastNameRequired") || "Soyadınızı daxil edin";
        }
        if (!email.trim()) {
            newErrors.email = t("contact.form.errors.emailRequired") || "Emailinizi daxil edin";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = t("contact.form.errors.emailInvalid") || "Düzgün email daxil edin";
        }
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = t("contact.form.errors.phoneRequired") || "Telefon nömrənizi daxil edin";
        }
        if (!description.trim()) {
            newErrors.description = t("contact.form.errors.descriptionRequired") || "Mesajınızı daxil edin";
        }
        return newErrors;
    };

    // Form submit funksiyası
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.error("Validasiya xətaları:", JSON.stringify(validationErrors, null, 2));
            showToast(t("contact.form.validationErrors") || "Xahiş olunur bütün xanalari düzgün doldurun", "error");
            return;
        }
        setErrors({});

        const formData = {
            name,
            surname,
            email,
            phoneNumber,
            description,
        };

        try {
            await postContact(formData).unwrap();
            showToast(t("contact.form.successMessage"), "success");
            // Form reset edirik
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setNote("");
        } catch (error) {
            console.error("Mesaj göndərilərkən xəta baş verdi:", error);
            showToast(t("contact.form.errorMessage"), "error");
        }
    };

    return (
        <div id={"contact-page"}>
            <div
                className={"banner"}
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`,
                }}
                data-aos="fade-in"
            >
                <div className={'container'} data-aos="fade-up">
                    <div className={"head"} data-aos="fade-up">
                        <h1>{t("contact.bannerTitle")}</h1>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="100">
                        <Link to={"/"}>{t("menu.home")}</Link>
                        <div className={"dot"}></div>
                        <Link to={"/contact"}>{t("contact.bannerTitle")}</Link>
                    </p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"header"} data-aos="zoom-in">
                    <h1>{t("contact.headerTitle")}</h1>
                    <div className={"circle"} data-aos="zoom-in" data-aos-delay="100">
                        <CircleText />
                    </div>
                </div>
            </div>
            <div className={"contact"}>
                <div className={"container"}>
                    <div className={"row form-section"}>
                        <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                            <div className={"form"} data-aos="fade-right">
                                <div className={"form-head"}>
                                    <hr />
                                    <h2>{t("contact.form.headTitle")}</h2>
                                </div>
                                <div className={"form-body"}>
                                    <form onSubmit={handleSubmit}>
                                        <div className={"row"}>
                                            <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                                                <label>{t("contact.form.labels.firstName")}</label> <br />
                                                <input
                                                    placeholder={t("contact.form.placeholders.firstName")}
                                                    value={name}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    maxLength={50}
                                                    required
                                                />
                                                {errors.name && <span className="error-message">{errors.name}</span>}
                                            </div>
                                            <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                                                <label>{t("contact.form.labels.lastName")}</label> <br />
                                                <input
                                                    placeholder={t("contact.form.placeholders.lastName")}
                                                    value={surname}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    maxLength={50}
                                                    required
                                                />
                                                {errors.surname && <span className="error-message">{errors.surname}</span>}
                                            </div>
                                            <div className={"col-12"}>
                                                <label>{t("contact.form.labels.email")}</label> <br />
                                                <input
                                                    type="email"
                                                    placeholder={t("contact.form.placeholders.email")}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    maxLength={100}
                                                    required
                                                />
                                                {errors.email && <span className="error-message">{errors.email}</span>}
                                            </div>
                                            <div className={"col-12"}>
                                                <label>{t("contact.form.labels.phone")}</label> <br />
                                                <input
                                                    type="tel"
                                                    placeholder={t("contact.form.placeholders.phone")}
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    maxLength={20}
                                                    required
                                                />
                                                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                                            </div>
                                            <div className={"col-12"}>
                                                <label>{t("contact.form.labels.note")}</label> <br />
                                                <textarea
                                                    rows={5}
                                                    value={description}
                                                    onChange={(e) => setNote(e.target.value)}
                                                    maxLength={700}
                                                    required
                                                />
                                                {errors.description && <span className="error-message">{errors.description}</span>}
                                            </div>
                                            <div className={"col-12"}>
                                                <button type="submit">{t("contact.form.submitButton")}</button>
                                            </div>
                                        </div>
                                    </form>
                                    {Object.keys(errors).length > 0 && (
                                        <div className="error-json">
                                            <h3>{t("contact.form.validationJsonTitle") || "Xətalar (JSON):"}</h3>
                                            <pre>{JSON.stringify(errors, null, 2)}</pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={"col-6 col-md-12 col-sm-12 col-xs-12"}>
                            <div className="map" data-aos="fade-left">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2143.2871150885803!2d49.820814339935694!3d40.39212129227946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDIzJzMyLjYiTiA0OcKwNDknMTkuMiJF!5e1!3m2!1saz!2saz!4v1744207493172!5m2!1saz!2saz"
                                    width="100%"
                                    height="580"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Contact;
