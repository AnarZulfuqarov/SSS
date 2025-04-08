import './index.scss'
import back from "/src/assets/back.png"
import ServicesCard from "../../../../components/UserComponents/ServicesCard/index.jsx";
import {RiArrowRightUpLine} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import ServicesCardHome from "../../../../components/UserComponents/ServicesCardHome/index.jsx";
import {useGetAllServicesQuery} from "../../../../services/userApi.jsx";
function ServiceHome() {
    const navigate = useNavigate();
    const {data:getAllServices} = useGetAllServicesQuery()
    const services = getAllServices?.data
    return (
        <div id={"serviceHome"}>
            <div className={"container"}>
                <div className={"head"}>
                    <div className={"head-left"}>
                        <hr/>
                        <h4>Bizim Nə Təklif Edirik?</h4>
                    </div>
                    <div className={"head-right"}>
                        <h1>Xidmətlərimiz</h1>
                    </div>
                </div>
                <div className={"row"}>
                    {services && services.map((service, index) => (
                        <ServicesCardHome key={service.id} service={service} index={index}/>
                    ))}

                </div>
                <div>
                    <div className={"more"}>
                        Hamısına bax
                        <button onClick={()=>navigate("/services")}><RiArrowRightUpLine /></button>
                    </div>
                </div>
            </div>
            <img src={back} alt="Back" className="img-fluid"/>
        </div>
    );
}

export default ServiceHome;