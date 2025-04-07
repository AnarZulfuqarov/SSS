import React from "react";
import "./index.scss";

const Card = ({ image, title, link }) => {
    return (
        <div className="card" style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay"></div>

            <div className="content">
                <h2>{title}</h2>
                <a href={link} className="arrow-btn">
                    <span className="arrow">&#8594;</span>
                </a>
            </div>
        </div>
    );
};

export default Card;
