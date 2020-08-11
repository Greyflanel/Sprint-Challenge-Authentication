/*This is a component from the Farmers Market app. I went with auth0, but I wanted to keep this for future reference*/

import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
    username: "",
    token: "",
    error: null
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;