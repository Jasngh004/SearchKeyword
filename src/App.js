
import React from "react";
import Search from "./components/Search";
import './App.css';


function App() {
  return (
    <div className="box">
      <h1 className="box-head">YouTube Keyword Search Volume</h1>
      <div className="search-box">
        <Search/>
      </div>
      <h5 className="box-end">Intern Task-Jatin Singh </h5>
    </div>
  );
}

export default App;
