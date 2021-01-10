import { Dispatch } from "react";
import { useIntl } from "react-intl";
import { Locale } from "../../utils";
import { DropdownItem, Flag } from "../blocks";

interface Props {
  locale: Locale;
  name: string;
  country?: string;
  onChange: Dispatch<Locale>;
}

function LocaleItem({ locale, name, country = locale, onChange }: Props) {
  const intl = useIntl();

  return (
    <DropdownItem active={intl.locale === locale} onClick={() => onChange(locale)}>
      <Flag country={country} /> {name}
    </DropdownItem>
  );
}

export default LocaleItem;
