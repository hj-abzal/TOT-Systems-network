import React from "react";
import { pages } from "../routes/Pages";
import  { PageLinks } from "../PageLinks/PageLinks";

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
    return (
        <>
            {mappedLinks}
        </>
    );
};

export default DevHeader;
