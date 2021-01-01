import { Parser } from "../parsing";
import Color from "./Color";
import CSSToken from "./CSSToken";
import CSSTokenizer from "./CSSTokenizer";
import Property from "./Property";
import Rule from "./Rule";
import Selector from "./Selector";
import Style from "./Style";

class CSSParser extends Parser<CSSToken, Style> {
  constructor() {
    super(new CSSTokenizer());
  }

  protected parse(): Style {
    return new Style(this.parseRuleSet());
  }

  private parseRuleSet(): Set<Rule> {
    return this.parseSet(this.parseRule);
  }

  protected parseRule(): Rule {
    const selector = this.parseSelector();
    this.consume(CSSToken.LBRACE);
    const properties = this.parsePropertySet();
    const rules = this.parseRuleSet();
    this.consume(CSSToken.RBRACE);

    return new Rule(selector, properties, rules);
  }

  private parseSelector(): Selector {
    const tag = this.consume(CSSToken.IDENTIFIER);
    const classes = this.parseClassSet();
    const id = this.parseOptionalId();

    return new Selector(tag.value, classes, id);
  }

  private parsePropertySet(): Set<Property> {
    return this.parseSet(this.parseProperty);
  }

  private parseProperty(): Property {
    const key = this.parseIdentifier();
    this.consume(CSSToken.COLON);

    const value = this.parseOneOf(this.parseColor, this.parseNumber, this.parseIdentifierValue);
    this.consume(CSSToken.SEMI);

    return new Property(key, value);
  }

  private parseClassSet(): Set<string> {
    return this.parseSet(this.parseClass);
  }

  private parseClass(): string {
    this.consume(CSSToken.DOT);
    const className = this.consume(CSSToken.IDENTIFIER);
    return className.value;
  }

  private parseOptionalId(): string | undefined {
    return this.parseOptional(this.parseId);
  }

  private parseId(): string {
    this.consume(CSSToken.HASH);
    const id = this.consume(CSSToken.IDENTIFIER);
    return id.value;
  }

  private parseColor(): Color {
    const color = this.consume(CSSToken.COLOR);
    return Color.fromHexString(color.value);
  }

  private parseNumber(): number {
    const number = this.consume(CSSToken.NUMBER);
    return parseFloat(number.value);
  }

  private parseIdentifierValue(): string | Color {
    const identifier = this.parseIdentifier();
    switch (identifier) {
      case "blue":
        return Color.BLUE;
      case "indigo":
        return Color.INDIGO;
      case "purple":
        return Color.PURPLE;
      case "pink":
        return Color.PINK;
      case "red":
        return Color.RED;
      case "orange":
        return Color.ORANGE;
      case "yellow":
        return Color.YELLOW;
      case "green":
        return Color.GREEN;
      case "teal":
        return Color.TEAL;
      case "cyan":
        return Color.CYAN;
      case "white":
        return Color.WHITE;
      case "gray":
        return Color.GRAY;
      case "gray-dark":
        return Color.GRAY_DARK;
      case "primary":
        return Color.PRIMARY;
      case "secondary":
        return Color.SECONDARY;
      case "success":
        return Color.SUCCESS;
      case "info":
        return Color.INFO;
      case "warning":
        return Color.WARNING;
      case "danger":
        return Color.DANGER;
      case "light":
        return Color.LIGHT;
      case "dark":
        return Color.DARK;
      default:
        return identifier;
    }
  }

  private parseIdentifier(): string {
    const identifier = this.consume(CSSToken.IDENTIFIER);
    return identifier.value;
  }
}

export default CSSParser;
