import { Anchor, LinePattern, Tip } from "../../model";

const anchorSchema = Object.keys(Anchor)
  .filter((it) => it.match(/^\D+$/))
  .map((it) => it.toLowerCase());

const tipSchema = Object.keys(Tip)
  .filter((it) => it.match(/^\D+$/))
  .map((it) => it.toLowerCase());

const linePatternSchema = Object.keys(LinePattern)
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

const relationshipSchema = {
  attrs: {
    from: null,
    fromTip: tipSchema,
    to: null,
    toTip: tipSchema,
    linePattern: linePatternSchema,
  },
};

const classifiers = {
  Class: classifierSchema,
  Classifier: classifierSchema,
  DataType: classifierSchema,
  Enumeration: classifierSchema,
  Interface: classifierSchema,
  Note: classifierSchema,
  Object: classifierSchema,
  Primitive: classifierSchema,
};

const relationships = {
  Aggregation: relationshipSchema,
  Anchor: relationshipSchema,
  Association: relationshipSchema,
  Composition: relationshipSchema,
  Dependency: relationshipSchema,
  DirectedAssociation: relationshipSchema,
  Generalization: relationshipSchema,
  Implementation: relationshipSchema,
  Relationship: relationshipSchema,
};

const schema = {
  "!top": ["Diagram"],
  "!attrs": {
    id: null,
    class: null,
  },
  Diagram: {
    children: [...Object.keys(classifiers), ...Object.keys(relationships)],
  },
  ...classifiers,
  ...relationships,
};

export default schema;
