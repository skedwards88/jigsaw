import React from "react";
import JigsawBoardPiece from "./JigsawBoardPiece";

function dropOnBoard({ event, dispatchGameState, targetPoolIndex }) {
  // When you drop on the board,
  // you either drop on an existing piece or on an empty section of the board,
  // so stop propagation so that this handler doesn't execute twice
  // when you drop on a piece
  event.stopPropagation();

  // Get whether we dragged from the pool or board
  const dragArea = event.dataTransfer.getData("dragArea");

  // Get the x/y coordinates of the drop (we want the touch/mouse x/y instead of the element x/y due to grouping?)

  // drop on board from board
  // figure out which board group the piece belongs to (requires inefficient lookup unless this data is passed along or unless board group is a key in the dict instead of a grouping in list)

  const draggedPoolIndex = event.dataTransfer.getData("draggedPoolIndex");
  event.preventDefault();

  dispatchGameState({
    action: "dropOnPool",
    dragArea: dragArea,
    draggedPoolIndex: draggedPoolIndex,
    targetPoolIndex: targetPoolIndex, // will be undefined if dropping on empty section of pool
  });
}

export default function Board({
  dispatchGameState,
  boardGroups,
  numPiecesRoot,
}) {
  let boardGroupsRendered = [];

  for (
    let boardGroupIndex = 0;
    boardGroupIndex < boardGroups.length;
    boardGroupIndex++
  ) {
    let piecesRendered = [];
    for (
      let subGroupIndex = 0;
      subGroupIndex < boardGroups[boardGroupIndex].length;
      subGroupIndex++
    ) {
      const pieceData = boardGroups[boardGroupIndex][subGroupIndex];
      const piece = (
        <JigsawBoardPiece
          pieceIndex={pieceData.pieceIndex}
          boardGroupIndex={boardGroupIndex}
          boardGroupSubIndex={subGroupIndex}
          key={pieceData.pieceIndex}
          edges={pieceData.edges}
          numPiecesRoot={numPiecesRoot}
          dispatchGameState={dispatchGameState}
          area="board"
        ></JigsawBoardPiece>
      );
      piecesRendered = [...piecesRendered, piece];
    }
    boardGroupsRendered = [...boardGroupsRendered, piecesRendered];
  }
  console.log(boardGroupsRendered.length);
  return (
    <div id="board">
      {" "}
      {boardGroupsRendered.map((group, index) => (
        <div key={index} draggable>
          {group}
        </div>
      ))}
    </div>
  );
}
