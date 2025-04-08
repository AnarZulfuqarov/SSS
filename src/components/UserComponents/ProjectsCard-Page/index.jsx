import './index.scss';
import image1 from '/src/assets/projectsCard.png';
import {IoMdArrowUp} from "react-icons/io";
import {PROJECT_CARD_IMAGES} from "../../../contants.js";
import {useNavigate} from "react-router-dom";

function ProjectCardPage({project}) {
    const navigate = useNavigate();
    return (
        <section id="projectsCard" className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
            <div className={"wrapper"}>
                <img src={PROJECT_CARD_IMAGES + project.cardImage} alt={"Image"}/>
                <div className={"title"}>
                    <span>{project.title}</span>
                    <span><IoMdArrowUp className={"icon"} onClick={()=>navigate(`/portfolio/${project.id}`)}/></span>
                </div>
            </div>
        </section>
    );
}

export default ProjectCardPage;
