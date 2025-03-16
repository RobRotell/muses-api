/**
 * Get random value from array
 *
 * @see https://stackoverflow.com/a/4550514
 *
 * @param {Array} values
 * @return {mixed}
 */
export const getRandomValueFromArray = values => {
	return values[ Math.floor( Math.random() * values.length ) ]
}