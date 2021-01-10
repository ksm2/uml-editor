import { StoreonStore } from "storeon";
import { parser, Style } from "../css";
import { Diagram, Element } from "../model";
import { serializer } from "../serializer";

export interface FileState {
  title: string;
  model: Diagram;
  style: Style;
  xml: string;
  css: string;
}

export interface FileEvents {
  "file/load": { title: string; css: string; xml: string };
  "file/xml": string;
  "file/css": string;
  "file/title": string;
  "file/model": Element;
  "file/add": Element;
  "file/delete": Element;
}

export function file(store: StoreonStore<FileState, FileEvents>) {
  store.on("@init", () => ({
    title: "",
    xml: "",
    css: "",
    model: new Diagram(),
    style: new Style(),
  }));

  store.on("file/load", (state, { xml, css, title }) => {
    store.dispatch("file/xml", xml);
    store.dispatch("file/css", css);
    store.dispatch("file/title", title);
  });

  store.on("file/add", (state, element) => {
    state.model.addChild(element);
    store.dispatch("file/model", state.model);
  });

  store.on("file/delete", (state, element) => {
    state.model.deleteChild(element);
    store.dispatch("file/model", state.model);
  });

  store.on("file/xml", (state, xml) => {
    const model = serializer.deserialize(xml);
    return { ...state, xml, model };
  });

  store.on("file/css", (state, css) => {
    const style = parser.parseFromString(css);
    return { ...state, css, style };
  });

  store.on("file/title", (state, title) => ({ ...state, title }));

  store.on("file/model", (state, element) => {
    serializer.updateElement(element);
    const xml = serializer.serialize(state.model);
    return { ...state, xml };
  });
}
