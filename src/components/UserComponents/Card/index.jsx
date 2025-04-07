import "./index.scss";

const Card = ({image, title, link}) => {
    return (
        <div className="card">
            <img src={image} alt="Image"/>
            <div className={"content"}>
                Zakir
            </div>
        </div>
    );
};

export default Card;
