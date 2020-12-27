import * as Model from "../model";

interface Class<T> {
  new (...args: any[]): T;
}

class Serializer {
  private readonly parser: DOMParser;
  private readonly elementMap = new Map<Element, Model.Element>();

  constructor() {
    this.parser = new DOMParser();
  }

  deserialize(xml: string): Model.Diagram {
    const document = this.parser.parseFromString(xml, "text/xml");
    const diagram = this.parseElement(document.documentElement);
    if (!(diagram instanceof Model.Diagram)) {
      return new Model.Diagram();
    }

    return diagram;
  }

  private parseElement(element: Element): Model.Element {
    if (this.elementMap.has(element)) {
      return this.elementMap.get(element)!;
    }

    const parsed = this.doParseElement(element);
    this.elementMap.set(element, parsed);
    return parsed;
  }

  protected doParseElement(element: Element): Model.Element {
    switch (element.tagName) {
      case "Diagram":
        return this.parseDiagram(element);
      case "Classifier":
        return this.parseClassifier(Model.Classifier, element);
      case "Relationship":
        return this.parseRelationship(Model.Relationship, element);
      case "Title":
        return this.parseTitle(element);
      case "Method":
      case "Text":
        return this.parseText(element);
      case "Separator":
        return new Model.Separator();
    }

    throw new Error(`Unknown tag: ${element.tagName}`);
  }

  private parseDiagram(element: Element): Model.Diagram {
    const diagram = new Model.Diagram();
    this.parseChildren(element, diagram);
    return diagram;
  }

  protected parseClassifier<C extends Model.Classifier>(
    constructor: Class<C>,
    element: Element
  ): C {
    const anchor = this.parseAnchorAttribute(element, "anchor");
    const x = this.parseIntAttribute(element, "x", 0);
    const y = this.parseIntAttribute(element, "y", 0);
    const width = this.parseIntAttribute(element, "width", 200);
    const height = this.parseIntAttribute(element, "height", 120);
    const classifier = new constructor(anchor, x, y, width, height);
    classifier.shape = this.parseEnumAttribute(
      Model.Shape,
      element,
      "shape",
      classifier.shape
    );
    this.parseChildren(element, classifier);
    return classifier;
  }

  protected parseRelationship<R extends Model.Relationship>(
    constructor: Class<R>,
    element: Element
  ): R {
    const from = this.parseClassifierAttribute(element, "from");
    const fromAnchor = this.parseAnchorAttribute(element, "fromAnchor");
    const to = this.parseClassifierAttribute(element, "to");
    const toAnchor = this.parseAnchorAttribute(element, "toAnchor");
    const relationship = new constructor(from, fromAnchor, to, toAnchor);
    relationship.fromTip = this.parseTipAttribute(
      element,
      "fromTip",
      relationship.fromTip
    );
    relationship.toTip = this.parseTipAttribute(
      element,
      "toTip",
      relationship.toTip
    );
    relationship.linePattern = this.parseLinePatternAttribute(
      element,
      "linePattern",
      relationship.linePattern
    );
    return relationship;
  }

  private parseTitle(element: Element): Model.Title {
    const text = element.textContent ?? "";
    return new Model.Title(text);
  }

  private parseText(element: Element): Model.Text {
    const text = element.textContent ?? "";
    return new Model.Text(text);
  }

  private parseChildren(element: Element, target: Model.Element) {
    for (const child of element.children) {
      try {
        target.addChild(this.parseElement(child));
      } catch (err) {
        console.error(err);
      }
    }
  }

  private parseClassifierAttribute(
    element: Element,
    attribute: string
  ): Model.Classifier {
    if (element.hasAttribute(attribute)) {
      const id = element.getAttribute(attribute)!;
      const elementById = element.ownerDocument.getElementById(id);
      if (elementById !== null) {
        const classifier = this.parseElement(elementById);
        if (classifier instanceof Model.Classifier) {
          return classifier;
        }
      }
    }

    throw new Error(
      `Invalid classifier: <${
        element.tagName
      } ${attribute}="${element.getAttribute(attribute)}" />`
    );
  }

  private parseAnchorAttribute(
    element: Element,
    attribute: string
  ): Model.Anchor {
    return this.parseEnumAttribute(
      Model.Anchor,
      element,
      attribute,
      Model.Anchor.S
    );
  }

  private parseTipAttribute(
    element: Element,
    attribute: string,
    fallback: Model.Tip
  ): Model.Tip {
    return this.parseEnumAttribute(Model.Tip, element, attribute, fallback);
  }

  private parseLinePatternAttribute(
    element: Element,
    attribute: string,
    fallback: Model.LinePattern
  ): Model.LinePattern {
    return this.parseEnumAttribute(
      Model.LinePattern,
      element,
      attribute,
      fallback
    );
  }

  private parseEnumAttribute<E>(
    enumClass: Record<string, unknown>,
    element: Element,
    attribute: string,
    fallback: E
  ): E {
    if (element.hasAttribute(attribute)) {
      const value = element.getAttribute(attribute)!;
      const item = Reflect.get(enumClass, value.toUpperCase());
      if (item !== undefined) {
        return item;
      }
    }

    return fallback;
  }

  private parseIntAttribute(
    element: Element,
    attribute: string,
    fallback: number
  ): number {
    if (element.hasAttribute(attribute)) {
      const value = parseInt(element.getAttribute(attribute)!, 10);
      if (!Number.isNaN(value)) {
        return value;
      }
    }

    return fallback;
  }
}

export default Serializer;
