import MainPage from "../pages/index.jsx";
import HomePage from "../pages/UserPages/HomePage/index.jsx";
import AdminPage from "../components/AdminComponents/AdminPage/index.jsx";
import NotFound from "../pages/UserPages/Not Found/NotFound.jsx";
import Contact from "../pages/UserPages/Contact/index.jsx";
import Portfolio from "../pages/UserPages/Portfolio/index.jsx";
import Services from "../pages/UserPages/Services/index.jsx";
import PortfolioDetail from "../pages/UserPages/PortfolioDetail/index.jsx";
import AdminBrand from "../pages/AdminPages/AdminContact/index.jsx";
import AboutUs from "../pages/UserPages/AboutUs/index.jsx";
import AdminLogin from "../pages/AdminPages/AdminLogin/index.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import AdminPortfolio from "../pages/AdminPages/AdminPortfolio/index.jsx";
import AdminServices from "../pages/AdminPages/AdminServices/index.jsx";


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
            },
            {
                path: "/about",
                element: <AboutUs/>
            }
        ]
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminPage/>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/admin/contact",
                element: <AdminBrand/>
            },
            {
                path: "/admin/portfolio",
                element: <AdminPortfolio/>
            },
            {
                path: "/admin/services",
                element: <AdminServices/>
            }
        ]
    },
    {
      path: "/login",
      element: <AdminLogin/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
];

export default router;
