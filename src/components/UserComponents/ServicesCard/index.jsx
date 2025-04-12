import React from "react";
import "./index.scss";
import { SERVICE_CARD_IMAGES } from "../../../contants.js";
import { useTranslation } from "react-i18next";

function ServicesCard({ service, index, activeCard, setActiveCard }) {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const isExpanded = activeCard === index;

    // Xidmət başlığı üçün çoxdilli seçim
    let serviceTitle = service.title;
    let serviceSubTitle = service.subTitle;

    if (currentLanguage === "en") {
        serviceTitle = service.titleEng || service.title;
        serviceSubTitle = service.subTitleEng || service.subTitle;
    } else if (currentLanguage === "ru") {
        serviceTitle = service.titleRu || service.title;
        serviceSubTitle = service.subTitleRu || service.subTitle;
    }

    // Inline style: 4 sətir ellipsis (əgər açıq deyilsə)
    const subtitleStyle = isExpanded
        ? {} // Tam mətni göstərmək üçün heç bir məhdudiyyət yoxdur
        : {
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
        };

    // Toggle funksiyası: eyni kart kliklənibsə bağla, fərqli olsa həmin kartı aç
    const toggleExpand = () => {
        setActiveCard(isExpanded ? null : index);
    };

    return (
        <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
            <div id={"services-card"}>
                <img
                    src={SERVICE_CARD_IMAGES + service.cardImage}
                    alt={serviceTitle}
                />
                <div className={"card-number"}>
                    {index !== undefined
                        ? index < 9
                            ? `0${index + 1}`
                            : index + 1
                        : "01"}
                </div>
                <div className={"content"}>
                    <h2>{serviceTitle}</h2>
                    <p style={subtitleStyle}>
                        {serviceSubTitle}
                    </p>
                    {!isExpanded ? (
                        <span
                            onClick={toggleExpand}
                            style={{ cursor: "pointer", color: "#EE9026" }}
                        >
                            ... {/* "Read More" vizual işarə */}
                        </span>
                    ) : (
                        <span
                            onClick={toggleExpand}
                            style={{ cursor: "pointer", color: "#EE9026",marginTop:"10px",display:"inline-block" }}
                        >
                            {t("about.show")}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ServicesCard;
