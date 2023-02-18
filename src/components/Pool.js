import React from "react";
import getPieceRowCol from "../logic/getPieceColRow";
import getEdges from "../logic/getEdges";
import JigsawPiece from "./JigsawPiece";

export default function Pool() {
  const numPiecesRoot = 8;
  const edgesByPiece = getEdges(numPiecesRoot);

  let pieces = [];
  for (let index = 0; index < edgesByPiece.length; index++) {
    const { row: rowIndex, column: columnIndex } = getPieceRowCol(
      index,
      numPiecesRoot
    );

    const piece = (
      <JigsawPiece
        index={index}
        key={index}
        edges={edgesByPiece[index]}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        numPiecesRoot={numPiecesRoot}
      ></JigsawPiece>
    );
    pieces = [...pieces, piece];
  }

  return <div id="pool">{pieces}</div>;
}