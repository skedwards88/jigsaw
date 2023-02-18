import getEdges from "./getEdges";

export function gameInit({numPiecesRoot}) {
  numPiecesRoot = numPiecesRoot || 8;

  const edgesByPiece = getEdges(numPiecesRoot);

  const piecePositions = edgesByPiece.map((edge, index) => ({boardX: undefined, boardY: undefined, poolIndex: index}));

  return {
    numPiecesRoot: numPiecesRoot,
    edgesByPiece: edgesByPiece,
    piecePositions: piecePositions,
  }
}