import { MessageFormatElement } from "intl-messageformat-parser";
import React, { Dispatch, ReactNode, useState } from "react";
import { IntlProvider } from "react-intl";
import DE_MESSAGES from "../../i18n/de.json";
import EN_MESSAGES from "../../i18n/en.json";

interface Props {
  children?: (onLocaleChange: Dispatch<string>) => ReactNode;
}

function getMessagesForLocale(locale: string): Record<string, MessageFormatElement[]> {
  switch (locale) {
    case "de":
      return DE_MESSAGES;
    default:
      return EN_MESSAGES;
  }
}

function LocaleSwitch({ children }: Props) {
  const [locale, setLocale] = useState(navigator.language.substring(0, 2));

  return (
    <IntlProvider messages={getMessagesForLocale(locale)} locale={locale} defaultLocale="en">
      {children?.(setLocale)}
    </IntlProvider>
  );
}

export default LocaleSwitch;
