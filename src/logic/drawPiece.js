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

  context.clip();
}
