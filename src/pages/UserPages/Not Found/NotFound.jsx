// import main from '../../../assets/mainRed.png'
// import bg from '../../../assets/bg.png'
import "./notFound.scss"
import {Link} from "react-router-dom";
function NotFound() {
    return (
        <div className={"notFound"}>
            <div style={{width:"23%"}}>
                {/*<div  className={"notFoundImage"} style={{backgroundImage: 'url(' + bg + ')',backgroundRepeat:"no-repeat"}}>*/}
                {/*    /!*<img src={} alt="Not Found" />*!/*/}
                {/*</div>*/}
                <h2>404 - Page Not Found</h2>
                <p>But don’t worry, we’ll help you find your way back!</p>
                <button ><Link to={"/"} style={{color:"white"}}>Go back</Link></button>
            </div>
        </div>
    );
}

export default NotFound;