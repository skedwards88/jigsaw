import React from "react";
import JigsawBoardPiece from "./JigsawBoardPiece";

function dropOnBoard({ event, dispatchGameState, targetPoolIndex }) {
  console.log("drop on board");
  // When you drop on the board,
  // you either drop on an existing piece or on an empty section of the board,
  // so stop propagation so that this handler doesn't execute twice
  // when you drop on a piece
  event.stopPropagation();

  event.preventDefault();

  // Get whether we dragged from the pool or board
  const dragArea = event.dataTransfer.getData("dragArea");

  // Get the x/y coordinates of the drop (we want the touch/mouse x/y instead of the element x/y due to grouping?)
  const dropX = event.clientX;
  const dropY = event.clientY;
  console.log(`drop on board from ${dragArea} at ${dropX}, ${dropY}`);

  // Only one of these sets will be defined (todo should I simplify?)
  const draggedPoolIndex = event.dataTransfer.getData("draggedPoolIndex");
  const boardGroupIndex = event.dataTransfer.getData("boardGroupIndex");
  const boardGroupSubIndex = event.dataTransfer.getData("boardGroupSubIndex");

  dispatchGameState({
    action: "dropOnBoard",
    dragArea: dragArea,
    draggedPoolIndex: draggedPoolIndex,
    boardGroupIndex: boardGroupIndex,
    boardGroupSubIndex: boardGroupSubIndex,
    dropX: dropX,
    dropY: dropY,
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
          x={pieceData.x}
          y={pieceData.y}
          numPiecesRoot={numPiecesRoot}
          dispatchGameState={dispatchGameState}
          dropOnBoard={dropOnBoard}
          area="board"
        ></JigsawBoardPiece>
      );
      piecesRendered = [...piecesRendered, piece];
    }
    boardGroupsRendered = [...boardGroupsRendered, piecesRendered];
  }
  console.log(boardGroupsRendered.length);
  return (
    <div
      id="board"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) =>
        dropOnBoard({ event: event, dispatchGameState: dispatchGameState })
      }
    >
      {" "}
      {boardGroupsRendered.map((group, index) => (
        <div key={index} draggable>
          {group}
        </div>
      ))}
    </div>
  );
}
