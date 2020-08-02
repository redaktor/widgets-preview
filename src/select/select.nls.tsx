const locales = {
  de: () => import("./nls/de.nls")
};
const messages = {
	requiredMessage: 'Please enter a value.',
	strictMessage: 'Please select a value from the list.',
};

export default { locales, messages };
