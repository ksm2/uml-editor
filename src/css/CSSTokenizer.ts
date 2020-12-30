import { Tokenizer } from "../parsing";
import CSSToken from "./CSSToken";

class CSSTokenizer extends Tokenizer<CSSToken> {
  protected next(): CSSToken | null {
    // Whitespace
    if (this.matches(/^\s+/)) return null;

    // Literals
    if (this.matches(/^#[0-9a-fA-F]{6}|^#[0-9a-fA-F]{3}/)) return CSSToken.COLOR;
    if (this.matches(/^\d+(\.\d*)?|^\.\d+/)) return CSSToken.NUMBER;

    // Operators
    if (this.startsWith("{")) return CSSToken.LBRACE;
    if (this.startsWith("}")) return CSSToken.RBRACE;
    if (this.startsWith(":")) return CSSToken.COLON;
    if (this.startsWith(";")) return CSSToken.SEMI;
    if (this.startsWith(".")) return CSSToken.DOT;
    if (this.startsWith("#")) return CSSToken.HASH;

    if (this.matches(/^[a-zA-Z]+(-[a-zA-Z]+)*/)) return CSSToken.IDENTIFIER;

    // Fallback
    this.matches(/^./);
    return CSSToken.ERROR;
  }
}

export default CSSTokenizer;
