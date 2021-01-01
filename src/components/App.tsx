import { useEffect, useState } from "react";
import { INITIAL_CSS, INITIAL_XML } from "../constants";
import { parser, Style } from "../css";
import { useDocumentTitle } from "../hooks";
import { Diagram, Element } from "../model";
import { serializer } from "../serializer";
import { SerializableFile } from "../utils";
import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";
import "./App.css";

function App() {
  const [diagram, setDiagram] = useState(() => new Diagram());
  const [style, setStyle] = useState(() => new Style());
  const [title, setTitle] = useState("Untitled");
  const [xml, setXml] = useState("");
  const [css, setCss] = useState("");

  useDocumentTitle(`${title} - UML Editor`);

  function handleXmlChange(xml: string): void {
    const diagram = serializer.deserialize(xml);
    setDiagram(diagram);
    setXml(xml);
  }

  function handleCssChange(css: string): void {
    const style = parser.parseFromString(css);
    setStyle(style);
    setCss(css);
  }

  function handleCanvasChange(element: Element): void {
    serializer.updateElement(element);
    const xml = serializer.serialize(diagram);
    setXml(xml);
  }

  function handleFileChange(file: SerializableFile): void {
    const diagram = serializer.deserialize(file.xml);
    const style = parser.parseFromString(file.css);
    setTitle(file.title);
    setCss(file.css);
    setXml(file.xml);
    setDiagram(diagram);
    setStyle(style);
  }

  useEffect(() => {
    const diagram = serializer.deserialize(INITIAL_XML);
    const style = parser.parseFromString(INITIAL_CSS);
    setDiagram(diagram);
    setStyle(style);
    setXml(INITIAL_XML);
    setCss(INITIAL_CSS);
  }, []);

  return (
    <div className="App bg-secondary">
      <AppMenu file={{ title, model: diagram, style, xml, css }} onFileChange={handleFileChange} />
      <XMLEditor xml={xml} onChange={handleXmlChange} />
      <CSSEditor css={css} onChange={handleCssChange} />
      <Canvas diagram={diagram} style={style} onChange={handleCanvasChange} />
    </div>
  );
}

export default App;
