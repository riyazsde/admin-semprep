/** @format */

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const LogOutHandler = () => {
    const navigate = useNavigate();
    localStorage.clear();
    navigate("/");
};



export {
    ScrollToTop,
    LogOutHandler,
};