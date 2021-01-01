import { useEffect, useState } from "react";
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
    const initialXml = `\
<Diagram>
  <Interface id="i1" anchor="s" x="0" y="-50">
    <Stereotype/>
    <Title>Visitor</Title>
  </Interface>

  <Class id="c1" anchor="n" x="0" y="50" width="400">
    <Stereotype/>
    <Title>Concrete Visitor</Title>
    <Separator/>
    <Method>visitSomething(something: Something)</Method>
  </Class>

  <Implementation from="c1" to="i1" fromAnchor="n" toAnchor="s"/>
</Diagram>
`;
    const initialCss = `\
Interface {
  Title {
    font-style: italic;
  }
}

Class {
  Title {
    font-weight: bold;
  }
}
`;

    const diagram = serializer.deserialize(initialXml);
    const style = parser.parseFromString(initialCss);
    setDiagram(diagram);
    setStyle(style);
    setXml(initialXml);
    setCss(initialCss);
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
