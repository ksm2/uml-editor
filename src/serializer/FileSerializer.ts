import { File } from "../utils";
import Serializer from "./Serializer";

class FileSerializer {
  private readonly serializer: Serializer;

  constructor(serializer: Serializer) {
    this.serializer = serializer;
  }

  saveToString(file: File): string {
    const header = `title: ${file.title}`;
    const model = this.serializer.serialize(file.model);
    const style = file.css;
    return this.joinSections(header, model, style);
  }

  private joinSections(...sections: string[]): string {
    return sections.map((str) => str.trim()).join("\n---\n") + "\n";
  }
}

export default FileSerializer;
