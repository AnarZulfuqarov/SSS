import './index.scss'
// import logo from "../../../assets/LogoEsasRed.png"
import { NavLink, useLocation } from "react-router-dom";
import {TbBrandCashapp, TbLogs, TbReservedLine} from "react-icons/tb";
import { FaRegCommentDots } from "react-icons/fa";
import {MdOutlineAccountBalance, MdOutlineMiscellaneousServices, MdOutlineTour} from "react-icons/md";
import { PiCityLight } from "react-icons/pi";
import {RiContactsBook2Fill} from "react-icons/ri";

function AdminLeftBar() {
    const location = useLocation();

    return (
        <section id="adminLeftBar">
            {/*<img src={logo} alt="logo" />*/}
            <li className={location.pathname === "/admin/portfolio" ? "selected" : ""}>
                <TbLogs className="icon" />
                <NavLink to="/admin/portfolio">
                    Portfolio
                </NavLink>
            </li>
            <li className={location.pathname === "/admin/services" ? "selected" : ""}>
                <MdOutlineMiscellaneousServices  className="icon" />
                <NavLink to="/admin/services">
                    Xidmətlər
                </NavLink>
            </li>
            <li className={location.pathname === "/admin/contact" ? "selected" : ""}>
                <RiContactsBook2Fill className="icon" />
                <NavLink to="/admin/contact">
                    Əlaqə
                </NavLink>
            </li>

        </section>
    );
}

export default AdminLeftBar;
