import { Layout } from "../../view/layout/home-layout";
import Home from "../../view/pages/home";

export const homeRoute = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {

                index : true,
                element : <Home />
            }

        ]

    }
]