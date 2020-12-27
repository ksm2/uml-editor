import Serializer from "./Serializer";
import * as Model from "../model";
import * as UML from "../uml";

class UMLSerializer extends Serializer {
  protected doParseElement(element: Element): Model.Element {
    switch (element.tagName) {
      case "Aggregation":
        return this.parseRelationship(UML.Aggregation, element);
      case "Anchor":
        return this.parseRelationship(UML.Anchor, element);
      case "Association":
        return this.parseRelationship(UML.Association, element);
      case "Class":
        return this.parseClassifier(UML.Class, element);
      case "Composition":
        return this.parseRelationship(UML.Composition, element);
      case "DataType":
        return this.parseClassifier(UML.DataType, element);
      case "Dependency":
        return this.parseRelationship(UML.Dependency, element);
      case "DirectedAssociation":
        return this.parseRelationship(UML.DirectedAssociation, element);
      case "Enumeration":
        return this.parseClassifier(UML.Enumeration, element);
      case "Generalization":
        return this.parseRelationship(UML.Generalization, element);
      case "Implementation":
        return this.parseRelationship(UML.Implementation, element);
      case "Interface":
        return this.parseClassifier(UML.Interface, element);
      case "Note":
        return this.parseClassifier(UML.Note, element);
      case "Object":
        return this.parseClassifier(UML.Object, element);
      case "Primitive":
        return this.parseClassifier(UML.Primitive, element);
      default:
        return super.doParseElement(element);
    }
  }
}

export default UMLSerializer;
