import {createBrowserRouter , Navigate } from "react-router-dom"
import LayoutAdmin from "./Layouts/LayoutAdmin";
import LayoutWebsite from "./Layouts/LayoutWebsite";
import AboutPage from "./pages/AboutPage";
import AdminProduct from "./pages/admin/product";
import AddProduct from "./pages/admin/product/add";
import UpdateProduct from "./pages/admin/product/Update";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
// import HomePage from "./pages/HomePage"

const routers = createBrowserRouter([
    { path: "/", element: <LayoutWebsite /> , children:[

        {index : true , element:<HomePage/>},
        {path: "/about" , element:<AboutPage/>},
        {path : "product" , element:<ProductList/>},
        {path : "cart" , element:<Cart/>},
        {path : "product/:id" , element:<ProductDetail/>}
    ] },
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            {
                path: "dashboard",
                element: <h2 className="font-bold text-2xl">Thống kê</h2>,
            },{
                path:"product",
                element:<AdminProduct/>
            },
            {
                path:"product/add",
                element:<AddProduct/>
            },
            {
                path:"product/:idProduct/update",
                element:<UpdateProduct/>
            }
        ],
    },
])


export default routers;