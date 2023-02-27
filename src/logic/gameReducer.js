export function gameReducer(currentGameState, payload) {
  // drop on pool (not empty space) from pool
  if (
    payload.action === "dropOnPool" &&
    payload.dragArea === "pool" &&
    payload.targetPoolIndex !== undefined
  ) {
    console.log(`reducer: drop on pool (not empty) from pool`);
    // we had to stringify the numbers for accurate data transfer of "0", so un-stringify it here
    const draggedPoolIndex = parseInt(payload.draggedPoolIndex);
    const targetPoolIndex = parseInt(payload.targetPoolIndex);

    const oldPool = JSON.parse(JSON.stringify(currentGameState.pool));

    // delete the dragged piece from its old position
    // and insert it at the space before the target position
    let newPool;
    if (targetPoolIndex < draggedPoolIndex) {
      newPool = [
        ...oldPool.slice(0, targetPoolIndex),
        oldPool[draggedPoolIndex],
        ...oldPool.slice(targetPoolIndex, draggedPoolIndex),
        ...oldPool.slice(draggedPoolIndex + 1, oldPool.length),
      ];
    } else {
      newPool = [
        ...oldPool.slice(0, draggedPoolIndex),
        ...oldPool.slice(draggedPoolIndex + 1, targetPoolIndex),
        oldPool[draggedPoolIndex],
        ...oldPool.slice(targetPoolIndex, oldPool.length),
      ];
    }

    return {
      ...currentGameState,
      pool: newPool,
    };
  }
  // drop on pool (empty space) from pool
  else if (
    payload.action === "dropOnPool" &&
    payload.dragArea === "pool" &&
    payload.targetPoolIndex === undefined
  ) {
    console.log(`reducer: drop on pool (empty) from pool`);

    // we had to stringify the number for accurate data transfer of "0", so un-stringify it here
    const draggedPoolIndex = parseInt(payload.draggedPoolIndex);

    const oldPool = JSON.parse(JSON.stringify(currentGameState.pool));
    // Put the dragged piece at the end of the pool
    const newPool = [
      ...oldPool.slice(0, draggedPoolIndex),
      ...oldPool.slice(draggedPoolIndex + 1, oldPool.length),
      oldPool[draggedPoolIndex],
    ];

    return {
      ...currentGameState,
      pool: newPool,
    };
  }
  // drop on pool from board
  else if (payload.action === "dropOnPool" && payload.dragArea === "board") {
    const oldBoard = JSON.parse(JSON.stringify(currentGameState.boardGroups));

    // we had to stringify the number for accurate data transfer of "0", so un-stringify it here
    const boardGroupIndex = parseInt(payload.boardGroupIndex);

    // if the board group contains >1 piece, don't do anything
    if (oldBoard[boardGroupIndex].length > 1) {
      return { ...currentGameState };
    }

    // delete the piece from the board
    const newBoard = [
      ...oldBoard.slice(0, boardGroupIndex),
      ...oldBoard.slice(boardGroupIndex + 1, oldBoard.length),
    ];

    //insert the dragged piece into the pool at the space before the target position
    const oldPool = JSON.parse(JSON.stringify(currentGameState.pool));
    const targetPoolIndex = parseInt(payload.targetPoolIndex);
    const newPool = [
      ...oldPool.slice(0, targetPoolIndex),
      oldBoard[boardGroupIndex][0],
      ...oldPool.slice(targetPoolIndex, oldPool.length),
    ];

    return {
      ...currentGameState,
      boardGroups: newBoard,
      pool: newPool,
    };
  } else if (payload.action === "dropOnBoard") {
    console.log("reducer: drop on board");
    return { ...currentGameState };
  }
  console.log(`reducer: unhandled`);

  return { ...currentGameState };

  // pool
  // [{edges, index, rotation}, ...]

  // board groups
  // initially, each piece is in its own group
  // [{3:{edges, index, x, y, rotation}...}, ...]

  // drop on board from board
  // figure out which board group the piece belongs to (requires inefficient lookup unless this data is passed along or unless board group is a key in the dict instead of a grouping in list)
  // get the new x/y
  // update the x/y
  // check for connections (will add later)
  // find the index of the neighbors, then find the x/y of those pieces
  // if x/y is within x/y of neighbor at right rotation, the pieces are connected
  // tweak the x/y to "snap" to place (and the x/y of any already connected pieces)
  // merge the board groups
  // we want most recently moved piece to appear on top of any overlapping pieces, so move this entry to the end of the dict (unless the group contains > n pieces, in which case leave it in place or move it to front)

  // drop on board from pool
  // get the new x/y
  // check for connections (will add later)
  // find the index of the neighbors, then find the x/y of those pieces
  // if x/y is within x/y of neighbor at right rotation, the pieces are connected
  // tweak the x/y to "snap" to place (and the x/y of any already connected pieces)
  // add the piece to that board group
  // otherwise, just create a new board group

  // when rendering board
  // render each piece in order of the dict
  // if any connections, render those recursively as well
  // (so first calculate size of canvas needed based on )
}
