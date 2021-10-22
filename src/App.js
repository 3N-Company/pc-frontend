import { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { Header } from "./components";
import { Browse, Contribute } from "./pages";

import HomeIcon from "@mui/icons-material/Delete";

const App = () => {
  const [name, setName] = useState("World");

  useEffect(() => {
    document.title = `Hello, ${name}`;
  });

  return (
    <div className="App">
      <Header />
      <Route path="/" component={Browse} exact />
      <Route path="/browse" component={Browse} exact />
      <Route path="/contribute" component={Contribute} exact />
      <h1>Hello, {name}!</h1>
      {name === "Пёс" ? (
        <button onClick={() => setName("World")}>
          сделать как было <HomeIcon />
        </button>
      ) : (
        <button onClick={() => setName("Пёс")}>тык</button>
      )}
    </div>
  );
};

export default App;
