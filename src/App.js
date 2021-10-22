import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [name, setName] = useState("World");

  useEffect(() => {
    document.title = `Hello, ${name}`;
  });

  return (
    <div className="App">
      <h1>Hello, {name}!</h1>
      {name === "Пёс" ? (
        <button onClick={() => setName("World")}>сделать как было</button>
      ) : (
        <button onClick={() => setName("Пёс")}>тык</button>
      )}
    </div>
  );
};

export default App;
