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

    const value = this.parseOneOf(this.parseColor, this.parseNumber, this.parseIdentifier);
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

  private parseIdentifier(): string {
    const identifier = this.consume(CSSToken.IDENTIFIER);
    return identifier.value;
  }
}

export default CSSParser;
