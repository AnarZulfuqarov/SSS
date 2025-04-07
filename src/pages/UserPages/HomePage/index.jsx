import BannerHome from "./Banner/index.jsx";
import AboutHome from "./About/index.jsx";
import CardsContainer from "./CardSection/index.jsx";
import WhyChoose from "./WhyChoose/index.jsx";
import ServiceHome from "./Services/index.jsx";
import Sponsor from "../../../components/UserComponents/Sponsor/index.jsx";
import './index.scss'
function HomePage() {
    return (
        <div className="HomePage">
            <BannerHome />
            <AboutHome />
            <CardsContainer/>
            <WhyChoose/>
            {/*<AboutHome/>*/}
            <ServiceHome/>
            <div className={"brand"}>
                <div className={"container"}>
                    <div className={"head"}>
                        <div className={"head-left"}>
                            <hr/>
                            <h4>Tərəfdaşlarımız kimlərdir?</h4>
                        </div>
                    </div>
                </div>
                <Sponsor/>
            </div>
        </div>
    );
}

export default HomePage;