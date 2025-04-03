import ProtectedRoute from "../ProtectedRoute.jsx";
import MainPage from "../pages/index.jsx";
import HomePage from "../pages/UserPages/HomePage/index.jsx";
import AdminPage from "../components/AdminComponents/AdminPage/index.jsx";
import NotFound from "../pages/UserPages/Not Found/NotFound.jsx";


const router = [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
        ]
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminPage/>
            </ProtectedRoute>
        )
    },
    {
        path: "*",
        element: <NotFound/>
    }
];

export default router;
