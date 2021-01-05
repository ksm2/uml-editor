import { Dispatch } from "react";
import { useIntl } from "react-intl";
import { DropdownItem, Flag } from "../blocks";

interface Props {
  locale: string;
  name: string;
  country?: string;
  onLocaleChange: Dispatch<string>;
}

function LocaleItem({ locale, name, country = locale, onLocaleChange }: Props) {
  const intl = useIntl();

  return (
    <DropdownItem active={intl.locale === locale} onClick={() => onLocaleChange(locale)}>
      <Flag country={country} /> {name}
    </DropdownItem>
  );
}

export default LocaleItem;
