import React, { useState, useEffect } from "react";
import "./App.css";
//import jdatei from "./data/mockData.json";

function App() {
  const [search, setSearch] = useState(null);

  //const Information = jdatei.hits;

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  };

  useEffect(() => {
    const url = "http://hn.algolia.com/api/v1/search?query=react";

    fetch(url)
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        const items = data.hits
          .filter((fdata) => {
            if (search == null) return fdata;
            else if (fdata.title.toLowerCase().includes(search.toLowerCase())) {
              return fdata;
            }
          })
          .map((fdata) => {
            return (
              <div>
                <ul>
                  <li style={{ position: "relative", left: "10vh" }}>
                    <span>{fdata.title}</span>
                  </li>
                </ul>
              </div>
            );
          });
        console.log(items);
      })
      .catch((error) => console.log(error));
  }, []);
  // console.log(items);
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter item to be searched"
          onChange={(e) => searchSpace(e)}
        />
        {items}
      </div>
    </>
  );
}

export default App;
