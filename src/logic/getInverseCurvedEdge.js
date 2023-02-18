export default function getInverseCurvedEdge(curvedEdge, straightEdge) {
  const bumpDirection =
    curvedEdge[0][0].x === curvedEdge[curvedEdge.length - 1][3].x ? "x" : "y";
  const curvedBaseline = curvedEdge[0][0][bumpDirection];
  const straightBaseline = straightEdge[0][bumpDirection];

  let inverseEdge = [];
  for (
    let segmentIndex = curvedEdge.length - 1;
    segmentIndex >= 0;
    segmentIndex--
  ) {
    let inverseSegment = [];
    let newPoint;
    for (
      let pointIndex = curvedEdge[segmentIndex].length - 1;
      pointIndex >= 0;
      pointIndex--
    ) {
      const inversePoint =
        straightBaseline +
        (curvedEdge[segmentIndex][pointIndex][bumpDirection] - curvedBaseline);
      if (bumpDirection === "x") {
        newPoint = {
          x: inversePoint,
          y: curvedEdge[segmentIndex][pointIndex].y,
        };
      } else {
        newPoint = {
          x: curvedEdge[segmentIndex][pointIndex].x,
          y: inversePoint,
        };
      }
      inverseSegment = [...inverseSegment, newPoint];
    }
    inverseEdge = [...inverseEdge, inverseSegment];
  }

  return inverseEdge;
}