import * as Model from "../model";

interface Class<T> {
  new (...args: any[]): T;
}

class Serializer {
  private readonly parser: DOMParser;
  private readonly serializer: XMLSerializer;
  private readonly elementMap = new Map<Element, Model.Element>();

  constructor() {
    this.parser = new DOMParser();
    this.serializer = new XMLSerializer();
  }

  deserialize(xml: string): Model.Diagram {
    this.elementMap.clear();
    const document = this.parser.parseFromString(xml, "text/xml");
    const diagram = this.parseElement(document.documentElement);
    if (!(diagram instanceof Model.Diagram)) {
      return new Model.Diagram();
    }

    return diagram;
  }

  serialize(diagram: Model.Diagram): string {
    if (this.hasElement(diagram)) {
      const root = this.getElement(diagram)!;
      return this.serializer.serializeToString(root);
    }

    return "";
  }

  updateElement(element: Model.Element): void {
    if (this.hasElement(element)) {
      const xmlElement = this.getElement(element)!;
      this.setElement(xmlElement, element);
    }
  }

  private parseElement(element: Element): Model.Element {
    if (this.elementMap.has(element)) {
      return this.elementMap.get(element)!;
    }

    const parsed = this.parseElementSwitch(element);
    this.elementMap.set(element, parsed);
    return parsed;
  }

  private setElement(xmlElement: Element, element: Model.Element) {
    if (element instanceof Model.Diagram) {
      this.setDiagram(xmlElement, element);
    } else if (element instanceof Model.Classifier) {
      this.setClassifier(xmlElement, element);
    } else if (element instanceof Model.Text) {
      this.setText(xmlElement, element);
    }
  }

  protected parseElementSwitch(element: Element): Model.Element {
    switch (element.tagName) {
      case "Diagram":
        return this.parseDiagram(element);
      case "Classifier":
        return this.parseClassifier(Model.Classifier, element);
      case "Relationship":
        return this.parseRelationship(Model.Relationship, element);
      case "Title":
        return this.parseTitle(element);
      case "Text":
        return this.parseText(element);
      case "Separator":
        return new Model.Separator();
      case "Stereotype":
        return new Model.Stereotype();
    }

    throw new Error(`Unknown tag: ${element.tagName}`);
  }

  private parseDiagram(element: Element): Model.Diagram {
    const diagram = new Model.Diagram();
    this.parseChildren(element, diagram);
    return diagram;
  }

  private setDiagram(element: Element, diagram: Model.Diagram): void {
    this.updateChildren(element, diagram);
  }

  protected parseClassifier<C extends Model.Classifier>(
    constructor: Class<C>,
    element: Element,
  ): C {
    const anchor = this.parseAnchorAttribute(element, "anchor");
    const x = this.parseIntAttribute(element, "x", 0);
    const y = this.parseIntAttribute(element, "y", 0);
    const width = this.parseIntAttribute(element, "width", 200);
    const height = this.parseIntAttribute(element, "height", 120);
    const classifier = new constructor(anchor, x, y, width, height);
    classifier.shape = this.parseEnumAttribute(Model.Shape, element, "shape", classifier.shape);
    this.parseChildren(element, classifier);
    return classifier;
  }

  protected setClassifier(element: Element, classifier: Model.Classifier): void {
    this.setAnchorAttribute(element, "anchor", classifier.anchor);
    this.setIntAttribute(element, "x", 0, classifier.getX());
    this.setIntAttribute(element, "y", 0, classifier.getY());
    this.setIntAttribute(element, "width", 200, classifier.getWidth());
    this.setIntAttribute(element, "height", 120, classifier.getHeight());
    this.updateChildren(element, classifier);
  }

  protected parseRelationship<R extends Model.Relationship>(
    constructor: Class<R>,
    element: Element,
  ): R {
    const from = this.parseClassifierAttribute(element, "from");
    const fromAnchor = this.parseAnchorAttribute(element, "fromAnchor");
    const to = this.parseClassifierAttribute(element, "to");
    const toAnchor = this.parseAnchorAttribute(element, "toAnchor");
    const relationship = new constructor(from, fromAnchor, to, toAnchor);
    relationship.fromTip = this.parseTipAttribute(element, "fromTip", relationship.fromTip);
    relationship.toTip = this.parseTipAttribute(element, "toTip", relationship.toTip);
    relationship.linePattern = this.parseLinePatternAttribute(
      element,
      "linePattern",
      relationship.linePattern,
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

  private setText(element: Element, text: Model.Text) {
    element.textContent = text.text;
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

  private updateChildren(element: Element, target: Model.Element) {
    for (const child of target.getChildren()) {
      const childElement = this.getOrCreateElement(element, child);
      this.setElement(childElement, child);
    }
  }

  private getOrCreateElement(element: Element, child: Model.Element): Element {
    if (this.hasElement(child)) {
      return this.getElement(child)!;
    } else {
      return this.createElement(element, child);
    }
  }

  private parseClassifierAttribute(element: Element, attribute: string): Model.Classifier {
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
      `Invalid classifier: <${element.tagName} ${attribute}="${element.getAttribute(
        attribute,
      )}" />`,
    );
  }

  private parseAnchorAttribute(element: Element, attribute: string): Model.Anchor {
    return this.parseEnumAttribute(Model.Anchor, element, attribute, Model.Anchor.S);
  }

  private setAnchorAttribute(element: Element, attribute: string, anchor: Model.Anchor) {
    this.setEnumAttribute(Model.Anchor, element, attribute, anchor);
  }

  private parseTipAttribute(element: Element, attribute: string, fallback: Model.Tip): Model.Tip {
    return this.parseEnumAttribute(Model.Tip, element, attribute, fallback);
  }

  private parseLinePatternAttribute(
    element: Element,
    attribute: string,
    fallback: Model.LinePattern,
  ): Model.LinePattern {
    return this.parseEnumAttribute(Model.LinePattern, element, attribute, fallback);
  }

  private parseEnumAttribute<E>(
    enumClass: Record<string, unknown>,
    element: Element,
    attribute: string,
    fallback: E,
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

  private setEnumAttribute(
    enumClass: Record<number, string>,
    element: Element,
    attribute: string,
    enumValue: number,
  ): void {
    const value = enumClass[enumValue].toLowerCase();
    element.setAttribute(attribute, value);
  }

  private parseIntAttribute(element: Element, attribute: string, fallback: number): number {
    if (element.hasAttribute(attribute)) {
      const value = parseInt(element.getAttribute(attribute)!, 10);
      if (!Number.isNaN(value)) {
        return value;
      }
    }

    return fallback;
  }

  private setIntAttribute(
    element: Element,
    attribute: string,
    fallback: number,
    value: number,
  ): void {
    if (value !== fallback) {
      element.setAttribute(attribute, String(value));
    } else {
      element.removeAttribute(attribute);
    }
  }

  private hasElement(element: Model.Element): boolean {
    for (const value of this.elementMap.values()) {
      if (value === element) {
        return true;
      }
    }
    return false;
  }

  private getElement(element: Model.Element): Element | undefined {
    for (const [xmlElement, el] of this.elementMap) {
      if (el === element) {
        return xmlElement;
      }
    }
    return undefined;
  }

  private createElement(parent: Element, element: Model.Element): Element {
    const newElement = parent.ownerDocument.createElement(element.getTagName());
    const id = this.generateId(parent.ownerDocument, element);
    newElement.setAttribute("id", id);
    this.elementMap.set(newElement, element);

    this.trailElementEnd(parent);
    this.addText(parent, this.getIndent(this.getLevel(1, parent)));
    parent.appendChild(newElement);
    this.addText(parent, this.getIndent(this.getLevel(0, parent)));

    return newElement;
  }

  private generateId(document: Document, element: Model.Element): string {
    let prefix = element.getTagName().toLowerCase();
    if (prefix === "interface") {
      prefix = "i";
    } else if (prefix === "class") {
      prefix = "c";
    }

    let i = 1;
    while (document.getElementById(prefix + i) !== null) {
      i += 1;
    }
    return prefix + i;
  }

  private trailElementEnd(element: Element): void {
    const { childNodes } = element;
    if (childNodes.length > 0) {
      const lastNode = childNodes.item(childNodes.length - 1);
      if (lastNode instanceof Text) {
        lastNode.remove();
      }
    }
  }

  private getIndent(level: number): string {
    return "\n" + "  ".repeat(level);
  }

  private getLevel(offset: number, parent: Element): number {
    if (parent.parentElement === null) {
      return offset;
    } else {
      return this.getLevel(offset + 1, parent.parentElement);
    }
  }

  private addText(parent: Element, data: string): void {
    parent.appendChild(parent.ownerDocument.createTextNode(data));
  }
}

export default Serializer;
