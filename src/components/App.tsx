import { SplitView } from "./blocks";
import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";
import "./App.css";

function App() {
  return (
    <div className="App bg-secondary">
      <AppMenu />
      <SplitView direction="horizontal">
        <SplitView direction="vertical">
          <XMLEditor />
          <CSSEditor />
        </SplitView>
        <Canvas />
      </SplitView>
    </div>
  );
}

export default App;
