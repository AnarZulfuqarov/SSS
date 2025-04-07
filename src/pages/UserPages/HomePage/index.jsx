import BannerHome from "./Banner/index.jsx";
import AboutHome from "./About/index.jsx";
import CardsContainer from "./CardSection/index.jsx";

function HomePage() {
    return (
        <>
            <BannerHome />
            <AboutHome />
            <CardsContainer/>
        </>
    );
}

export default HomePage;