import './index.scss';
import image1 from '/src/assets/projectsCard.png';
import {IoMdArrowUp} from "react-icons/io";
import {PROJECT_CARD_IMAGES} from "../../../contants.js";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function ProjectsCardTest({project}) {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    // Layihə başlığını istifadəçi dilinə görə təyin edirik
    let projectTitle = project?.title;
    if (currentLanguage === "en") {
        projectTitle = project?.titleEng || project?.title;
    } else if (currentLanguage === "ru") {
        projectTitle = project?.titleRu || project?.title;
    }
    return (
        <section id="projectsCard" className={"col-4 col-md-4 col-sm-12 col-xs-12"} style={{width:'100%'}} >
            <div className={"wrapper"} onClick={()=>navigate(`/portfolio/${project?.id}`)}>
                <img src={PROJECT_CARD_IMAGES + project?.cardImage} alt={"Image"}/>
                <div className={"title"}>
                    <span>{projectTitle}</span>
                    <span><IoMdArrowUp className={"icon"} onClick={()=>navigate(`/portfolio/${project?.id}`)}/></span>
                </div>
            </div>
        </section>
    );
}

export default ProjectsCardTest;