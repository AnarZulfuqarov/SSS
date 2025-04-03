import './App.css'
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router-dom";
import ROUTES from "./routes/ROUTES.jsx";

function App() {
    const routes = createBrowserRouter(ROUTES);

    return (
        <RouterProvider router={routes}/>
    )
}

export default App