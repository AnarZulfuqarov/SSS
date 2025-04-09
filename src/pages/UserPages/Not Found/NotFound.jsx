import main from '/src/assets/404.png'
import "./notFound.scss"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
    const { t } = useTranslation();

    return (
        <div className={"notFound"}>
            <div style={{ width: "23%" }}>
                <img src={main} alt="Not Found" className={"notFoundImage"} />
                <p>{t("notFound.message")}</p>
                <div style={{ textAlign: "center" }}>
                    <button>
                        <Link to={"/"} style={{ color: "white" }}>
                            {t("notFound.homeButton")}
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
