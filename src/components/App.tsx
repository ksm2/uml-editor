import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";
import "./App.css";

function App() {
  return (
    <div className="App bg-secondary">
      <AppMenu />
      <XMLEditor />
      <CSSEditor />
      <Canvas />
    </div>
  );
}

export default App;
