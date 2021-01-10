import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { INITIAL_CSS, INITIAL_XML } from "../constants";
import { decode, encode } from "../encoding";
import { useDocumentTitle } from "../hooks";
import { useStore } from "../modules";
import "./App.css";
import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";

function App() {
  const { title, css, xml, dispatch } = useStore("title", "xml", "css");
  const intl = useIntl();
  const untitledMsg = intl.formatMessage({ id: "untitled", defaultMessage: "Untitled" });
  const titleMsg = intl.formatMessage({ id: "title", defaultMessage: "UML Editor" });

  useDocumentTitle(`${title} - ${titleMsg}`);

  useEffect(() => {
    if (window.location.hash.startsWith("#/?doc=")) {
      const hash = window.location.hash.slice("#/?doc=".length);
      const file = decode(hash);
      if (file.xml && file.css) {
        dispatch("file/load", file);
        return;
      }
    }

    dispatch("file/load", { xml: INITIAL_XML, css: INITIAL_CSS, title: untitledMsg });
  }, [untitledMsg, dispatch]);

  useEffect(() => {
    const hash = encode({ title, xml, css });
    window.location.hash = `/?doc=${hash}`;
  }, [title, xml, css]);

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
