import "./index.scss";
import {IoArrowForward} from "react-icons/io5";

const Card = ({image, title, link}) => {
    return (
        <div className="card">
            <img src={image} alt="Image"/>
            <div className={"content"}>
                <h3>{title}</h3>
                <button><IoArrowForward /></button>
            </div>
        </div>
    );
};

export default Card;
