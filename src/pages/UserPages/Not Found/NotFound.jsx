import main from '/src/assets/404.png'
import "./notFound.scss"
import {Link} from "react-router-dom";
function NotFound() {
    return (
        <div className={"notFound"}>
            <div style={{width:"23%"}}>
                    <img src={main} alt="Not Found" className={"notFoundImage"}/>
                <p>Opps! Page Not Found</p>
               <div style={{textAlign:"center"}}>
                   <button ><Link to={"/"} style={{color:"white"}}> BACK TO HOME</Link></button>
               </div>
            </div>
        </div>
    );
}

export default NotFound;