import { Anchor } from "../../model";

const anchorSchema = Object.keys(Anchor)
  .filter((it) => it.match(/^\D+$/))
  .map((it) => it.toLowerCase());

const classifierSchema = {
  children: ["Title", "Separator", "Method"],
  attrs: {
    x: null,
    y: null,
    width: null,
    height: null,
    anchor: anchorSchema,
  },
};

const schema = {
  "!top": ["Diagram"],
  "!attrs": {
    id: null,
    class: null,
  },
  Diagram: {
    children: ["Class", "Interface", "Implementation"],
  },
  Class: classifierSchema,
  Classifier: classifierSchema,
  Interface: classifierSchema,
};

export default schema;
