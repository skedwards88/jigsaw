import React from "react";
import { drawPiece } from "../logic/drawPiece";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function dragPiece({ event, dragArea, poolIndex }) {
  event.dataTransfer.setData("draggedPoolIndex", `${poolIndex}`); // touch screen sets 0 as undefined, so convert to string
  event.dataTransfer.setData("dragArea", dragArea);
}

export default function JigsawPoolPiece({
  pieceIndex,
  poolIndex,
  edges,
  numPiecesRoot,
  dropOnPool,
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
      onDragEnter={(event) => {
        // required for mobile-drag-drop
        event.preventDefault();
      }}
      onDragStart={(event) =>
        dragPiece({
          event: event,
          poolIndex: poolIndex,
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
