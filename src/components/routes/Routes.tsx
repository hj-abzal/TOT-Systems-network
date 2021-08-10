import Container from "@material-ui/core/Container";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { PageType, pages } from "./Pages";

const mappedRoutes = pages.map((p: PageType) => (
    <Route
        key={"route-" + p._id}
        path={p.path && (p.path + (p.params || ""))}
        exact={p.exact}
        render={() => p.page}
    />
));

const Routes = () => {

    return (
        <Container fixed>
            <Switch>
                {mappedRoutes}
            </Switch>
        </Container>
    );
};

export default Routes;
