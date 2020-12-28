import { useEffect, useState } from "react";
import { Diagram, Element } from "../model";
import { serializer } from "../serializer";
import "./App.css";
import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";

function App() {
  const [diagram, setDiagram] = useState(() => new Diagram());
  const [xml, setXml] = useState("");

  function handleXmlChange(xml: string): void {
    const diagram = serializer.deserialize(xml);
    setDiagram(diagram);
  }

  function handleCanvasChange(element: Element): void {
    serializer.updateElement(element);
    const xml = serializer.serialize(diagram);
    setXml(xml);
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
    const diagram = serializer.deserialize(initialXml);
    setDiagram(diagram);
    setXml(initialXml);
  }, []);

  return (
    <div className="App bg-secondary">
      <AppMenu />
      <XMLEditor xml={xml} onChange={handleXmlChange} />
      <CSSEditor />
      <Canvas diagram={diagram} onChange={handleCanvasChange} />
    </div>
  );
}

export default App;
