import React, { useRef, useLayoutEffect } from "react";
require("./monkeys.png");

function CanvasPieceB({ index, edges }) {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = require("./monkeys.png");
    image.onload = () => {
      // sourceTopX sourceTopY sourceWidth sourceHeight
      // destTopX
      context.drawImage(image, 0, 0, 100, 100, 0, 0, 140, 140);
    };

    const borderOffset = 20;
    context.beginPath();
    context.moveTo(0 + borderOffset, 0 + borderOffset);
    for (const edge of edges) {
      if (edge.length === 2) {
        // straight edge
        context.lineTo(edge[0].x + borderOffset, edge[0].y + borderOffset);
        context.lineTo(edge[1].x + borderOffset, edge[1].y + borderOffset);
      } else {
        // curved edge
        context.lineTo(edge[0].x + borderOffset, edge[0].y + borderOffset);
        context.lineTo(edge[1].x + borderOffset, edge[1].y + borderOffset);
        context.bezierCurveTo(
          edge[2].x + borderOffset,
          edge[2].y + borderOffset,
          edge[3].x + borderOffset,
          edge[3].y + borderOffset,
          edge[4].x + borderOffset,
          edge[4].y + borderOffset
        );
        context.lineTo(edge[5].x + borderOffset, edge[5].y + borderOffset);
      }
    }

    context.clip();
  }, []); //todo check dependency array

  return (
    <canvas
      ref={canvasRef}
      id={`CanvasPiece${index}`}
      className="piece"
      width="140px" //todo how to handle size when multiple pieces locked
      height="140px"
      key={index}
      style={{
        // added
        // "--x": `${positionX}px`,
        // "--y": `${positionY}px`,
        border: "1px solid #fff",
      }}
      draggable
    ></canvas>
  );
}

function getInverseCurvedEdge(curvedEdge, straightEdge) {
  const bumpDirection = curvedEdge[0].x === curvedEdge[5].x ? "x" : "y";
  const curvedBaseline = curvedEdge[0][bumpDirection];
  const straightBaseline = straightEdge[0][bumpDirection];

  let inverseEdge = [];
  for (let index = curvedEdge.length - 1; index >= 0; index--) {
    let newPoint;
    if (bumpDirection === "x") {
      const x =
        straightBaseline + (curvedEdge[index][bumpDirection] - curvedBaseline);
      newPoint = { x: x, y: curvedEdge[index].y };
    } else {
      const y =
        straightBaseline + (curvedEdge[index][bumpDirection] - curvedBaseline);
      newPoint = { x: curvedEdge[index].x, y: y };
    }
    inverseEdge = [...inverseEdge, newPoint];
  }
  return inverseEdge;
}

function getCurvedEdge([{ x: x1, y: y1 }, { x: x2, y: y2 }]) {
  let functionalX, functionalY;
  if (x1 === x2) {
    if (y1 < y2) {
      // left edge (vertical, top -> bottom)
      functionalX = y1;
      functionalY = x1;
    } else {
      // left edge (vertical, bottom -> top)
      functionalX = y2;
      functionalY = x2;
    }
  } else {
    if (x1 < x2) {
      // top edge (horizontal, left -> right)
      functionalX = x1;
      functionalY = y1;
    } else {
      // bottom edge (horizontal, right -> left)
      functionalX = x2;
      functionalY = y2;
    }
  }
  const end1x = functionalX + 40; // +/- 5 // todo randomize a bit
  const end1y = functionalY; // +/- 5
  const end2x = end1x + 20; // -20 + 2 +/- 20?
  const end2y = functionalY; // +/- 5
  const control1x = functionalX + 40; // +/- 10
  const control1y = functionalY + 20;
  const control2x = control1x + 20; // -20 + (5->20)
  const control2y = functionalY + 20;

  if (x1 === x2) {
    if (y1 < y2) {
      // left edge (vertical, top -> bottom)
      return [
        { x: x1, y: y1 },
        { x: end1y, y: end1x },
        { x: control1y, y: control1x },
        { x: control2y, y: control2x },
        { x: end2y, y: end2x },
        { x: x2, y: y2 },
      ];
    } else {
      // left edge (vertical, bottom -> top)
      return [
        { x: x1, y: y1 },
        { x: end2y, y: end2x },
        { x: control2y, y: control2x },
        { x: control1y, y: control1x },
        { x: end1y, y: end1x },
        { x: x2, y: y2 },
      ];
    }
  } else {
    if (x1 < x2) {
      // top edge (horizontal, left -> right)
      return [
        { x: x1, y: y1 },
        { x: end1x, y: end1y },
        { x: control1x, y: control1y },
        { x: control2x, y: control2y },
        { x: end2x, y: end2y },
        { x: x2, y: y2 },
      ];
    } else {
      // bottom edge (horizontal, right -> left)
      return [
        { x: x1, y: y1 },
        { x: end2x, y: end2y },
        { x: control2x, y: control2y },
        { x: control1x, y: control1y },
        { x: end1x, y: end1y },
        { x: x2, y: y2 },
      ];
    }
  }
}

const numPiecesRoot = 4;
const edges = [
  [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
  ], //top
  [
    { x: 100, y: 0 },
    { x: 100, y: 100 },
  ], //right
  [
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ], //bottom
  [
    { x: 0, y: 100 },
    { x: 0, y: 0 },
  ], //left
];
for (
  let pieceIndex = 0;
  pieceIndex < numPiecesRoot * numPiecesRoot;
  pieceIndex++
) {
  const rowIndex = Math.floor(pieceIndex / numPiecesRoot);
  const columnIndex = pieceIndex - rowIndex * numPiecesRoot;

  for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
    // todo handle if has neighbor or is edge
  }
}

export default function App() {
  const top = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
  ];
  const right = [
    { x: 100, y: 0 },
    { x: 100, y: 100 },
  ];
  const bottom = [
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ];
  const left = [
    { x: 0, y: 100 },
    { x: 0, y: 0 },
  ];

  const edges = [
    // top,
    // getCurvedEdge(top),
    getInverseCurvedEdge(getCurvedEdge(bottom),top),

    // right,
    getCurvedEdge(right),

    //bottom,
    getCurvedEdge(bottom),

    // left,
    getCurvedEdge(left),
    // getInverseCurvedEdge(getCurvedEdge(right), left)
  ];

  return (
    <div id="pool">
      <CanvasPieceB index={1} edges={edges}></CanvasPieceB>
      <CanvasPieceB index={2} edges={edges}></CanvasPieceB>
    </div>
  );
}
