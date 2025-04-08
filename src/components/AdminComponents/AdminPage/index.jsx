import {Outlet, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import AdminLeftBar from "../AdminLeftBar/index.jsx";
import {RiLogoutBoxLine} from "react-icons/ri";
import  image1 from "/src/assets/profile.webp"
import './index.scss'
function AdminPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('sssToken');
        navigate('/');
    };

    return (
        <section id="adminPage">
            <AdminLeftBar/>
            <div className="adminRightBar">
                <div className="adminTopBar">
                    <button onClick={handleLogout}><RiLogoutBoxLine/></button>
                    <p>Admin</p>
                    <img src={image1} alt="profile"/>
                </div>
                <div className="rightBottomBar">
                    <Outlet/>
                </div>
            </div>
        </section>
    );
}

export default AdminPage;