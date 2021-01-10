import React, { Dispatch, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { INITIAL_CSS, INITIAL_XML } from "../constants";
import { parser, Style } from "../css";
import { decode, encode } from "../encoding";
import { useDocumentTitle } from "../hooks";
import { Diagram, Element } from "../model";
import { serializer } from "../serializer";
import { SerializableFile, ViewOptions } from "../utils";
import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";
import "./App.css";

interface Props {
  onLocaleChange: Dispatch<string>;
}

function App({ onLocaleChange }: Props) {
  const intl = useIntl();
  const untitledMsg = intl.formatMessage({ id: "untitled", defaultMessage: "Untitled" });
  const titleMsg = intl.formatMessage({ id: "title", defaultMessage: "UML Editor" });

  const [viewOptions, setViewOptions] = useState<ViewOptions>({ grid: false });
  const [diagram, setDiagram] = useState(() => new Diagram());
  const [style, setStyle] = useState(() => new Style());
  const [title, setTitle] = useState(untitledMsg);
  const [xml, setXml] = useState("");
  const [css, setCss] = useState("");

  useDocumentTitle(`${title} - ${titleMsg}`);

  function forceRerender(): void {
    setViewOptions({ ...viewOptions });
  }

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

  function handleAddElement(element: Element): void {
    diagram.addChild(element);
    handleCanvasChange(diagram);
    forceRerender();
  }

  function handleDeleteElement(element: Element): void {
    diagram.deleteChild(element);
    handleCanvasChange(diagram);
    forceRerender();
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
    let docXml = INITIAL_XML;
    let docCss = INITIAL_CSS;
    if (window.location.hash.startsWith("#/?doc=")) {
      const hash = window.location.hash.slice("#/?doc=".length);
      const file = decode(hash);
      if (file.xml && file.css) {
        docXml = file.xml;
        docCss = file.css;
        setTitle(file.title);
      }
    }

    const diagram = serializer.deserialize(docXml);
    const style = parser.parseFromString(docCss);
    setDiagram(diagram);
    setStyle(style);
    setXml(docXml);
    setCss(docCss);
  }, []);

  useEffect(() => {
    const hash = encode({ title, xml, css });
    window.location.hash = `/?doc=${hash}`;
  }, [title, xml, css]);

  return (
    <div className="App bg-secondary">
      <AppMenu
        file={{ title, model: diagram, style, xml, css }}
        viewOptions={viewOptions}
        onFileChange={handleFileChange}
        onViewOptionsChange={setViewOptions}
        onLocaleChange={onLocaleChange}
        onAddElement={handleAddElement}
        onDeleteElement={handleDeleteElement}
      />
      <XMLEditor xml={xml} onChange={handleXmlChange} />
      <CSSEditor css={css} onChange={handleCssChange} />
      <Canvas
        viewOptions={viewOptions}
        diagram={diagram}
        style={style}
        onChange={handleCanvasChange}
      />
    </div>
  );
}

export default App;
