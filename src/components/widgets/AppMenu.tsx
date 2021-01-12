import { FormattedMessage, useIntl } from "react-intl";
import { Element } from "../../model";
import { useStore } from "../../modules";
import { Locale, SerializableFile } from "../../utils";
import { DropdownDivider, ExternalLink, Icon, Menu, MenuBar, NavItem } from "../blocks";
import DeleteElement from "./DeleteElement";
import DuplicateElement from "./DuplicateElement";
import FileNew from "./FileNew";
import FileOpen from "./FileOpen";
import FileRename from "./FileRename";
import FileSave from "./FileSave";
import LocaleItem from "./LocaleItem";
import MoveDown from "./MoveDown";
import MoveLeft from "./MoveLeft";
import MoveRight from "./MoveRight";
import MoveUp from "./MoveUp";
import PNGExport from "./PNGExport";
import SVGExport from "./SVGExport";
import ToggleGrid from "./ToggleGrid";
import ZoomIn from "./ZoomIn";
import ZoomOut from "./ZoomOut";
import ZoomReset from "./ZoomReset";

function AppMenu() {
  const file = useStore("title", "xml", "css", "model", "style");
  const { grid, dispatch } = useStore("grid");
  const intl = useIntl();

  function handleFileChange(file: SerializableFile) {
    dispatch("file/load", file);
  }

  function handleAddElement(element: Element) {
    dispatch("file/add", element);
  }

  function handleDeleteElement(element: Element) {
    dispatch("file/delete", element);
  }

  function handleGridChange(grid: boolean) {
    dispatch("view/grid", grid);
  }

  function handleLocaleChange(locale: Locale) {
    dispatch("locale/change", locale);
  }

  return (
    <MenuBar>
      <Menu title={intl.formatMessage({ id: "file", defaultMessage: "File" })}>
        <FileNew onFileChange={handleFileChange} />
        <DropdownDivider />
        <FileOpen onFileChange={handleFileChange} />
        <FileSave file={file} />
        <DropdownDivider />
        <FileRename file={file} onTitleChange={(title) => handleFileChange({ ...file, title })} />
      </Menu>

      <Menu title={intl.formatMessage({ id: "edit", defaultMessage: "Edit" })}>
        <DuplicateElement file={file} onAddElement={handleAddElement} />
        <DeleteElement file={file} onDeleteElement={handleDeleteElement} />
      </Menu>

      <Menu title={intl.formatMessage({ id: "view", defaultMessage: "View" })}>
        <MoveLeft onMove={() => dispatch("view/moveLeft")} />
        <MoveRight onMove={() => dispatch("view/moveRight")} />
        <MoveUp onMove={() => dispatch("view/moveUp")} />
        <MoveDown onMove={() => dispatch("view/moveDown")} />
        <DropdownDivider />
        <ZoomReset onZoom={() => dispatch("view/zoomReset")} />
        <ZoomIn onZoom={() => dispatch("view/zoomIn")} />
        <ZoomOut onZoom={() => dispatch("view/zoomOut")} />
        <DropdownDivider />
        <ToggleGrid grid={grid} onChange={handleGridChange} />
      </Menu>

      <Menu title={intl.formatMessage({ id: "export", defaultMessage: "Export" })}>
        <PNGExport file={file} />
        <SVGExport file={file} />
      </Menu>

      <div className="flex-grow-1" />

      <NavItem>
        <ExternalLink className="nav-link" href="https://github.com/ksm2/uml-editor">
          <Icon name="github" />
          <FormattedMessage id="github" defaultMessage="GitHub" />
        </ExternalLink>
      </NavItem>
      <Menu
        placement="end"
        title={
          <>
            <Icon name="globe" />
            <FormattedMessage id="lang" defaultMessage="Language" />
          </>
        }
      >
        <LocaleItem locale={Locale.GERMAN} name="Deutsch" onChange={handleLocaleChange} />
        <LocaleItem
          locale={Locale.ENGLISH}
          name="English"
          onChange={handleLocaleChange}
          country="uk"
        />
      </Menu>
    </MenuBar>
  );
}

export default AppMenu;
