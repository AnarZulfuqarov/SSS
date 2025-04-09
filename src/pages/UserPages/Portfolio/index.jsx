import React, { useEffect, useState } from "react";
import banner from "../../../assets/PortfolioBanner.jpeg";
import { Link } from "react-router-dom";
import "./index.scss";
import ProjectCardPage from "../../../components/UserComponents/ProjectsCard-Page/index.jsx";
import Pagination from "../../../components/UserComponents/Pagination/index.jsx";
import { useGetAllProjectQuery } from "../../../services/userApi.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

function Porfolio() {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Hər səhifədə göstəriləcək layihələrin sayı

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const handlePageChange = (page) => {
        console.log("Səhifə dəyişdi:", page);
        setCurrentPage(page);
    };

    // API-dən gələn bütün layihələr
    const { data: getAllProject } = useGetAllProjectQuery();
    const projects = getAllProject?.data || [];

    // Dinamik olaraq toplam səhifələrin sayını hesablamaq
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    // Cari səhifəyə uyğun layihələri seçmək
    const indexOfLastProject = currentPage * itemsPerPage;
    const indexOfFirstProject = indexOfLastProject - itemsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    console.log("Cari Layihələr:", currentProjects);

    return (
        <div id={"portfolio-page"}>
            <div
                className={"banner"}
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`
                }}
                data-aos="fade-in"
            >
                <div className={'container'}>
                    <div className={"head"} data-aos="fade-up">
                        <h1>{t("portfolio.bannerTitle")}</h1>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="100">
                        <Link to={"/"}>{t("menu.home")}</Link>
                        <div className={"dot"}></div>
                        <Link to={"/portfolio"}>{t("portfolio.bannerTitle")}</Link>
                    </p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"portfolio"}>
                    <div className={"head"}>
                        <div className={"head-left"} data-aos="fade-right">
                            <hr/>
                            <h4>{t("portfolio.head.left")}</h4>
                        </div>
                        <div className={"head-right"} data-aos="fade-left">
                            <h1>{t("portfolio.head.right")}</h1>
                        </div>
                    </div>
                    <div className={"row"}>
                        {currentProjects.map((project, index) => (
                            <ProjectCardPage
                                key={project.id}
                                project={project}
                                dataAos="zoom-in"
                                dataAosDelay={index * 100}
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
