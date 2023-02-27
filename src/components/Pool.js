import React from "react";
import JigsawPoolPiece from "./JigsawPoolPiece";

function dropOnPool({ event, dispatchGameState, targetPoolIndex }) {
  // When you drop on the pool,
  // you either drop on an existing piece or on an empty section of the pool.
  // Stop propagation so that this handler doesn't execute twice
  // when you drop on an existing piece.
  event.stopPropagation();

  event.preventDefault();

  // Determine where we dragged from (pool or board)
  const dragArea = event.dataTransfer.getData("dragArea");

  // Only one of these sets will be defined (todo should I simplify?)
  const draggedPoolIndex = event.dataTransfer.getData("draggedPoolIndex");
  const boardGroupIndex = event.dataTransfer.getData("boardGroupIndex");

  dispatchGameState({
    action: "dropOnPool",
    dragArea: dragArea,
    draggedPoolIndex: draggedPoolIndex,
    boardGroupIndex: boardGroupIndex,
    targetPoolIndex: targetPoolIndex, // will be undefined if dropping on empty section of pool
  });
}

export default function Pool({ numPiecesRoot, pool, dispatchGameState }) {
  let pieces = [];
  for (let poolIndex = 0; poolIndex < pool.length; poolIndex++) {
    const piece = (
      <JigsawPoolPiece
        pieceIndex={pool[poolIndex].pieceIndex}
        poolIndex={poolIndex}
        key={pool[poolIndex].pieceIndex}
        edges={pool[poolIndex].edges}
        numPiecesRoot={numPiecesRoot}
        dispatchGameState={dispatchGameState}
        dropOnPool={dropOnPool}
        area="pool"
      ></JigsawPoolPiece>
    );
    pieces = [...pieces, piece];
  }

  return (
    <div
      id="pool"
      onDrop={(event) =>
        dropOnPool({
          event: event,
          dispatchGameState: dispatchGameState,
          targetPoolIndex: undefined, // explicitly set to undefined since we aren't dropping on a piece in the pool
        })
      }
      onDragOver={(event) => event.preventDefault()}
    >
      {pieces}
    </div>
  );
}
