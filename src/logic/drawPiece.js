import getPieceRowCol from "../logic/getPieceColRow";
import puzzleImage from "../images/puzzleBackgrounds/monkeys.png";

export function drawPiece({ canvas, edges, numPiecesRoot, pieceIndex }) {
  const context = canvas.getContext("2d");

  const { row: rowIndex, column: columnIndex } = getPieceRowCol(
    pieceIndex,
    numPiecesRoot
  );

  const image = new Image();
  image.src = puzzleImage;
  image.onload = () => {
    // console.log(image.width)
    const imageWidth = image.width;
    const sectionWidth = imageWidth / numPiecesRoot;
    // sourceTopX sourceTopY sourceWidth sourceHeight
    // destTopX   destTopY   destWidth   destHeight
    context.drawImage(
      image,
      columnIndex * sectionWidth - sectionWidth / 5, // sourceTopX
      rowIndex * sectionWidth - sectionWidth / 5, // sourceTopY
      sectionWidth + sectionWidth * 0.4, // sourceWidth
      sectionWidth + sectionWidth * 0.4, // sourceHeight
      0, // destTopX
      0, // destTopY
      140, // destWidth
      140 // destHeight
    );
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

  // context.clip();
}

// The pieces input is an array of objects, where each object represents a single jigsaw piece. Each object has the following properties:

// pieceIndex: a unique identifier for the piece
// edges: an array of arrays, where each sub-array represents a single edge of the piece. Each sub-array contains either 2 or 6 objects, which represent the control points of the Bezier curves that define the edge.
// rotation: the rotation of the piece in degrees (optional)
// x: the x-coordinate of the piece's position (optional) default 0
// y: the y-coordinate of the piece's position (optional) default 0

export function drawJigsaw({ canvas, pieces, numPiecesRoot }) {
  const context = canvas.getContext("2d");

  const { width, height } = canvas;
  const pieceWidth = 140 //width / numPiecesRoot;
  const pieceHeight = 140 // height / numPiecesRoot;

  const borderOffset = 20;
  context.beginPath();
  context.moveTo(0 + borderOffset, 0 + borderOffset);

  for (const piece of pieces) {
    const { row: rowIndex, column: columnIndex } = getPieceRowCol(
      piece.pieceIndex,
      numPiecesRoot
    );

    const image = new Image();
    image.src = puzzleImage;
    image.onload = () => {
      const imageWidth = image.width;
      const sectionWidth = imageWidth / numPiecesRoot;
      context.drawImage(
        image,
        columnIndex * sectionWidth - sectionWidth / 5,
        rowIndex * sectionWidth - sectionWidth / 5,
        sectionWidth + sectionWidth * 0.4,
        sectionWidth + sectionWidth * 0.4,
        0,
        0,
        pieceWidth,
        pieceHeight
      );
    };

    for (const edge of piece.edges) {
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
  }

  context.clip();
}