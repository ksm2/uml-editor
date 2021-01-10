import { MessageFormatElement } from "intl-messageformat-parser";
import React, { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import DE_MESSAGES from "../../i18n/de.json";
import EN_MESSAGES from "../../i18n/en.json";
import { useStore } from "../../modules";
import { Locale } from "../../utils";

interface Props {
  children?: ReactNode;
}

function messagesForLocale(locale: Locale): Record<string, MessageFormatElement[]> {
  switch (locale) {
    case Locale.GERMAN:
      return DE_MESSAGES;
    default:
      return EN_MESSAGES;
  }
}

function LocaleSwitch({ children }: Props) {
  const { locale } = useStore("locale");
  return (
    <IntlProvider
      messages={messagesForLocale(locale)}
      locale={locale}
      defaultLocale={Locale.ENGLISH}
    >
      {children}
    </IntlProvider>
  );
}

export default LocaleSwitch;
