import React from "react";
import {FaArrowRight} from "react-icons/fa";
import "./index.scss";
import {useTranslation} from "react-i18next";

const CircleTextWhite = () => {
    const { t } = useTranslation();
    return (
        <div className="circle-text-wrapper-white">
            <svg
                className="circle-text-svg"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Dairəvi yol (path) tərifi */}
                    <path
                        id="circlePath"
                        d="
              M 100,100
              m -70,0
              a 70,70 0 1,1 140,0
              a 70,70 0 1,1 -140,0
            "
                    />
                </defs>

                {/* Mətni dairəvi göstərmək üçün textPath istifadə edirik */}
                <text
                    fill="#ffffff"
                    fontSize={
                        localStorage.getItem("sssLanguage") === 'az' ? '13' :
                            localStorage.getItem("sssLanguage") === 'en' ? '13.5' : '11'
                    }
                    letterSpacing="1.6"
                    fontFamily="sans-serif"
                >
                    <textPath xlinkHref="#circlePath" startOffset="50%" textAnchor="middle">
                        {t("circleText")}
                    </textPath>
                </text>
            </svg>

            {/* Mərkəzdə sabit qalan ox (React Icons) */}
            <FaArrowRight className="center-arrow"/>
        </div>
    );
};

export default CircleTextWhite;
