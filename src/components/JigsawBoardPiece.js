import React from "react";
import { drawPiece, drawJigsaw } from "../logic/drawPiece";
// import { polyfill } from "mobile-drag-drop";

// polyfill({
//   dragImageCenterOnTouch: true,
// });

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
  x,
  y,
  numPiecesRoot,
  dispatchGameState,
  dropOnBoard,
  area,
  pieces
}) {
  const canvasRef = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setPosition({
      x: e.touches[0].clientX - e.target.offsetLeft,
      y: e.touches[0].clientY - e.target.offsetTop,
    });
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };


  React.useEffect(() => {
    const canvas = canvasRef.current;
    // drawPiece({
    //   canvas: canvas,
    //   edges: edges,
    //   numPiecesRoot: numPiecesRoot,
    //   pieceIndex: pieceIndex,
    // });
    drawJigsaw({
      canvas: canvas,
      pieces: pieces,
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
      style={{ top: y, left: x }}
      // onDragEnter={(event) => {
      //   // required for mobile-drag-drop
      //   event.preventDefault();
      // }}
      // onDragStart={(event) =>
      //   dragPiece({
      //     event: event,
      //     pieceIndex: pieceIndex,
      //     boardGroupIndex: boardGroupIndex,
      //     boardGroupSubIndex: boardGroupSubIndex, //todo delete if unused
      //     dragArea: area,
      //   })
      // }
      // onDrop={(event) =>
      //   dropOnBoard({
      //     event: event,
      //     dispatchGameState: dispatchGameState,
      //     boardGroupIndex: boardGroupIndex,
      //     boardGroupSubIndex: boardGroupSubIndex, //todo delete if unused
      //   })
      // }
      // onDragOver={(event) => event.preventDefault()}

      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    ></canvas>
  );
}
