import React from "react";
import { Route } from "react-router-dom";

import { Header, Picker } from "./components";
import { Browse, Contribute, Visualize } from "./pages";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Route path="/" component={Browse} exact />
      <Route path="/browse" component={Browse} exact />
      <Route path="/contribute" component={Contribute} exact />
      <Route path="/v" component={Visualize} exact />
      <Route path="/p" component={Picker} exact />
    </div>
  );
};

export default App;
