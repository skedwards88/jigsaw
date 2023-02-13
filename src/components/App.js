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
        // curved edge (consists of 6 bezier curves)
        for (const curve of edge) {
          console.log(JSON.stringify(curve))
          context.lineTo(curve[0].x + borderOffset, curve[0].y + borderOffset);
          context.bezierCurveTo(
            curve[1].x + borderOffset,
            curve[1].y + borderOffset,
            curve[2].x + borderOffset,
            curve[2].y + borderOffset,
            curve[3].x + borderOffset,
            curve[3].y + borderOffset,
          );
        }
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

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
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


  const curve1Point1x = functionalX; // based on straight line point 1
  const curve1Point1y = functionalY;
  const curve1Point2x = functionalX + 30;
  const curve1Point2y = functionalY - 2;
  const curve1Point3x = functionalX + 35;
  const curve1Point3y = functionalY - 2;
  const curve1Point4x = functionalX + 40;
  const curve1Point4y = functionalY;

  const curve2Point1x = curve1Point4x; // based on ending point of previous curve
  const curve2Point1y = curve1Point4y;
  const curve2Point2x = curve1Point4x + 2
  const curve2Point2y = curve1Point4y + 5
  const curve2Point3x = curve1Point4x + 2
  const curve2Point3y = curve1Point4y + 7
  const curve2Point4x = curve1Point4x
  const curve2Point4y = curve1Point4y + 10;

  const curve3Point1x = curve2Point4x; // based on ending point of previous curve
  const curve3Point1y = curve2Point4y;
  const curve3Point2x = curve2Point4x -2
  const curve3Point2y = curve2Point4y + 3
  const curve3Point3x = curve2Point4x -5
  const curve3Point3y = curve2Point4y + 7
  const curve3Point4x = curve2Point4x + 10
  const curve3Point4y = curve2Point4y + 10;

  const curve4Point1x = curve3Point4x; // based on ending point of previous curve
  const curve4Point1y = curve3Point4y;
  const curve4Point2x = curve3Point4x + 10 + 2
  const curve4Point2y = curve3Point4y - 3
  const curve4Point3x = curve3Point4x + 10 + 5
  const curve4Point3y = curve3Point4y - 7
  const curve4Point4x = curve3Point4x + 10
  const curve4Point4y = curve3Point4y - 10;

  const curve5Point1x = curve4Point4x; // based on ending point of previous curve
  const curve5Point1y = curve4Point4y;
  const curve5Point2x = curve4Point4x -2
  const curve5Point2y = curve4Point4y -5
  const curve5Point3x = curve4Point4x -2
  const curve5Point3y = curve4Point4y -7
  const curve5Point4x = curve4Point4x
  const curve5Point4y = curve4Point4y - 10;

  const curve6Point1x = curve5Point4x; // based on ending point of previous curve
  const curve6Point1y = curve5Point4y;
  const curve6Point2x = curve5Point4x + 20;
  const curve6Point2y = curve5Point4y - 2;
  const curve6Point3x = curve5Point4x + 35;
  const curve6Point3y = curve5Point4y - 2;
  const curve6Point4x = curve5Point4x + 40;
  const curve6Point4y = curve5Point4y;

  const curve = [
    [
      {x: curve1Point1x, y: curve1Point1y, },
      {x: curve1Point2x, y: curve1Point2y, },
      {x: curve1Point3x, y: curve1Point3y, },
      {x: curve1Point4x, y: curve1Point4y, },
    ],
    [
      {x: curve2Point1x, y: curve2Point1y, },
      {x: curve2Point2x, y: curve2Point2y, },
      {x: curve2Point3x, y: curve2Point3y, },
      {x: curve2Point4x, y: curve2Point4y, },
    ],
    [
      {x: curve3Point1x, y: curve3Point1y, },
      {x: curve3Point2x, y: curve3Point2y, },
      {x: curve3Point3x, y: curve3Point3y, },
      {x: curve3Point4x, y: curve3Point4y, },
    ],
    [
      {x: curve4Point1x, y: curve4Point1y, },
      {x: curve4Point2x, y: curve4Point2y, },
      {x: curve4Point3x, y: curve4Point3y, },
      {x: curve4Point4x, y: curve4Point4y, },
    ],
    [
      {x: curve5Point1x, y: curve5Point1y, },
      {x: curve5Point2x, y: curve5Point2y, },
      {x: curve5Point3x, y: curve5Point3y, },
      {x: curve5Point4x, y: curve5Point4y, },
    ],
    [
      {x: curve6Point1x, y: curve6Point1y, },
      {x: curve6Point2x, y: curve6Point2y, },
      {x: curve6Point3x, y: curve6Point3y, },
      {x: curve6Point4x, y: curve6Point4y, },
    ],
  ];

  console.log(JSON.stringify(curve))
 return curve

  const end1x = functionalX + getRandomBetween(38, 42);
  const end1y = functionalY + getRandomBetween(-5, 5);
  const end2x = end1x + 2 + getRandomBetween(0, 20);
  const end2y = functionalY+ getRandomBetween(-5, 5);
  const control1x = functionalX + getRandomBetween(30, 50);
  const control1y = functionalY + 20;
  const control2x = control1x + getRandomBetween(5, 20);
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
    getCurvedEdge(top),
    // getInverseCurvedEdge(getCurvedEdge(bottom),top),

    right,
    // getCurvedEdge(right),

    bottom,
    // getCurvedEdge(bottom),

    left,
    // getCurvedEdge(left),
    // getInverseCurvedEdge(getCurvedEdge(right), left)
  ];

  return (
    <div id="pool">
      <CanvasPieceB index={1} edges={edges}></CanvasPieceB>
      <CanvasPieceB index={2} edges={edges}></CanvasPieceB>
    </div>
  );
}
