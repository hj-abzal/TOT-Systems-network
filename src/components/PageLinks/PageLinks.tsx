import React from "react";
import {NavLink, NavLinkProps} from "react-router-dom";
import s from "./PageLinks.module.css";

export type PageLinksPropsType = NavLinkProps & { info?: string };

export const PageLinks: React.FC<PageLinksPropsType> = React.memo((
    {
        info,
        ...props
    }
) => {

    return <NavLink className={s.link} {...props}/>;
});

