import React from "react";
import Board from "./Board";
import ControlBar from "./ControlBar";
import Pool from "./Pool";

export default function App() {

  return <div className="App">
    <ControlBar></ControlBar>
    <Board></Board>
    <Pool></Pool>
  </div>;
}
