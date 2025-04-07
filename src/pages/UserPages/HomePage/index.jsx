import BannerHome from "./Banner/index.jsx";
import AboutHome from "./About/index.jsx";
import CardsContainer from "./CardSection/index.jsx";
import WhyChoose from "./WhyChoose/index.jsx";
import ServiceHome from "./Services/index.jsx";

function HomePage() {
    return (
        <>
            <BannerHome />
            <AboutHome />
            <CardsContainer/>
            <WhyChoose/>
            {/*<AboutHome/>*/}
            <ServiceHome/>
        </>
    );
}

export default HomePage;