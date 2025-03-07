import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const headersList = await headers();

  const locale = headersList.get('accept-language')?.slice(0, 2) ?? 'en'; // TODO: Implement a better way to get the locale

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
