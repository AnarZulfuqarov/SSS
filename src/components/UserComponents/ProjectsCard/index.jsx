import './index.scss';
import image1 from '/src/assets/projectsCard.png';
import {IoMdArrowUp} from "react-icons/io";

function ProjectsCard() {

    return (
        <section id="projectsCard" className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
            <div className={"wrapper"}>
                <img src={image1} alt={"Image"}/>
                <div className={"title"}>
                    <span>Port Baku</span>
                    <span><IoMdArrowUp className={"icon"}/></span>
                </div>
            </div>
        </section>
    );
}

export default ProjectsCard;
