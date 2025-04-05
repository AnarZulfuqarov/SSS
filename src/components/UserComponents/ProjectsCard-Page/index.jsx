import './index.scss';
import image1 from '/src/assets/projectsCard.png';
import {IoMdArrowUp} from "react-icons/io";

function ProjectCardPage() {

    return (
        <section id="projectsCard" className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
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

export default ProjectCardPage;
