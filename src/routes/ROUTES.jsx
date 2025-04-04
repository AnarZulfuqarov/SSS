// import ProtectedRoute from "../ProtectedRoute.jsx";
import MainPage from "../pages/index.jsx";
import HomePage from "../pages/UserPages/HomePage/index.jsx";
import AdminPage from "../components/AdminComponents/AdminPage/index.jsx";
import NotFound from "../pages/UserPages/Not Found/NotFound.jsx";
import Contact from "../pages/UserPages/Contact/index.jsx";
import Portfolio from "../pages/UserPages/Portfolio/index.jsx";
import Services from "../pages/UserPages/Services/index.jsx";
import PortfolioDetail from "../pages/UserPages/PortfolioDetail/index.jsx";
import AdminBrand from "../pages/AdminPages/AdminBrand/index.jsx";


const router = [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/portfolio",
                element: <Portfolio/>
            },
            {
                path: "/services",
                element: <Services/>
            },
            {
                path: "/portfolio/:id",
                element: <PortfolioDetail/>
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminPage/>,
        children: [
            {
                path: "/admin/brand",
                element: <AdminBrand/>
            },
            {
                path: "/admin/portfolio",
                element: <AdminBrand/>
            },
            {
                path: "/admin/services",
                element: <AdminBrand/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
];

export default router;
