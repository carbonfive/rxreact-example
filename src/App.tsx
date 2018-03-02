import * as React from "react";
import "./App.css";
import Users from "./components/users/Users";

const logo = require("./logo.svg");

export default () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Users />
    </div>
  );
};
