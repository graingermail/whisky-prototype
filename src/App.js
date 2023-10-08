import { useState } from "react";
import Data from "./Data";

function App() {
  const [whiskies, setwhiskies] = useState(Data);

  const filterNames = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredNames = Data.filter((names) =>
      names.name.toLowerCase().includes(search)
    );
    setwhiskies(filteredNames);
  };

  return (
    <>
      <h2>Whisky</h2>
      <input type="text" onChange={(e) => filterNames(e)} />
      <button>Search</button>
      <ul>
        {whiskies.map((whisky) => {
          return <li key={whisky.id}>{whisky.name}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
