import PropertyMap from "./PropertyMap";
import Rule from "./Rule";

class Style {
  readonly rules: Set<Rule>;

  constructor(rules = new Set<Rule>()) {
    this.rules = rules;
  }

  getProperties(context: string[]): PropertyMap {
    const result = new PropertyMap();
    const [head, ...tail] = context;
    const hasTail = tail.length > 0;
    for (const rule of this.rules) {
      if (rule.selector.tag === head) {
        const properties = new PropertyMap(rule.properties);
        if (hasTail) {
          properties.addAll(rule.getProperties(tail));
        }
        result.addAll(properties);
      }
    }

    return result;
  }
}

export default Style;
