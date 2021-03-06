import React, {useState} from "react";
import './App.css';



function DisplayItem({ displayItem, idx, removedisplayItem }) {
  return (
    <div style={{display: "flex", flexFlow: "row", margin:"10px 0"}}>
      <div style={{marginRight:"10px", marginLeft: "0px"}}>
        {displayItem.name}
      </div>
      <div style={{marginRight:"10px", marginLeft: "0px"}}>
        {displayItem.location}
      </div>
      <div>
        <button onClick={() => removedisplayItem(idx)}>Remove Item</button>
      </div>
    </div>
  );
}

function DisplayForm({ adddisplayItem }) {
  const [displayName, setDisplayData] = useState("");
  const [location, setFunFact] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    
    if (!displayName) 
      return;
    
    adddisplayItem(displayName, location);
    
    setDisplayData("");
    setFunFact("");
  };

  return (
    <form style={{margin:"10px 0"}} onSubmit={handleSubmit}>
      <input
        type="text"
        value={displayName}
        placeholder="Name"
        onChange={e => setDisplayData(e.target.value)}
      />
      <input
        type="text"
        value={location}
        placeholder="Location"
        onChange={e => setFunFact(e.target.value)}
      />
      <button>Add Row</button>
    </form>
  );
}

function Display({props}) {
  const [displayItems, setdisplayItems] = React.useState(props);

  const adddisplayItem = (name, location ) => {
      
    const newdisplayItems = [...displayItems, { name:name, location:location }];
    
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
    <div>
      <div>
        {displayItems.map((displayItem, idx) => (
          <DisplayItem
            key={idx}
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



function App() {
  const data = [
    {name: 'A', location: 'London'},
    {name: 'B',  location: 'Birmingham'},
    {name: 'C', location: 'Edinburgh', facts: {fun: 'Here is a fun fact'} }
  ];

  return(
    <div className="app">
      <Display props={data}/>
    </div>
  )
}

export default App;
