import React, { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { Main } from "../../App/Main/Main";
import { Login } from "../../features/authorization/Login/Login";
import { Registration } from "../../features/authorization/Registration/Registration";
import { ProfilePage } from "../../features/ProfilePage/ProfilePage";
import { AuthRedirect } from "../Redirect/AuthRedirect";


export type PageType = {
    _id: number;
    title: string;
    path?: string;
    params?: string;
    exact?: boolean;
    page: ReactNode;
};

export const PATH = {
    LOGIN: "/login",
    REGISTER: "/register",
    MAIN: "/main"
};

export const pages: PageType[] = [
    {
        _id: 0, title: "main", path: "/", exact: true,
        page: <AuthRedirect> <Main /> </AuthRedirect>
    },
    { _id: 1, title: "login", path: PATH.LOGIN, exact: true, page: <Login /> },
    { _id: 2, title: "register", path: PATH.REGISTER, exact: true, page: <Registration /> },
    { _id: 777, title: "error404", page: <div>error404</div> }
];
