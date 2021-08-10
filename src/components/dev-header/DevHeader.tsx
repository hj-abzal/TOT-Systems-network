import React from "react";
import { pages } from "../routes/Pages";
import  { PageLinks } from "../PageLinks/PageLinks";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../App/store";
import { logOut } from "../../features/authorization/Login/loginReducer";

const mappedLinks = pages.map(p => (
    <PageLinks
        key={"navLink-" + p._id}
        to={(p.path || "/error404") + (p.params ? "/1" : "")}
        info={"navLink-" + p._id}
    >
        {p.title}
    </PageLinks>
));

const DevHeader = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(logOut())
    }
    return (
        <div>
            {mappedLinks}
            {isLoggedIn&& <button onClick={onClickHandler}>Logout</button>}
        </div>
    );
};

export default DevHeader;
