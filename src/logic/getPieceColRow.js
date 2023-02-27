export default function getPieceRowCol(pieceIndex, numPiecesRoot) {
  const rowIndex = Math.floor(pieceIndex / numPiecesRoot);
  const columnIndex = pieceIndex - rowIndex * numPiecesRoot;
  return { row: rowIndex, column: columnIndex };
}
