const locales = {
	de: () => import('./de/TimeInput'),
	zh: () => import('./zh-CN/TimeInput'),
	'zh-TW': () => import('./zh-TW/TimeInput')
};

const messages = {
	invalidProps: 'Min time cannot be greater than max time',
	invalidTime: 'Invalid time format',
	tooEarly: 'Time must be at after Min time',
	tooLate: 'Time must be before Max time'
};

export default { locales, messages };
