import {createBrowserRouter} from "react-router-dom";
import React from "react";
import App from "../App";
import Home from "../components/Home";
import RepositoryPage from "../components/RepositoryPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "/:owner/:repo",
                element: <RepositoryPage/>,
            },
        ]
    }
], {basename: process.env.PUBLIC_URL});