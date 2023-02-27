import getEdges from "./getEdges";

export function gameInit({ numPiecesRoot }) {
  numPiecesRoot = numPiecesRoot || 8;

  const edgesByPiece = getEdges(numPiecesRoot);

  const pool = edgesByPiece.map((edges, index) => ({
    pieceIndex: index,
    edges: edges,
  }));

  return {
    numPiecesRoot: numPiecesRoot,
    edgesByPiece: edgesByPiece,
    pool: pool.slice(3, 6), // todo remove the slice
    boardGroups: [[pool[0]], [pool[1], pool[2]]],
  };
}
