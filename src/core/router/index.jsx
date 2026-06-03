import { homeRoute } from "./home.route";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../../view/pages/not-found";


export const routes = createBrowserRouter([
    ...homeRoute,

    {
        path: "*",
        element: <NotFound />,
    },
]);