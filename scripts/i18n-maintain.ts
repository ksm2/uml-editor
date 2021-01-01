import { MessageDescriptor } from "@formatjs/intl";
import { promises as fsp } from "fs";

const DEFAULT_LOCALE = "en";

async function maintain() {
  const files = await fsp.readdir("lang");
  const locales = files
    .map((file) => file.replace(/\.json$/, ""))
    .filter((locale) => locale !== DEFAULT_LOCALE);

  const defaultMessages = await loadLocale(DEFAULT_LOCALE);

  for (const locale of locales) {
    console.log(`Locale ${locale}`);
    const messages = await loadLocale(locale);

    for (const [id, message] of Object.entries(defaultMessages)) {
      if (Object.keys(messages).includes(id)) {
        messages[id].description = message.description;
      } else {
        console.log(`- Added message "${id}"`);
        messages[id] = message;
      }
    }

    for (const id of Object.keys(messages)) {
      if (!Object.keys(defaultMessages).includes(id)) {
        console.log(`- Removed message "${id}"`);
        delete messages[id];
      }
    }

    console.log("");
    await saveLocale(locale, sortObject(messages));
  }
}

async function loadLocale(locale: string): Promise<Record<string, MessageDescriptor>> {
  const json = await fsp.readFile(`lang/${locale}.json`, "utf8");
  return JSON.parse(json);
}

async function saveLocale(
  locale: string,
  messages: Record<string, MessageDescriptor>,
): Promise<void> {
  const json = JSON.stringify(messages, null, 2);
  await fsp.writeFile(`lang/${locale}.json`, json);
}

function sortObject<T>(obj: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}

if (require.main === module) {
  maintain().catch((reason) => {
    console.error(reason);
  });
}
