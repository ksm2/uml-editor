import * as Model from "../model";
import { Separator } from "../model";

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

  private doParseElement(element: Element): Model.Element {
    switch (element.tagName) {
      case "Diagram":
        return this.parseDiagram(element);
      case "Class":
      case "Classifier":
      case "Interface":
        return this.parseClassifier(element);
      case "Implementation":
      case "Association":
      case "Relationship":
        return this.parseRelationship(element);
      case "Title":
        return this.parseTitle(element);
      case "Method":
      case "Text":
        return this.parseText(element);
      case "Separator":
        return new Separator();
    }

    throw new Error(`Unknown tag: ${element.tagName}`);
  }

  private parseDiagram(element: Element): Model.Diagram {
    const diagram = new Model.Diagram();
    this.parseChildren(element, diagram);
    return diagram;
  }

  private parseClassifier(element: Element): Model.Classifier {
    const anchor = this.parseAnchorAttribute(element, "anchor");
    const x = this.parseIntAttribute(element, "x", 0);
    const y = this.parseIntAttribute(element, "y", 0);
    const width = this.parseIntAttribute(element, "width", 200);
    const height = this.parseIntAttribute(element, "height", 120);
    const classifier = new Model.Classifier(anchor, x, y, width, height);
    this.parseChildren(element, classifier);
    return classifier;
  }

  private parseRelationship(element: Element): Model.Relationship {
    const from = this.parseClassifierAttribute(element, "from");
    const fromAnchor = this.parseAnchorAttribute(element, "fromAnchor");
    const to = this.parseClassifierAttribute(element, "to");
    const toAnchor = this.parseAnchorAttribute(element, "toAnchor");
    return new Model.Relationship(from, fromAnchor, to, toAnchor);
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
    if (element.hasAttribute(attribute)) {
      const value = element.getAttribute(attribute)!;
      const item = Reflect.get(Model.Anchor, value.toUpperCase());
      if (item !== undefined) {
        return item;
      }
    }

    return Model.Anchor.S;
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
