import React from "react";
import { Route } from "react-router-dom";

import { Header } from "./components";
import { Browse, Contribute, Visualize } from "./pages";

import Login from "./pages/auth/Login";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Route path="/" component={Browse} exact />
      <Route path="/browse" component={Browse} exact />
      <Route path="/contribute" component={Contribute} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/v" component={Visualize} exact />
    </div>
  );
};

export default App;
