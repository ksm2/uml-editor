import { fileSerializer } from "../serializer";
import { SerializableFile } from "../utils";
import * as Base64 from "./base64";
import * as Pako from "pako";
import * as UTF8 from "./utf8";

export function encode(file: SerializableFile): string {
  const string = fileSerializer.saveToString(file);
  const utf8 = UTF8.encode(string);
  const deflated = Pako.deflate(utf8);
  return Base64.encode(deflated);
}

export function decode(hash: string): SerializableFile {
  const deflated = Base64.decode(hash);
  const utf8 = Pako.inflate(deflated);
  const string = UTF8.decode(utf8);
  return fileSerializer.loadFromString(string);
}
