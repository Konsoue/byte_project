import React from "react";
import Home from "@/pages/home";
import NotFound from "./pages/notFound";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "./index.less";
import "@arco-design/web-react/dist/css/arco.css";

function CreateRoutes() {
  const homeElement = <Home />;
  const element = useRoutes([
    { path: "/", element: homeElement, caseSensitive: true },
    { path: "home", element: homeElement },
    { path: "*", element: <NotFound /> },
  ]);
  return element;
}

function App() {
  return (
    <Router>
      <CreateRoutes />
    </Router>
  );
}

export default App;
