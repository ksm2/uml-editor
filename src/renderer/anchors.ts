import { Anchor } from "../model";

const EAST = 2;
const SOUTH = 6;
const WEST = 10;
const NORTH = 14;

const NUM_SIDE = 5;
const NUM_OUTER = 16;

function isSide(side: number, anchor: Anchor): boolean {
  return (anchor + side) % NUM_OUTER < NUM_SIDE;
}

export function qsin(anchor: Anchor): number {
  if (anchor === Anchor.CENTER) {
    return 1 / 2;
  }

  if (isSide(SOUTH, anchor)) {
    return 0;
  }

  if (isSide(NORTH, anchor)) {
    return 1;
  }

  switch (anchor) {
    case Anchor.NNW:
    case Anchor.SSW:
      return 1 / 4;
    case Anchor.N:
    case Anchor.S:
      return 1 / 2;
    case Anchor.NNE:
    case Anchor.SSE:
      return 3 / 4;
  }

  throw new Error();
}

export function qcos(anchor: Anchor): number {
  if (anchor === Anchor.CENTER) {
    return 1 / 2;
  }

  if (isSide(EAST, anchor)) {
    return 0;
  }

  if (isSide(WEST, anchor)) {
    return 1;
  }

  switch (anchor) {
    case Anchor.ENE:
    case Anchor.WNW:
      return 1 / 4;
    case Anchor.E:
    case Anchor.W:
      return 1 / 2;
    case Anchor.ESE:
    case Anchor.WSW:
      return 3 / 4;
  }

  throw new Error();
}
