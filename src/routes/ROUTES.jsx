import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute.jsx";
import MainPage from "../pages/index.jsx";
import HomePage from "../pages/UserPages/HomePage/index.jsx";
import AdminPage from "../components/AdminComponents/AdminPage/index.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            // {
            //     path: "/contact",
            //     element: <Contact/>
            // },
            // {
            //     path: "/blog",
            //     element: <Blogs/>
            // },
            // {
            //     path: "/about",
            //     element: <About/>
            // },
            // {
            //     path: "/services",
            //     element: <Services/>
            // },

            // {
            //     path: "/blogs/:blogId",
            //     element: <BlogDetail/>
            // },

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
            // {
            //     path: "/admin/blog",
            //     element: <AdminBlog/>,
            // },
            // {
            //     path: "/admin/cities",
            //     element: <AdminCity/>,
            // },
            // {
            //     path: "/admin/countries",
            //     element: <AdminCountry/>,
            // },
            // {
            //     path: "/admin/customersViews",
            //     element: <AdminCustomerView/>
            // },
            // {
            //     path: "/admin/tours",
            //     element: <AdminTour/>
            // },
            // {
            //     path: "/admin/reserv",
            //     element: <AdminReserved/>,
            // },
            // {
            //     path: "/admin/contact",
            //     element: <AdminContact/>,
            // }
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
]);

export default router;
