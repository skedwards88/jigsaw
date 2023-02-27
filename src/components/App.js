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

  return (
    <div className="App">
      <ControlBar></ControlBar>
      <Board
        boardGroups={gameState.boardGroups}
        dispatchGameState={dispatchGameState}
        numPiecesRoot={gameState.numPiecesRoot}
      ></Board>
      <Pool
        numPiecesRoot={gameState.numPiecesRoot}
        pool={gameState.pool}
        dispatchGameState={dispatchGameState}
      ></Pool>
    </div>
  );
}
