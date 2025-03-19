import { getRandomValueFromArray } from './getRandomValueFromArray'


// https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images#predefined-style
const imageStyles = [
	'photograph',
	'digital_art',
	'landscape',
	'sketch',
	'watercolor',
	'cyberpunk',
	'pop_art',
]


/**
 * Get all image styles offered by Google
 *
 * @return {Array}
 */
export const getAllImageStyles = () => {
	return imageStyles
}


/**
 * Get random image style offered by Google
 *
 * @return {string}
 */
export const getRandomImageStyle = () => {
	return getRandomValueFromArray( imageStyles )
}