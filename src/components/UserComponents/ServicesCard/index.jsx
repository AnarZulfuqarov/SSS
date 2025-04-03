import "./index.scss"
import image from "/src/assets/cement-bag_186840811.png"
import {RiArrowRightUpLine} from "react-icons/ri";
function ServicesCard() {
    return (
        <div className={"col-3"}>
            <div id={"services-card"}>
                <img src={image} alt=""/>
                <div className={"card-number"}>01</div>
                <div className={"content"}>
                    <h2>Metal konstruksiya</h2>
                    <p>Möhkəmlik, davamlılıq və dəqiqlik ilə fərqlənən metal konstruksiya işlərimiz, sənaye və mülki tikinti sahəsində etibarlı həllər təqdim edir.</p>
                </div>
                <div className={"more"}>
                    Daha ətraflı
                    <button><RiArrowRightUpLine /></button>
                </div>
            </div>
        </div>
    );
}

export default ServicesCard