import { Anchor } from "../../model";
import { qcos, qsin } from "../anchors";

describe("anchors", () => {
  it("qsin", () => {
    expect(qsin(Anchor.N)).toBe(0.5);
    expect(qsin(Anchor.NNE)).toBe(0.75);
    expect(qsin(Anchor.NE)).toBe(1);
    expect(qsin(Anchor.ENE)).toBe(1);
    expect(qsin(Anchor.E)).toBe(1);
    expect(qsin(Anchor.ESE)).toBe(1);
    expect(qsin(Anchor.SE)).toBe(1);
    expect(qsin(Anchor.SSE)).toBe(0.75);
    expect(qsin(Anchor.S)).toBe(0.5);
    expect(qsin(Anchor.SSW)).toBe(0.25);
    expect(qsin(Anchor.SW)).toBe(0);
    expect(qsin(Anchor.WSW)).toBe(0);
    expect(qsin(Anchor.W)).toBe(0);
    expect(qsin(Anchor.WNW)).toBe(0);
    expect(qsin(Anchor.NW)).toBe(0);
    expect(qsin(Anchor.NNW)).toBe(0.25);
    expect(qsin(Anchor.CENTER)).toBe(0.5);
  });

  it("qcos", () => {
    expect(qcos(Anchor.N)).toBe(0);
    expect(qcos(Anchor.NNE)).toBe(0);
    expect(qcos(Anchor.NE)).toBe(0);
    expect(qcos(Anchor.ENE)).toBe(0.25);
    expect(qcos(Anchor.E)).toBe(0.5);
    expect(qcos(Anchor.ESE)).toBe(0.75);
    expect(qcos(Anchor.SE)).toBe(1);
    expect(qcos(Anchor.SSE)).toBe(1);
    expect(qcos(Anchor.S)).toBe(1);
    expect(qcos(Anchor.SSW)).toBe(1);
    expect(qcos(Anchor.SW)).toBe(1);
    expect(qcos(Anchor.WSW)).toBe(0.75);
    expect(qcos(Anchor.W)).toBe(0.5);
    expect(qcos(Anchor.WNW)).toBe(0.25);
    expect(qcos(Anchor.NW)).toBe(0);
    expect(qcos(Anchor.NNW)).toBe(0);
    expect(qcos(Anchor.CENTER)).toBe(0.5);
  });
});
