import React, { useState } from 'react';
import './index.scss';

const CardCertificate = ({ image, number, text, index }) => {
    const layoutClass = index % 2 === 0 ? 'layout1' : 'layout2';
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = (e) => {
        // Modalın içindəki contentə kliklədikdə bağlanmaması üçün
        e.stopPropagation();
        setIsModalOpen(false);
    };

    return (
        <div className="col-3 col-md-6 col-sm-6 col-xs-6" style={{ padding: "8px" }}>
            <div className="card-certificate" style={{ backgroundImage: `url(${image})` }} onClick={openModal}>
                <div className={`overlay ${layoutClass}`}>
                    <div className="number">{number}</div>
                    <div className="text">{text}</div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={image} alt="Certificate" />
                        <button className="close-button" onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardCertificate;
