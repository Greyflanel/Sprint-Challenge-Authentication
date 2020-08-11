/*This is a component from the Farmers Market app. I went with auth0, but I wanted to keep this for future reference*/

import React, { useState, useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, Button, Error } from "./AuthForm";
import { Context } from "../Store";

const Login = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useContext(Context);
  const referer = props.location;

  const postLogin = () => {
    console.log(props.history)
    axios
      .post("http://localhost:4000/api/login", {
        username,
        password
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'SET_TOKEN', payload: res.data.token })
          dispatch({ type: 'SET_USERNAME', payload: username })
          setIsLoggedIn(true);
        }
      })
      .catch(error => {
        dispatch({ type: 'SET_ERROR', payload: {error} })
        console.log({ error });
        setIsError(true);
      });
  };
  const auth = useContext(Context);
  console.log(auth)
  if (isLoggedIn || auth[0].token) {
    
    return <Redirect to={referer} />;
  }

  return (
    <>
      <h3>LOG-IN FORM</h3>
      <Card>
        <Form>
          <Input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="email"
          />
          <Input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
          <Button onClick={postLogin}>Sign In</Button>
        </Form>
        <NavLink to="/signup">Don't have an account?</NavLink>
        {isError && (
          <Error>The username or password provided was incorrect!</Error>
        )}
      </Card>
    </>
  );
};

export default Login;
