import {
  Anchor,
  Classifier,
  Diagram,
  Relationship,
  Separator,
  Text,
} from "../model";
import "./App.css";
import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";

function App() {
  const c1 = new Classifier(Anchor.S, 0, -50, 200, 120);
  c1.addChild(new Text("Hello"));
  c1.addChild(new Separator());
  c1.addChild(new Text("Hello"));
  c1.addChild(new Text("World"));
  c1.addChild(new Separator());
  const c2 = new Classifier(Anchor.N, 0, 50, 200, 100);
  c2.addChild(new Text("Hello"));
  const r1 = new Relationship(c2, Anchor.N, c1, Anchor.S);
  const diagram = new Diagram();
  diagram.addChild(c1);
  diagram.addChild(c2);
  diagram.addChild(r1);

  return (
    <div className="App bg-secondary">
      <AppMenu />
      <XMLEditor />
      <CSSEditor />
      <Canvas diagram={diagram} />
    </div>
  );
}

export default App;
