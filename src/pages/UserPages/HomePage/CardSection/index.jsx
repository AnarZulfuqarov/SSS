import Card from "../../../../components/UserComponents/Card/index.jsx";
import image from "/src/assets/DetailBanner.jpeg";
import image2 from "/src/assets/ContactBanner.jpeg";
import image3 from "/src/assets/ServicesBanner.jpeg";
import image4 from "/src/assets/PortfolioBanner.jpeg";
const cardsData = [
    {
        image: image,
        title: "Layihə",
        link: "#",
    },
    {
        image: image2,
        title: "Təmir",
        link: "#",
    },
    {
        image: image3,
        title: "Dizayn",
        link: "#",
    },
    {
        image: image4,
        title: "Dizayn",
        link: "#",
    },
];

const CardsContainer = () => {
    return (
        <div className="row" style={{
            overflow: "hidden",
        }}>
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    image={card.image}
                    title={card.title}
                    link={card.link}
                />
            ))}
        </div>
    );
};

export default CardsContainer;
