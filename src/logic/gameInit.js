import getEdges from "./getEdges";

export function gameInit({ numPiecesRoot }) {
  numPiecesRoot = numPiecesRoot || 8;

  const edgesByPiece = getEdges(numPiecesRoot);

  const pool = edgesByPiece.map((edges, index) => ({
    pieceIndex: index,
    edges: edges,
    x: undefined,
    y: undefined,
  }));

  return {
    numPiecesRoot: numPiecesRoot,
    edgesByPiece: edgesByPiece,
    pool: pool.slice(3, 6), // todo remove the slice
    boardGroups: [
      [{ ...pool[0], x: 50, y: 50 }],
      [
        { ...pool[1], x: 150, y: 200 },
        { ...pool[2], x: 250, y: 350 },
      ],
    ],
  };
}
