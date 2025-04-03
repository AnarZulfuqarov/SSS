import './App.css'
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router-dom";
import ROUTES from "./routes/ROUTES.jsx";
import ServicesCard from "./components/UserComponents/ServicesCard/index.jsx";

function App() {
    const routes = createBrowserRouter(ROUTES);

    return (
        <>
            <RouterProvider router={routes}/>
            <div className={"container"}>
                <div className="row">
                    <ServicesCard/>
                    <ServicesCard/>
                </div>
            </div>
        </>
    )
}

export default App