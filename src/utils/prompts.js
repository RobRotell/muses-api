import { getRandomValueFromArray } from './getRandomValueFromArray'


const prompts = []


/**
 * Get all prompts
 *
 * @return {Array}
 */
export const getAllPrompts = () => {
	return prompts
}


/**
 * Get random prompt
 *
 * @return {String}
 */
export const getRandomPrompt = () => {
	return getRandomValueFromArray( prompts )
}