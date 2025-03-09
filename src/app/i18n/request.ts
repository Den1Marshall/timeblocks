import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

const locales = ['en'];
const defaultLocale = 'en';

export default getRequestConfig(async () => {
  const headersList = await headers();

  const locale = headersList.get('accept-language')?.slice(0, 2) ?? 'en'; // TODO: Implement a better way to get the locale

  if (!locales.includes(locale)) {
    return {
      locale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
