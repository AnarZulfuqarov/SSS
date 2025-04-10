import React from "react";
import Card from "../../../../components/UserComponents/Card/index.jsx";
import image from "/src/assets/DetailBanner.jpeg";
import image2 from "/src/assets/ContactBanner.jpeg";
import image3 from "/src/assets/ServicesBanner.jpeg";
import image4 from "/src/assets/PortfolioBanner.jpeg";
import { useTranslation } from "react-i18next";

const cardsData = [
    {
        image: image,
        titleKey: "cardsContainer.project",
        link: "#",
    },
    {
        image: image2,
        titleKey: "cardsContainer.repair",
        link: "#",
    },
    {
        image: image3,
        titleKey: "cardsContainer.design",
        link: "#",
    },
    {
        image: image4,
        titleKey: "cardsContainer.construction",
        link: "#",
    },
];

const CardsContainer = () => {
    const { t } = useTranslation();

    return (
        <section id="cardsContainer">
            <div className="row" style={{ overflow: "hidden" }}>
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        image={card.image}
                        title={t(card.titleKey)}
                        link={card.link}
                    />
                ))}
            </div>
        </section>
    );
};

export default CardsContainer;
