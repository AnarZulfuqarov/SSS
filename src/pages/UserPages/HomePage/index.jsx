import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import Footer from "../../../components/UserComponents/Footer/index.jsx";
import ProjectsCard from "../../../components/UserComponents/ProjectsCard/index.jsx";
import ServicesCard from "../../../components/UserComponents/ServicesCard/index.jsx";

function HomePage() {
    return (
        <section id={"homePage"}>
            <div className={"container"}>
                <div className={"row"}>
                    <ProjectsCard/>
                    <ProjectsCard/>
                    <ProjectsCard/>
                </div>
                <div className={"row"}>
                    <ServicesCard/>
                    <ServicesCard/>
                    <ServicesCard/>
                    <ServicesCard/>
                </div>
            </div>
        </section>
    );
}

export default HomePage;