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
          context.lineTo(curve[0].x + borderOffset, curve[0].y + borderOffset);
          context.bezierCurveTo(
            curve[1].x + borderOffset,
            curve[1].y + borderOffset,
            curve[2].x + borderOffset,
            curve[2].y + borderOffset,
            curve[3].x + borderOffset,
            curve[3].y + borderOffset
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
  const bumpDirection =
    curvedEdge[0][0].x === curvedEdge[curvedEdge.length - 1][3].x ? "x" : "y";
  const curvedBaseline = curvedEdge[0][0][bumpDirection];
  const straightBaseline = straightEdge[0][bumpDirection];

  let inverseEdge = [];
  for (
    let segmentIndex = curvedEdge.length - 1;
    segmentIndex >= 0;
    segmentIndex--
  ) {
    let inverseSegment = [];
    let newPoint;
    for (
      let pointIndex = curvedEdge[segmentIndex].length - 1;
      pointIndex >= 0;
      pointIndex--
    ) {
      const inversePoint =
        straightBaseline +
        (curvedEdge[segmentIndex][pointIndex][bumpDirection] - curvedBaseline);
      if (bumpDirection === "x") {
        newPoint = {
          x: inversePoint,
          y: curvedEdge[segmentIndex][pointIndex].y,
        };
      } else {
        newPoint = {
          x: curvedEdge[segmentIndex][pointIndex].x,
          y: inversePoint,
        };
      }
      inverseSegment = [...inverseSegment, newPoint];
    }
    inverseEdge = [...inverseEdge, inverseSegment];
  }

  return inverseEdge;
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCurvedEdge([{ x: x1, y: y1 }, { x: x2, y: y2 }]) {
  let functionalX1, functionalY1, functionalX2, functionalY2;
  if (x1 === x2) {
    if (y1 < y2) {
      // left edge (vertical, top -> bottom)
      functionalX1 = y1;
      functionalY1 = x1;
      functionalX2 = y2;
      functionalY2 = x2;
    } else {
      // left edge (vertical, bottom -> top)
      functionalX1 = y2;
      functionalY1 = x2;
      functionalX2 = y1;
      functionalY2 = x1;
    }
  } else {
    if (x1 < x2) {
      // top edge (horizontal, left -> right)
      functionalX1 = x1;
      functionalY1 = y1;
      functionalX2 = x2;
      functionalY2 = y2;
    } else {
      // bottom edge (horizontal, right -> left)
      functionalX1 = x2;
      functionalY1 = y2;
      functionalX2 = x1;
      functionalY2 = y1;
    }
  }

  // const cx=50
  // const cy=50
  // const s=100
  // context.lineTo(cx + s * .34, cy);
  // context.bezierCurveTo(cx + s * .5, cy, cx + s * .4, cy + s * -.15, cx + s * .4, cy + s * -.15);
  // context.bezierCurveTo(cx + s * .3, cy + s * -.3, cx + s * .5, cy + s * -.3, cx + s * .5, cy + s * -.3);
  // context.bezierCurveTo(cx + s * .7, cy + s * -.3, cx + s * .6, cy + s * -.15, cx + s * .6, cy + s * -.15);
  // context.bezierCurveTo(cx + s * .5, cy, cx + s * .65, cy, cx + s * .65, cy);
  // context.lineTo(cx + s, cy);

  const neckBottomWidth = 10;
  const neckTopWidth = 6;
  const neckCenter = getRandomBetween(40,60);

  const curve1Point1x = functionalX1; // based on straight line point 1
  const curve1Point1y = functionalY1;
  const curve1Point2x = functionalX1 + neckCenter - neckBottomWidth / 2 - 5;
  const curve1Point2y = functionalY1 - 2;
  const curve1Point3x = functionalX1 + neckCenter - neckBottomWidth / 2 - 3;
  const curve1Point3y = functionalY1 - 2;
  const curve1Point4x = functionalX1 + neckCenter - neckBottomWidth / 2;
  const curve1Point4y = functionalY1;

  const curve2Point1x = curve1Point4x; // based on ending point of previous curve
  const curve2Point1y = curve1Point4y;
  const curve2Point2x = curve1Point4x + 6;
  const curve2Point2y = curve1Point4y + 5;
  const curve2Point3x = curve1Point4x + 6;
  const curve2Point3y = curve1Point4y + 8;
  const curve2Point4x = curve1Point4x;
  const curve2Point4y = curve1Point4y + 10;

  const curve3Point1x = curve2Point4x; // based on ending point of previous curve
  const curve3Point1y = curve2Point4y;
  const curve3Point2x = curve2Point4x - 2;
  const curve3Point2y = curve2Point4y + 3;
  const curve3Point3x = curve2Point4x - 5;
  const curve3Point3y = curve2Point4y + 7;
  const curve3Point4x = curve2Point4x + 10;
  const curve3Point4y = curve2Point4y + 10;

  const curve4Point1x = curve3Point4x; // based on ending point of previous curve
  const curve4Point1y = curve3Point4y;
  const curve4Point2x = curve3Point4x + 10 + 2;
  const curve4Point2y = curve3Point4y - 3;
  const curve4Point3x = curve3Point4x + 10 + 5;
  const curve4Point3y = curve3Point4y - 7;
  const curve4Point4x = curve3Point4x + 10;
  const curve4Point4y = curve3Point4y - 10;

  const curve5Point1x = curve4Point4x; // based on ending point of previous curve
  const curve5Point1y = curve4Point4y;
  const curve5Point2x = curve4Point4x - 6;
  const curve5Point2y = curve4Point4y - 5;
  const curve5Point3x = curve4Point4x - 6;
  const curve5Point3y = curve4Point4y - 8;
  const curve5Point4x = curve4Point4x;
  const curve5Point4y = curve4Point4y - 10;

  const curve6Point1x = curve5Point4x; // based on ending point of previous curve
  const curve6Point1y = curve5Point4y;
  const curve6Point2x = curve5Point4x + 20;
  const curve6Point2y = curve5Point4y - 2;
  const curve6Point3x = curve5Point4x + 35;
  const curve6Point3y = curve5Point4y - 2;
  const curve6Point4x = functionalX2;
  const curve6Point4y = functionalY2;

  const curve = [
    [
      { x: curve1Point1x, y: curve1Point1y },
      { x: curve1Point2x, y: curve1Point2y },
      { x: curve1Point3x, y: curve1Point3y },
      { x: curve1Point4x, y: curve1Point4y },
    ],
    [
      { x: curve2Point1x, y: curve2Point1y },
      { x: curve2Point2x, y: curve2Point2y },
      { x: curve2Point3x, y: curve2Point3y },
      { x: curve2Point4x, y: curve2Point4y },
    ],
    [
      { x: curve3Point1x, y: curve3Point1y },
      { x: curve3Point2x, y: curve3Point2y },
      { x: curve3Point3x, y: curve3Point3y },
      { x: curve3Point4x, y: curve3Point4y },
    ],
    [
      { x: curve4Point1x, y: curve4Point1y },
      { x: curve4Point2x, y: curve4Point2y },
      { x: curve4Point3x, y: curve4Point3y },
      { x: curve4Point4x, y: curve4Point4y },
    ],
    [
      { x: curve5Point1x, y: curve5Point1y },
      { x: curve5Point2x, y: curve5Point2y },
      { x: curve5Point3x, y: curve5Point3y },
      { x: curve5Point4x, y: curve5Point4y },
    ],
    [
      { x: curve6Point1x, y: curve6Point1y },
      { x: curve6Point2x, y: curve6Point2y },
      { x: curve6Point3x, y: curve6Point3y },
      { x: curve6Point4x, y: curve6Point4y },
    ],
  ];

  if (x1 === x2) {
    if (y1 < y2) {
      // right edge (vertical, top -> bottom)
      // need to swap x/y
      let reversedCurve = [];
      for (let segmentIndex = 0; segmentIndex < curve.length; segmentIndex++) {
        let reversedSegment = [];
        for (
          let pointIndex = 0;
          pointIndex < curve[segmentIndex].length;
          pointIndex++
        ) {
          reversedSegment = [
            ...reversedSegment,
            {
              x: curve[segmentIndex][pointIndex].y,
              y: curve[segmentIndex][pointIndex].x,
            },
          ];
        }
        reversedCurve = [...reversedCurve, reversedSegment];
      }
      return reversedCurve;
    } else {
      // left edge (vertical, bottom -> top)
      // need to swap x/y AND reverse
      let reversedCurve = [];
      for (
        let segmentIndex = curve.length - 1;
        segmentIndex >= 0;
        segmentIndex--
      ) {
        let reversedSegment = [];
        for (
          let pointIndex = curve[segmentIndex].length - 1;
          pointIndex >= 0;
          pointIndex--
        ) {
          reversedSegment = [
            ...reversedSegment,
            {
              x: curve[segmentIndex][pointIndex].y,
              y: curve[segmentIndex][pointIndex].x,
            },
          ];
        }
        reversedCurve = [...reversedCurve, reversedSegment];
      }
      return reversedCurve;
    }
  } else {
    if (x1 < x2) {
      // top edge (horizontal, left -> right)
      return curve;
    } else {
      // bottom edge (horizontal, right -> left)
      // need to reverse
      let reversedCurve = [];
      for (
        let segmentIndex = curve.length - 1;
        segmentIndex >= 0;
        segmentIndex--
      ) {
        let reversedSegment = [];
        for (
          let pointIndex = curve[segmentIndex].length - 1;
          pointIndex >= 0;
          pointIndex--
        ) {
          reversedSegment = [
            ...reversedSegment,
            curve[segmentIndex][pointIndex],
          ];
        }
        reversedCurve = [...reversedCurve, reversedSegment];
      }
      return reversedCurve;
    }
  }
}

function getEdges(numPiecesRoot) {
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
  const straightEdges = [top, right, bottom, left];

  let calculatedEdgesByPiece = []
  for (
    let pieceIndex = 0;
    pieceIndex < numPiecesRoot * numPiecesRoot;
    pieceIndex++
  ) {
    const rowIndex = Math.floor(pieceIndex / numPiecesRoot);
    const columnIndex = pieceIndex - rowIndex * numPiecesRoot;
    let calculatedEdges = []

    for (let edgeIndex = 0; edgeIndex < straightEdges.length; edgeIndex++) {
      // Straight edge for:
      //   first row, top edge OR last row, bottom edge OR first column, left edge OR last column, right edge
      if ((rowIndex === 0 && edgeIndex === 0) || (rowIndex === numPiecesRoot - 1 && edgeIndex === 2) || (columnIndex === 0 && edgeIndex === 3) || (columnIndex === numPiecesRoot - 1 && edgeIndex === 1)) {
        calculatedEdges = [...calculatedEdges, straightEdges[edgeIndex]]
        continue
      }
      // Inverse edge if:
      //   top edge and has neighbor above
      if (edgeIndex === 0 && rowIndex !== 0) {
        const neighborRowIndex = rowIndex - 1
        const neighborColumnIndex = columnIndex
        const neighborPieceIndex = neighborColumnIndex + neighborRowIndex * numPiecesRoot;
        const neighborEdge = calculatedEdgesByPiece[neighborPieceIndex][2] // 2 = bottom edge of neighbor piece
        const calculatedEdge = getInverseCurvedEdge(neighborEdge, straightEdges[edgeIndex])
        calculatedEdges = [...calculatedEdges, calculatedEdge]
        continue
      }
      //   OR left edge and has neighbor to left
      if (edgeIndex === 3 && columnIndex !== 0) {
        const neighborRowIndex = rowIndex
        const neighborColumnIndex = columnIndex - 1
        const neighborPieceIndex = neighborColumnIndex + neighborRowIndex * numPiecesRoot;
        console.log(`${rowIndex}/${columnIndex} => ${neighborPieceIndex}`)
        const neighborEdge = calculatedEdgesByPiece[neighborPieceIndex][1] // 1 = right edge of neighbor piece
        const calculatedEdge = getInverseCurvedEdge(neighborEdge, straightEdges[edgeIndex])
        calculatedEdges = [...calculatedEdges, calculatedEdge]
        continue
      }
      // Otherwise, just a curved edge
      const calculatedEdge = getCurvedEdge(straightEdges[edgeIndex])
      calculatedEdges = [...calculatedEdges, calculatedEdge]
    }
    calculatedEdgesByPiece = [...calculatedEdgesByPiece, calculatedEdges]
  }

  return calculatedEdgesByPiece
}
export default function App() {

  const numPiecesRoot = 4
  const edgesByPiece = getEdges(numPiecesRoot)

  let pieces = []
  for (let index = 0; index < edgesByPiece.length; index++) {
    const piece = <CanvasPieceB index={index} key={index} edges={edgesByPiece[index]}></CanvasPieceB>
    pieces = [...pieces, piece]
  }
  // for (let edges of edgesByPiece) {
  //   const piece = <CanvasPieceB index={1} edges={edges}></CanvasPieceB>
  //   pieces = [...pieces, piece]
  // }
  // const top = [
  //   { x: 0, y: 0 },
  //   { x: 100, y: 0 },
  // ];
  // const right = [
  //   { x: 100, y: 0 },
  //   { x: 100, y: 100 },
  // ];
  // const bottom = [
  //   { x: 100, y: 100 },
  //   { x: 0, y: 100 },
  // ];
  // const left = [
  //   { x: 0, y: 100 },
  //   { x: 0, y: 0 },
  // ];

  // const edges = [
  //   // top,
  //   // getCurvedEdge(top),
  //   getInverseCurvedEdge(getCurvedEdge(bottom), top),

  //   // right,
  //   getCurvedEdge(right),

  //   // bottom,
  //   getCurvedEdge(bottom),

  //   // left,
  //   // getCurvedEdge(left),
  //   getInverseCurvedEdge(getCurvedEdge(right), left),
  // ];

  return (
    <div id="pool">
      {pieces}
      {/* <CanvasPieceB index={1} edges={edges}></CanvasPieceB>
      <CanvasPieceB index={2} edges={edges}></CanvasPieceB> */}
    </div>
  );
}
