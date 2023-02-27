import React from "react";
import { drawPiece } from "../logic/drawPiece";

function dragPiece({
  event,
  pieceIndex,
  dragArea,
  boardGroupIndex,
  boardGroupSubIndex,
}) {
  event.dataTransfer.setData("boardGroupSubIndex", `${boardGroupSubIndex}`); // touch screen sets 0 as undefined, so convert to string
  event.dataTransfer.setData("boardGroupIndex", `${boardGroupIndex}`); // touch screen sets 0 as undefined, so convert to string
  event.dataTransfer.setData("dragArea", dragArea);
}

export default function JigsawBoardPiece({
  pieceIndex,
  boardGroupIndex,
  boardGroupSubIndex,
  edges,
  numPiecesRoot,
  dispatchGameState,
  area,
}) {
  const canvasRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    drawPiece({
      canvas: canvas,
      edges: edges,
      numPiecesRoot: numPiecesRoot,
      pieceIndex: pieceIndex,
    });
  }, []); //todo check dependency array

  return (
    <canvas
      ref={canvasRef}
      id={`CanvasPiece${pieceIndex}`}
      className="piece"
      width="140px"
      height="140px"
      draggable
      onDragStart={(event) =>
        dragPiece({
          event: event,
          pieceIndex: pieceIndex,
          boardGroupIndex: boardGroupIndex,
          boardGroupSubIndex: boardGroupSubIndex,
          dragArea: area,
        })
      }
      onDrop={(event) =>
        dropOnPool({
          event: event,
          dispatchGameState: dispatchGameState,
          targetPoolIndex: poolIndex,
        })
      }
      onDragOver={(event) => event.preventDefault()}
    ></canvas>
  );
}
