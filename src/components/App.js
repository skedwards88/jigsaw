import React, { useRef, useEffect } from 'react'
require("./monkeys.png")

function CanvasPieceOld({ index, x, y, color }) {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = '#00ffff'
    context.fillRect(0, 0, 150, 150);

    // top edge
    context.beginPath();
    context.moveTo(20,20)
    context.lineTo(40,20)
    context.bezierCurveTo(30, -10, 70, 0, 60, 20);
    context.lineTo(80,20)
    // right
    context.lineTo(80,40)
    context.bezierCurveTo(100, 40, 100, 60, 80, 60);
    context.lineTo(80,80)
    // bottom
    context.lineTo(60,80)
    context.bezierCurveTo(60, 60, 40, 60, 40, 80);
    context.lineTo(20,80)
    // left
    context.lineTo(20,60)
    context.bezierCurveTo(0, 60, 0, 40, 20, 40);
    context.lineTo(20,20)

    context.clip()

    context.fillStyle = color
    context.fillRect(0, 0, 150, 150);

  }, [])

  return <canvas
  ref={canvasRef}
    id={`CanvasPiece${index}`}
    className="piece"
    width="100px" //todo how to handle size when multiple pieces locked
    height="100px"
    key={index}
    style={{ // added
      "--x": `${x}px`,
      "--y": `${y}px`,
      border: "1px solid #000000",
    }}
    draggable
  ></canvas>
}
function CanvasPieceA({ index, x, y }) {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const image = new Image();
    image.src = require("./monkeys.png");
    image.onload = () => {
      context.drawImage(image, 0, 0, 120, 120, 0, 0, 120, 120)
    };

    context.beginPath();
    // top edge
    context.moveTo(0,0)
    context.lineTo(100,0)
    // right
    const [end1x, end1y, control1x, control1y, control2x, control2y, end2x, end2y] = getCurvedEdge(100,0,100,100)
    context.lineTo(end1x,end1y)
    context.bezierCurveTo(control1x, control1y, control2x, control2y, end2x, end2y);
    context.lineTo(100,100)
    // bottom
    context.lineTo(0,100)
    // left

    context.clip()


  }, [])

  return <canvas
  ref={canvasRef}
    id={`CanvasPiece${index}`}
    className="piece"
    width="120px" //todo how to handle size when multiple pieces locked
    height="120px"
    key={index}
    style={{ // added
      "--x": `${x}px`,
      "--y": `${y}px`,
      border: "1px solid #fff",
    }}
    draggable
  ></canvas>
}
function CanvasPieceB({ index, positionX, positionY, edges }) {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const image = new Image();
    image.src = require("./monkeys.png");
    image.onload = () => {
      // sourceTopX sourceTopY sourceWidth sourceHeight
      // destTopX
      context.drawImage(image, 100, 0, 100, 100, 20, 20, 100, 100)
    };

    const borderOffset = 20;
    context.beginPath();
    context.moveTo(0 + borderOffset, 0+borderOffset)

    for (const edge of edges) {
      if (edge.length === 2) {
        // straight edge
        context.lineTo(edge[0].x + borderOffset, edge[0].y + borderOffset)
        context.lineTo(edge[1].x + borderOffset, edge[1].y + borderOffset)
      } else {
        // curved edge
        context.lineTo(edge[0].x+borderOffset,edge[0].y+borderOffset)
        context.bezierCurveTo(
          edge[1].x + borderOffset, edge[1].y + borderOffset,
          edge[2].x + borderOffset, edge[2].y + borderOffset,
          edge[3].x + borderOffset, edge[3].y + borderOffset);    
      }
    }

    context.clip()

  }, []) //todo check dependency array

  return <canvas
  ref={canvasRef}
    id={`CanvasPiece${index}`}
    className="piece"
    width="140px" //todo how to handle size when multiple pieces locked
    height="140px"
    key={index}
    style={{ // added
      "--x": `${positionX}px`,
      "--y": `${positionY}px`,
      border: "1px solid #fff",
    }}
    draggable
  ></canvas>
}

function getCurvedEdge(x1,y1,x2,y2) {

  let functionalX, functionalY
  if (x1 === x2) {
    if (y1 < y2) {
      functionalX = y1
      functionalY = x1
    } else {
      functionalX = y2
      functionalY = x2
    }
  } else {
    if (y1 < y2) {
      functionalX = x1
      functionalY = y1
    } else {
      functionalX = x2
      functionalY = y2
    }
  }
  // const [functionalX, functionalY] = x1 === x2 ? [y1, x1] : [x1, y1]
  const end1x = functionalX + 40 // +/- 5
  const end1y = functionalY // +/- 5
  const end2x = end1x + 20 // -20 + 2 +/- 20?
  const end2y = functionalY // +/- 5
  const control1x = functionalX + 40 // +/- 10
  const control1y = functionalY + 20
  const control2x = control1x + 20 // -20 + (5->20)
  const control2y = functionalY + 20

  

  if (x1 === x2) {
    if (y1 < y2) {
      return [{x:end1y,y:end1x}, {x:control1y,y:control1x}, {x:control2y,y:control2x}, {x:end2y,y:end2x}]
    } else {
      return [{x:end2y,y:end2x}, {x:control2y,y:control2x}, {x:control1y,y:control1x}, {x:end1y,y:end1x}]
    }
  } else {
    if (y1 < y2) {
      return [{x:end1x,y:end1y}, {x:control1x,y:control1y}, {x:control2x,y:control2y}, {x:end2x,y:end2y}]
    } else {
      return [{x:end2x,y:end2y}, {x:control2x,y:control2y}, {x:control1x,y:control1y}, {x:end1x,y:end1y}]
    }
  }
}

const numPiecesRoot = 4
const edges = [
  [{x:0,y:0}, {x:100,y:0}], //top
  [{x:100,y:0}, {x:100,y:100}], //right
  [{x:100,y:100}, {x:0,y:100}], //bottom
  [{x:0,y:100}, {x:0,y:0}], //left
]
for (let pieceIndex = 0; pieceIndex < numPiecesRoot * numPiecesRoot; pieceIndex++) {
  const rowIndex = Math.floor(pieceIndex / numPiecesRoot);
  const columnIndex = pieceIndex - rowIndex * numPiecesRoot;

  for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
    // todo handle if has neighbor or is edge
    
  }
}
export default function App() {
  const edges = [
    [{x:0,y:0}, {x:100,y:0}], //top
    [{x:100,y:0}, {x:100,y:100}], //right
    [{x:100,y:100}, {x:0,y:100}], //bottom
    getCurvedEdge(0,100,0,0), //left
  ]
      return (
        <div>
<CanvasPieceA index={1} x={50} y={50} color="gray"></CanvasPieceA>
<CanvasPieceB index={2} positionX={50} positionY={180} edges={edges}></CanvasPieceB>
        </div>
      );
}
