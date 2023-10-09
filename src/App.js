import { useState } from "react";
import Data from "./Data";
import Flavours from "./Flavours";

function App() {
  const [whiskies, setwhiskies] = useState(Data);

  const filterNames = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredNames = Data.filter((names) =>
      names.name.toLowerCase().includes(search)
    );
    setwhiskies(filteredNames);
  };

  //state for flavours
  const [flavours, setFlavours] = useState([]);

  //flavours check boxes
  const [checkedState, setCheckedState] = useState(
    new Array(Flavours.length).fill(false)
  );

  const handleOnChange = (position) => {
    //tick the box
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <>
      <div>
        <h3>Select Flavours....</h3>
        <ul>
          {Flavours.map(({ name, id }, index) => {
            return (
              <li key={index}>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={id}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    {name}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

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
