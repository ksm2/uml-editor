import Style from "./Style";
import Property from "./Property";
import Selector from "./Selector";

class Rule extends Style {
  readonly selector: Selector;
  readonly properties: Set<Property>;

  constructor(selector: Selector, properties: Set<Property>, rules: Set<Rule>) {
    super(rules);
    this.selector = selector;
    this.properties = properties;
  }
}

export default Rule;
