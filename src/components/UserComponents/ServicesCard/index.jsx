import "./index.scss";
import { SERVICE_CARD_IMAGES } from "../../../contants.js";
import { useTranslation } from "react-i18next";

function ServicesCard({ service, index }) {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

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
                    <p>{serviceSubTitle}</p>
                </div>
            </div>
        </div>
    );
}

export default ServicesCard;
