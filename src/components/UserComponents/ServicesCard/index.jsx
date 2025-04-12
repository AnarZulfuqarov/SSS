import React, { useState } from "react";
import "./index.scss";
import { SERVICE_CARD_IMAGES } from "../../../contants.js";
import { useTranslation } from "react-i18next";

function ServicesCard({ service, index }) {
    const { t,i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [expanded, setExpanded] = useState(false);

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

    // Inline style: 4 sətir ellipsis
    const subtitleStyle = expanded
        ? {} // Tam mətni göstərmək üçün heç bir məhdudiyyət yoxdur
        : {
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
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
                    {!expanded ? (
                        <span
                            onClick={() => setExpanded(true)}
                            style={{ cursor: "pointer", color: "#EE9026" }}
                        >
              ... {/* Burada "read more" funksionallığı üçün vizual işarə */}
            </span>
                    ) : (
                        <span
                            onClick={() => setExpanded(false)}
                            style={{ cursor: "pointer", color: "#EE9026" }}
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
