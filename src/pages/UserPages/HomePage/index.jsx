import Navbar from "../../../components/UserComponents/Navbar/index.jsx";
import Footer from "../../../components/UserComponents/Footer/index.jsx";
import ProjectsCard from "../../../components/UserComponents/ProjectsCard/index.jsx";

function HomePage() {
    return (
        <section id={"homePage"}>
            <Navbar/>
            <div className={"container"}>
                <div className={"row"}>
                    <ProjectsCard/>
                    <ProjectsCard/>
                    <ProjectsCard/>
                </div>
            </div>
            <Footer/>
        </section>
    );
}

export default HomePage;