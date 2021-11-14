import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ProtectedRoute ({ component: Component, auth, role = [99], redirect = "/", ...rest }) {
    const dispatch = useDispatch();
    const authentication = useSelector(({ authentication }) => authentication);
    console.log('Currnet Path :', rest.path)
    // console.log('Role :', role)

    if ( rest.path === "/sign-in" ) {
        if ( authentication.phone_number === "09xxxxxx00" ) {
            return <Redirect to={redirect} />
        } else return <Route {...rest} render={(props) => (<Component {...props} />)} />
    }
};

export default ProtectedRoute;

