import React, {useState} from "react";
import './App.css';

function DisplayForm({ adddisplayItem }) {
  const [displayData, setDisplayData] = useState("");
  const [funFact, setFunFact] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    
    if (!displayData) 
      return;
    
    adddisplayItem(displayData, funFact);
    
    setDisplayData("");
    setFunFact("");
  };

  return (
    <form style={{margin:"10px 0"}} onSubmit={handleSubmit}>
      <input
        type="text"
        value={displayData}
        placeholder="Display Data"
        onChange={e => setDisplayData(e.target.value)}
      />
      <input
        type="text"
        value={funFact}
        placeholder="Fun Fact (optional)"
        onChange={e => setFunFact(e.target.value)}
      />
      <button>Add Row</button>
    </form>
  );
}

function DisplayItem({ displayItem, idx, removedisplayItem }) {
  return (
    <div style={{display: "flex", flexFlow: "row", margin:"10px 0"}}>
      <div style={{marginRight:"10px", marginLeft: "0px"}}>
        {idx + 1}.
      </div>
      <div style={{marginRight:"10px", marginLeft: "0px"}}>
        {displayItem.data}
      </div>
      <div style={{ marginRight:"10px", color: "green", display: displayItem.funFactExists ? "default" : "none" }}>
        {displayItem.funFact}
      </div>
      <div>
        <button onClick={() => removedisplayItem(idx)}>Remove Item</button>
      </div>
    </div>
  );
}

function App() {
  const [displayItems, setdisplayItems] = React.useState([
    { data: "London", funFact:"", funFactExists: false},
    { data: "Birmingham", funFact:"", funFactExists: false},
    { data: "Edinburgh", funFact:"Here is a fun fact", funFactExists: true}
  ]);

  const adddisplayItem = (data, fFact ) => {
    let funFactExists = false;

    if (fFact.length > 0) funFactExists = true;

    const newdisplayItems = [...displayItems, { data:data, funFact:fFact, funFactExists: funFactExists }];
    
    setdisplayItems(newdisplayItems);
  };

  const removedisplayItem = idx => {
    const newdisplayItems = [...displayItems];
    
    newdisplayItems.splice(idx, 1);
    
    setdisplayItems(newdisplayItems);
  };

  const removeLastItem = () => {
    const newdisplayItems = [...displayItems];
    
    let x = newdisplayItems.length;
    
    if (x <= 0)
      return;

    newdisplayItems.splice(x-1, 1);
    
    setdisplayItems(newdisplayItems);
  };

  return (
    <div className="app">
      <div>
        {displayItems.map((displayItem, idx) => (
          <DisplayItem
            key={idx}
            idx={idx}
            displayItem={displayItem}
            removedisplayItem={removedisplayItem}
          />
        ))}
        <DisplayForm adddisplayItem={adddisplayItem} />
        <button style={{margin:"10px 0"}} onClick={removeLastItem}>Remove Last Item</button>
      </div>
    </div>
  );
}

export default App;
