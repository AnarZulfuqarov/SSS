import "./index.scss";
import { SERVICE_CARD_IMAGES } from "../../../contants.js";

function ServicesCardHome({ service, index }) {
    return (
        <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
            <div id={"services-card"}>
                <img
                    src={SERVICE_CARD_IMAGES + service.cardImage}
                    alt={service.title}
                />
                <div className={"card-number"}>
                    {index !== undefined
                        ? index < 9
                            ? `0${index + 1}`
                            : index + 1
                        : "01"}
                </div>
                <div className={"content"}>
                    <h2>{service.title}</h2>
                    <p>{service.subTitle}</p>
                </div>
            </div>
        </div>
    );
}

export default ServicesCardHome;
