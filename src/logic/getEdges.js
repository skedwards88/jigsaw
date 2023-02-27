import getInverseCurvedEdge from "./getInverseCurvedEdge";
import getCurvedEdge from "./getCurvedEdge";
import getPieceRowCol from "./getPieceColRow";

export default function getEdges(numPiecesRoot) {
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

  let calculatedEdgesByPiece = [];
  for (
    let pieceIndex = 0;
    pieceIndex < numPiecesRoot * numPiecesRoot;
    pieceIndex++
  ) {
    const { row: rowIndex, column: columnIndex } = getPieceRowCol(
      pieceIndex,
      numPiecesRoot
    );
    let calculatedEdges = [];

    for (let edgeIndex = 0; edgeIndex < straightEdges.length; edgeIndex++) {
      // Straight edge for:
      //   first row, top edge OR last row, bottom edge OR first column, left edge OR last column, right edge
      if (
        (rowIndex === 0 && edgeIndex === 0) ||
        (rowIndex === numPiecesRoot - 1 && edgeIndex === 2) ||
        (columnIndex === 0 && edgeIndex === 3) ||
        (columnIndex === numPiecesRoot - 1 && edgeIndex === 1)
      ) {
        calculatedEdges = [...calculatedEdges, straightEdges[edgeIndex]];
        continue;
      }
      // Inverse edge if:
      //   top edge and has neighbor above
      if (edgeIndex === 0 && rowIndex !== 0) {
        const neighborRowIndex = rowIndex - 1;
        const neighborColumnIndex = columnIndex;
        const neighborPieceIndex =
          neighborColumnIndex + neighborRowIndex * numPiecesRoot;
        const neighborEdge = calculatedEdgesByPiece[neighborPieceIndex][2]; // 2 = bottom edge of neighbor piece
        const calculatedEdge = getInverseCurvedEdge(
          neighborEdge,
          straightEdges[edgeIndex]
        );
        calculatedEdges = [...calculatedEdges, calculatedEdge];
        continue;
      }
      //   OR left edge and has neighbor to left
      if (edgeIndex === 3 && columnIndex !== 0) {
        const neighborRowIndex = rowIndex;
        const neighborColumnIndex = columnIndex - 1;
        const neighborPieceIndex =
          neighborColumnIndex + neighborRowIndex * numPiecesRoot;
        const neighborEdge = calculatedEdgesByPiece[neighborPieceIndex][1]; // 1 = right edge of neighbor piece
        const calculatedEdge = getInverseCurvedEdge(
          neighborEdge,
          straightEdges[edgeIndex]
        );
        calculatedEdges = [...calculatedEdges, calculatedEdge];
        continue;
      }
      // Otherwise, just a curved edge
      const calculatedEdge = getCurvedEdge(straightEdges[edgeIndex]);
      calculatedEdges = [...calculatedEdges, calculatedEdge];
    }
    calculatedEdgesByPiece = [...calculatedEdgesByPiece, calculatedEdges];
  }

  return calculatedEdgesByPiece;
}
