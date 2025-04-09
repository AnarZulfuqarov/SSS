import React, { useEffect, useState } from "react";
import banner from "../../../assets/PortfolioBanner.jpeg";
import { Link } from "react-router-dom";
import "./index.scss";
import ProjectCardPage from "../../../components/UserComponents/ProjectsCard-Page/index.jsx";
import Pagination from "../../../components/UserComponents/Pagination/index.jsx";
import { useGetAllProjectQuery } from "../../../services/userApi.jsx";
import AOS from "aos"; // AOS-u idxal edirik
import "aos/dist/aos.css"; // AOS CSS-ni idxal edirik

function Porfolio() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Müvəqqəti 5 səhifə

    useEffect(() => {
        AOS.init({
            duration: 1000, // animasiya müddəti, ms şəklində
            once: true,     // element yalnız bir dəfə animasiya edilsin
        });
    }, []);

    const handlePageChange = (page) => {
        console.log("Səhifə dəyişdi:", page);
        setCurrentPage(page);
    };

    const { data: getAllProject } = useGetAllProjectQuery();
    const projects = getAllProject?.data;
    console.log(projects);

    return (
        <div id={"portfolio-page"}>
            <div
                className={"banner"}
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`
                }}
                data-aos="fade-in" // Banner üçün animasiya əlavə edirik
            >
                <div className={'container'}>
                    <div className={"head"} data-aos="fade-up">
                        <h1>Layihələrimiz</h1>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="100">
                        <Link to={"/"}>Ana səhifə</Link>
                        <div className={"dot"}></div>
                        <Link to={"/portfolio"}>Layihələrimiz</Link>
                    </p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"portfolio"}>
                    <div className={"head"}>
                        <div className={"head-left"} data-aos="fade-right">
                            <hr/>
                            <h4>Uğurlarımız</h4>
                        </div>
                        <div className={"head-right"} data-aos="fade-left">
                            <h1>Uğurla Tamamladığımız Layihələr</h1>
                        </div>
                    </div>
                    <div className={"row"}>
                        {projects && projects.map((project, index) => (
                            // Hər bir layihə kartı üçün delay ilə animasiya əlavə edə bilərsiniz
                            <ProjectCardPage
                                key={project.id}
                                project={project}
                                dataAos="zoom-in"  // Project card üçün animasiya növü
                                dataAosDelay={index * 100} // Delay, ardıcıllığa görə
                            />
                        ))}
                    </div>
                    <div data-aos="fade-up">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Porfolio;
