import {Outlet, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import AdminLeftBar from "../AdminLeftBar/index.jsx";
import {RiLogoutBoxLine} from "react-icons/ri";
import profile from "../../../assets/image-pBWKwnIj.webp";

function AdminPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('premierTourToken');
        navigate('/');
    };

    return (
        <section id="adminPage">
            <AdminLeftBar/>
            <div className="adminRightBar">
                <div className="adminTopBar">
                    <button onClick={handleLogout}><RiLogoutBoxLine/></button>
                    <p>Admin</p>
                    <img src={profile} alt="profile"/>
                </div>
                <div className="rightBottomBar">
                    <Outlet/>
                </div>
            </div>
        </section>
    );
}

export default AdminPage;