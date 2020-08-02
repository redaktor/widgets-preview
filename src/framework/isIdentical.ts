/**
 * Determines whether two values are the same value.
 *
 * @param a First value to compare
 * @param b Second value to compare
 * @return true if the values are the same; false otherwise;
 */
export function isIdentical(a: any, b: any): boolean {
	return (
		a === b ||
		/* both values are NaN */
		(a !== a && b !== b)
	);
}
