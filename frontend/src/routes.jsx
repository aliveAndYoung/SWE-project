import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import SearchFlights from "./pages/SearchFlights";
import Account from "./pages/Account";
import FlightDetails from "./pages/FlightDetails";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "search-flights", element: <SearchFlights /> },
            { path: "account", element: <Account /> },
            { path: "flights/:id", element: <FlightDetails /> },
            { path: "login", element: <Login /> },
            { path: "booking", element: <Booking /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;
