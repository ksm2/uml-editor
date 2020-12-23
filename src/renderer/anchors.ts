import { Anchor } from "../model";

export function qsin(anchor: Anchor): number {
  if ((anchor + 6) % 16 < 5) {
    return 0;
  }

  if ((anchor + 14) % 16 < 5) {
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
  if ((anchor + 2) % 16 < 5) {
    return 0;
  }

  if ((anchor + 10) % 16 < 5) {
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
