import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
/*
const jsonServer = require("json-server");

const server = jsonServer.create();

const router = jsonServer.router("./db.json");
server.use(router);
server.listen("3001");
*/
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
