import { Dispatch } from "react";
import { useIntl } from "react-intl";
import { ViewOptions, File, SerializableFile } from "../../utils";
import { DropdownDivider, DropdownItem, Flag, Icon, Menu, MenuBar } from "../blocks";
import FileNew from "./FileNew";
import FileOpen from "./FileOpen";
import FileRename from "./FileRename";
import FileSave from "./FileSave";
import Grid from "./Grid";
import PNGExport from "./PNGExport";
import SVGExport from "./SVGExport";

interface Props {
  file: File;
  viewOptions: ViewOptions;
  onFileChange: Dispatch<SerializableFile>;
  onViewOptionsChange: Dispatch<ViewOptions>;
  onLocaleChange: Dispatch<string>;
}

function AppMenu({ file, viewOptions, onFileChange, onViewOptionsChange, onLocaleChange }: Props) {
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

      <Menu title={intl.formatMessage({ id: "view", defaultMessage: "View" })}>
        <Grid viewOptions={viewOptions} onViewOptionsChange={onViewOptionsChange} />
      </Menu>

      <Menu title={intl.formatMessage({ id: "export", defaultMessage: "Export" })}>
        <PNGExport file={file} />
        <SVGExport file={file} />
      </Menu>

      <div className="flex-grow-1" />

      <Menu placement="end" title={<Icon name="globe" />}>
        <DropdownItem onClick={() => onLocaleChange("de")}>
          <Flag country="de" /> Deutsch
        </DropdownItem>
        <DropdownItem onClick={() => onLocaleChange("en")}>
          <Flag country="uk" /> English
        </DropdownItem>
      </Menu>
    </MenuBar>
  );
}

export default AppMenu;
