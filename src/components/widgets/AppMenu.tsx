import { Dispatch } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Element } from "../../model";
import { File, SerializableFile, ViewOptions } from "../../utils";
import { DropdownDivider, ExternalLink, Icon, Menu, MenuBar, NavItem } from "../blocks";
import DeleteElement from "./DeleteElement";
import DuplicateElement from "./DuplicateElement";
import FileNew from "./FileNew";
import FileOpen from "./FileOpen";
import FileRename from "./FileRename";
import FileSave from "./FileSave";
import LocaleItem from "./LocaleItem";
import PNGExport from "./PNGExport";
import SVGExport from "./SVGExport";
import ToggleGrid from "./ToggleGrid";

interface Props {
  file: File;
  viewOptions: ViewOptions;
  onFileChange: Dispatch<SerializableFile>;
  onViewOptionsChange: Dispatch<ViewOptions>;
  onLocaleChange: Dispatch<string>;
  onAddElement: Dispatch<Element>;
  onDeleteElement: Dispatch<Element>;
}

function AppMenu({
  file,
  viewOptions,
  onFileChange,
  onViewOptionsChange,
  onLocaleChange,
  onAddElement,
  onDeleteElement,
}: Props) {
  const intl = useIntl();

  return (
    <MenuBar>
      <Menu title={intl.formatMessage({ id: "file", defaultMessage: "File" })}>
        <FileNew onFileChange={onFileChange} />
        <DropdownDivider />
        <FileOpen onFileChange={onFileChange} />
        <FileSave file={file} />
        <DropdownDivider />
        <FileRename file={file} onTitleChange={(title) => onFileChange({ ...file, title })} />
      </Menu>

      <Menu title={intl.formatMessage({ id: "edit", defaultMessage: "Edit" })}>
        <DuplicateElement file={file} onAddElement={onAddElement} />
        <DeleteElement file={file} onDeleteElement={onDeleteElement} />
      </Menu>

      <Menu title={intl.formatMessage({ id: "view", defaultMessage: "View" })}>
        <ToggleGrid viewOptions={viewOptions} onViewOptionsChange={onViewOptionsChange} />
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
        <LocaleItem locale="de" name="Deutsch" onLocaleChange={onLocaleChange} />
        <LocaleItem locale="en" name="English" onLocaleChange={onLocaleChange} country="uk" />
      </Menu>
    </MenuBar>
  );
}

export default AppMenu;
