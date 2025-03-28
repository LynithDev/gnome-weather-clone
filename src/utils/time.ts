export function formatAsRelative(
	seconds: number,
	locale: string = 'en',
	style: 'long' | 'short' = 'long',
): string {
    const elapsed = seconds - Date.now();

	const units = {
		year: 31536000000,
		month: 2592000000,
		week: 604800000,
		day: 86400000,
		hour: 3600000,
		minute: 60000,
		second: 1000,
	};

	const formatter = new Intl.RelativeTimeFormat(locale, { style: style as Intl.RelativeTimeFormatStyle });
	for (const [unit, ms] of Object.entries(units))
		if (Math.abs(elapsed) > ms || unit === 'second')
			return formatter.format(Math.round(elapsed / ms), unit as Intl.RelativeTimeFormatUnit);

	return 'now';
}