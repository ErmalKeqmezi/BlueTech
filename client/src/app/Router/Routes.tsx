import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import React from "react";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'about', element: <AboutPage /> },
        ]
    }
])