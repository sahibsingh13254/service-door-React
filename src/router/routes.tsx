import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Book from "../pages/Book";
import About from "../pages/About";
import HowItWorks from "../pages/HowItWorks";

export const router = createBrowserRouter([
{
path: "/",
element: <RootLayout />,
children: [
{ index: true, element: <Home /> },
{ path: "services", element: <Services /> },
{ path: "book", element: <Book /> },
{ path: "about", element: <About /> },
{ path: "how-it-works", element: <HowItWorks /> }
]
}
]);