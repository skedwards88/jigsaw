function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function getCurvedEdge([{ x: x1, y: y1 }, { x: x2, y: y2 }]) {
  let functionalX1, functionalY1, functionalX2, functionalY2;
  if (x1 === x2) {
    if (y1 < y2) {
      // left edge (vertical, top -> bottom)
      functionalX1 = y1;
      functionalY1 = x1;
      functionalX2 = y2;
      functionalY2 = x2;
    } else {
      // left edge (vertical, bottom -> top)
      functionalX1 = y2;
      functionalY1 = x2;
      functionalX2 = y1;
      functionalY2 = x1;
    }
  } else {
    if (x1 < x2) {
      // top edge (horizontal, left -> right)
      functionalX1 = x1;
      functionalY1 = y1;
      functionalX2 = x2;
      functionalY2 = y2;
    } else {
      // bottom edge (horizontal, right -> left)
      functionalX1 = x2;
      functionalY1 = y2;
      functionalX2 = x1;
      functionalY2 = y1;
    }
  }

  // const cx=50
  // const cy=50
  // const s=100
  // context.lineTo(cx + s * .34, cy);
  // context.bezierCurveTo(cx + s * .5, cy, cx + s * .4, cy + s * -.15, cx + s * .4, cy + s * -.15);
  // context.bezierCurveTo(cx + s * .3, cy + s * -.3, cx + s * .5, cy + s * -.3, cx + s * .5, cy + s * -.3);
  // context.bezierCurveTo(cx + s * .7, cy + s * -.3, cx + s * .6, cy + s * -.15, cx + s * .6, cy + s * -.15);
  // context.bezierCurveTo(cx + s * .5, cy, cx + s * .65, cy, cx + s * .65, cy);
  // context.lineTo(cx + s, cy);

  const minNeckCenter = 40;
  const maxNeckCenter = 60;
  const neckCenter = getRandomBetween(minNeckCenter, maxNeckCenter);

  const minShoulderHeight = -3;
  const maxShoulderHeight = 3;
  const shoulderHeight = getRandomBetween(minShoulderHeight, maxShoulderHeight);

  const headHeight = 10;
  const headWidth = 5;

  const neckBottomWidth = 10;
  const neckTopWidth = 6;

  const direction = pickRandom([-1, 1]);

  // The shoulder is relatively flat.
  // The main variation is how far to the center the shoulder stretches.
  const curve1Point1x = functionalX1; // based on straight line point 1
  const curve1Point1y = functionalY1; // based on straight line point 1
  const curve1Point2x = functionalX1 + (neckCenter - neckBottomWidth / 2) * 0.5;
  const curve1Point2y = functionalY1 - shoulderHeight;
  const curve1Point3x = functionalX1 + (neckCenter - neckBottomWidth / 2) * 0.5;
  const curve1Point3y = functionalY1 - shoulderHeight;
  const curve1Point4x = functionalX1 + neckCenter - neckBottomWidth / 2;
  const curve1Point4y = functionalY1;

  const curve2Point1x = curve1Point4x; // based on ending point of previous curve
  const curve2Point1y = curve1Point4y; // based on ending point of previous curve
  const curve2Point2x = curve1Point4x + 6;
  const curve2Point2y = curve1Point4y + 5 * direction;
  const curve2Point3x = curve1Point4x + 6;
  const curve2Point3y = curve1Point4y + 8 * direction;
  const curve2Point4x = curve1Point4x;
  const curve2Point4y = curve1Point4y + 10 * direction;

  // The head
  const curve3Point1x = curve2Point4x; // based on ending point of previous curve
  const curve3Point1y = curve2Point4y; // based on ending point of previous curve
  const curve3Point2x = curve2Point4x - headWidth; // this value adds the most variation to the head width
  const curve3Point2y = curve2Point4y + headHeight * direction;
  const curve3Point3x = neckCenter - 2;
  const curve3Point3y = curve2Point4y + headHeight * direction;
  const curve3Point4x = neckCenter;
  const curve3Point4y = curve2Point4y + headHeight * direction;

  const curve4Point1x = curve3Point4x; // based on ending point of previous curve
  const curve4Point1y = curve3Point4y; // based on ending point of previous curve
  const curve4Point2x = neckCenter + 2;
  const curve4Point2y = curve3Point3y;
  const curve4Point3x = curve3Point4x + headWidth;
  const curve4Point3y = curve3Point2y;
  const curve4Point4x = curve3Point4x + neckTopWidth;
  const curve4Point4y = curve3Point1y;

  const curve5Point1x = curve4Point4x; // based on ending point of previous curve
  const curve5Point1y = curve4Point4y; // based on ending point of previous curve
  const curve5Point2x = curve4Point4x - headHeight;
  const curve5Point2y = curve4Point4y - 5 * direction;
  const curve5Point3x = curve4Point4x - 6;
  const curve5Point3y = curve4Point4y - 8 * direction;
  const curve5Point4x = curve4Point4x;
  const curve5Point4y = curve4Point4y - 10 * direction;

  const curve6Point1x = curve5Point4x; // based on ending point of previous curve
  const curve6Point1y = curve5Point4y; // based on ending point of previous curve
  const curve6Point2x = curve5Point4x + (functionalX2 - curve5Point4x) * 0.5;
  const curve6Point2y = curve5Point4y - shoulderHeight;
  const curve6Point3x = curve5Point4x + (functionalX2 - curve5Point4x) * 0.5;
  const curve6Point3y = curve5Point4y - shoulderHeight;
  const curve6Point4x = functionalX2; // based on the ending point of the straight line
  const curve6Point4y = functionalY2; // based on the ending point of the straight line

  const curve = [
    [
      { x: curve1Point1x, y: curve1Point1y },
      { x: curve1Point2x, y: curve1Point2y },
      { x: curve1Point3x, y: curve1Point3y },
      { x: curve1Point4x, y: curve1Point4y },
    ],
    [
      { x: curve2Point1x, y: curve2Point1y },
      { x: curve2Point2x, y: curve2Point2y },
      { x: curve2Point3x, y: curve2Point3y },
      { x: curve2Point4x, y: curve2Point4y },
    ],
    [
      { x: curve3Point1x, y: curve3Point1y },
      { x: curve3Point2x, y: curve3Point2y },
      { x: curve3Point3x, y: curve3Point3y },
      { x: curve3Point4x, y: curve3Point4y },
    ],
    [
      { x: curve4Point1x, y: curve4Point1y },
      { x: curve4Point2x, y: curve4Point2y },
      { x: curve4Point3x, y: curve4Point3y },
      { x: curve4Point4x, y: curve4Point4y },
    ],
    [
      { x: curve5Point1x, y: curve5Point1y },
      { x: curve5Point2x, y: curve5Point2y },
      { x: curve5Point3x, y: curve5Point3y },
      { x: curve5Point4x, y: curve5Point4y },
    ],
    [
      { x: curve6Point1x, y: curve6Point1y },
      { x: curve6Point2x, y: curve6Point2y },
      { x: curve6Point3x, y: curve6Point3y },
      { x: curve6Point4x, y: curve6Point4y },
    ],
  ];

  if (x1 === x2) {
    if (y1 < y2) {
      // right edge (vertical, top -> bottom)
      // need to swap x/y
      let reversedCurve = [];
      for (let segmentIndex = 0; segmentIndex < curve.length; segmentIndex++) {
        let reversedSegment = [];
        for (
          let pointIndex = 0;
          pointIndex < curve[segmentIndex].length;
          pointIndex++
        ) {
          reversedSegment = [
            ...reversedSegment,
            {
              x: curve[segmentIndex][pointIndex].y,
              y: curve[segmentIndex][pointIndex].x,
            },
          ];
        }
        reversedCurve = [...reversedCurve, reversedSegment];
      }
      return reversedCurve;
    } else {
      // left edge (vertical, bottom -> top)
      // need to swap x/y AND reverse
      let reversedCurve = [];
      for (
        let segmentIndex = curve.length - 1;
        segmentIndex >= 0;
        segmentIndex--
      ) {
        let reversedSegment = [];
        for (
          let pointIndex = curve[segmentIndex].length - 1;
          pointIndex >= 0;
          pointIndex--
        ) {
          reversedSegment = [
            ...reversedSegment,
            {
              x: curve[segmentIndex][pointIndex].y,
              y: curve[segmentIndex][pointIndex].x,
            },
          ];
        }
        reversedCurve = [...reversedCurve, reversedSegment];
      }
      return reversedCurve;
    }
  } else {
    if (x1 < x2) {
      // top edge (horizontal, left -> right)
      return curve;
    } else {
      // bottom edge (horizontal, right -> left)
      // need to reverse
      let reversedCurve = [];
      for (
        let segmentIndex = curve.length - 1;
        segmentIndex >= 0;
        segmentIndex--
      ) {
        let reversedSegment = [];
        for (
          let pointIndex = curve[segmentIndex].length - 1;
          pointIndex >= 0;
          pointIndex--
        ) {
          reversedSegment = [
            ...reversedSegment,
            curve[segmentIndex][pointIndex],
          ];
        }
        reversedCurve = [...reversedCurve, reversedSegment];
      }
      return reversedCurve;
    }
  }
}
