import { SerializableFile } from "../utils";

class FileSerializer {
  saveToString(file: SerializableFile): string {
    const header = `title: ${file.title}`;
    const model = file.xml;
    const style = file.css;
    return this.joinSections(header, model, style);
  }

  loadFromString(content: string): SerializableFile {
    const [headerString, model, style] = this.splitSections(content, 3);
    const header = this.parseHeader(headerString);
    return {
      title: header.title ?? "Untitled",
      xml: model,
      css: style,
    };
  }

  private joinSections(...sections: string[]): string {
    return sections.map((str) => str.trim()).join("\n---\n") + "\n";
  }

  private splitSections(content: string, expectedNumber: number): string[] {
    const sections = content.split("\n---\n");
    if (sections.length !== expectedNumber) {
      throw new Error(`Expected ${expectedNumber} sections`);
    }

    return sections;
  }

  private parseHeader(headerString: string): Record<string, string> {
    const result: Record<string, string> = {};
    for (const line of headerString.split(/\r\n|[\r\n]/)) {
      const [key, value] = line.split(/:\s*/, 2);
      result[key] = value;
    }

    return result;
  }
}

export default FileSerializer;
