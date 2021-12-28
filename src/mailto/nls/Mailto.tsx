const locales = {
	de: () => import('./de/Mailto')
};
const messages = {
	title: `Send an email to {name}`
};

export default { locales, messages };
