import banner from "../../../assets/PortfolioBanner.jpeg";
import {Link} from "react-router-dom";
import "./index.scss"
import ProjectCardPage from "../../../components/UserComponents/ProjectsCard-Page/index.jsx";
import Pagination from "../../../components/UserComponents/Pagination/index.jsx";
import {useState} from "react";

function Porfolio() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Müvəqqəti 5 səhifə

    const handlePageChange = (page) => {
        console.log("Səhifə dəyişdi:", page);
        setCurrentPage(page);
    };
    return (
        <div id={"portfolio-page"}>
            <div className={"banner"}
                 style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`}}>
                <div className={'container'}>
                    <div className={"head"}>
                        <h1>Layihələrimiz</h1>
                    </div>
                    <p><Link to={"/"}>Ana səhifə</Link>
                        <div className={"dot"}></div>
                        <Link to={"/portfolio"}>Layihələrimiz</Link></p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"portfolio"}>
                    <div className={"head"}>
                        <div className={"head-left"}>
                            <hr/>
                            <h4>Uğurlarımız</h4>
                        </div>
                        <div className={"head-right"}>
                            <h1>Uğurla Tamamladığımız Layihələr</h1>
                        </div>
                    </div>
                    <div className={"row"}>
                        <ProjectCardPage/>
                        <ProjectCardPage/>
                        <ProjectCardPage/>
                        <ProjectCardPage/>
                        <ProjectCardPage/>
                        <ProjectCardPage/>
                    </div>
                    <div>
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