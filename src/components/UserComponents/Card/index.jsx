import "./index.scss";
import {IoArrowForward} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const Card = ({image, title, link}) => {
    const navigate = useNavigate();
    return (
        <div className="card col-4 col-md-12 col-sm-12 col-xs-12" onClick={()=>navigate("/portfolio")}>
            <img src={image} alt="Image"/>
            <div className={"content"}>
                <h3>{title}</h3>
                <button onClick={()=>navigate("/portfolio")}><IoArrowForward /></button>
            </div>
        </div>
    );
};

export default Card;
