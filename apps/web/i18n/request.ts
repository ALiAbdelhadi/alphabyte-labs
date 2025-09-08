import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    let locale = routing.defaultLocale;
    try {
        const requested = await requestLocale;
        locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
    } catch {
        // No request scope (build/client). Fall back to default locale.
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});