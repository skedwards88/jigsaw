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
    context.lineTo(100,40)
    context.bezierCurveTo(120, 40, 120, 60, 100, 60);
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
function CanvasPieceB({ index, x, y }) {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const image = new Image();
    image.src = require("./monkeys.png");
    image.onload = () => {
      context.drawImage(image, 100, 0, 120, 120, 0, 0, 120, 120)
    };

    context.beginPath();
    // top edge
    context.moveTo(0,0)
    context.lineTo(100,0)
    // right
    context.lineTo(100,100)

    // bottom
    context.lineTo(0,100)
    
    // left
    context.lineTo(0,60)
    context.bezierCurveTo(20, 60, 20, 40, 0, 40);

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

export default function App() {
      return (
        <div>
<CanvasPieceA index={1} x={50} y={50} color="gray"></CanvasPieceA>
<CanvasPieceB index={2} x={50} y={180} color="black"></CanvasPieceB>
        </div>
      );
}
