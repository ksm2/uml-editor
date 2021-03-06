import { Relationship, Renderer } from "../model";

function bresenhamAlgorithm(
  canvas: Renderer,
  relationship: Relationship,
): [number, number, number, number] {
  const cl1 = relationship.from;
  const cl2 = relationship.to;
  const x1 = cl1.getAnchorX(relationship.fromAnchor);
  const y1 = cl1.getAnchorY(relationship.fromAnchor);
  const x2 = cl2.getAnchorX(relationship.toAnchor);
  const y2 = cl2.getAnchorY(relationship.toAnchor);

  // Calculate distances
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);

  // Calculate steps
  const sx = x2 > x1 ? 1 : -1;
  const sy = y2 > y1 ? 1 : -1;

  let p1Hit = true;
  let p2Hit = false;
  let lx1: number | undefined;
  let lx2: number | undefined;
  let ly1: number | undefined;
  let ly2: number | undefined;
  let ox: number | undefined, oy: number | undefined;

  for (let x = x1, y = y1, e = dx - dy; x !== x2 || y !== y2; ) {
    if (p1Hit && !canvas.isPointInClassifier(cl1, x, y)) {
      lx1 = x;
      ly1 = y;
      p1Hit = false;
    }
    if (!p2Hit && canvas.isPointInClassifier(cl2, x, y)) {
      lx2 = ox || x;
      ly2 = oy || y;
      p2Hit = true;
    }
    if (!p1Hit && p2Hit) break;

    // Update x and y
    ox = x;
    oy = y;
    const e2 = 2 * e;
    if (e2 > -dy) {
      e -= dy;
      x += sx;
    }
    if (e2 < dx) {
      e += dx;
      y += sy;
    }
  }

  if (lx1 === undefined || ly1 === undefined || lx2 === undefined || ly2 === undefined) {
    return [x1, y1, x2, y2];
  }

  return [lx1, ly1, lx2, ly2];
}

export default bresenhamAlgorithm;
