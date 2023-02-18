import React from "react";
import Board from "./Board";
import ControlBar from "./ControlBar";
import Pool from "./Pool";
import { gameReducer } from "../logic/gameReducer";
import { gameInit } from "../logic/gameInit";

export default function App() {

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  return <div className="App">
    <ControlBar></ControlBar>
    <Board></Board>
    <Pool edgesByPiece={gameState.edgesByPiece}></Pool>
  </div>;
}
