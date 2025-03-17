import { Database } from './Database.js'


// todo -- add support to get specific image by ID
export class ImageHandler {


	/**
	 * Get random image
	 *
	 * @return {Object|false} Image object if entry found; otherwise, false if no images added
	 */
	static async getRandomImage() {
		const count = await Database.entry.count()

		if( 0 === count ) {
			return false
		}
	}


	/**
	 * Save image to file
	 *
	 * @param {String} fileName File name
	 * @param {String} imageData Base64-encoded image data
	 * @param {String} extension File extension
	 *
	 * @return {String} Array of file paths, including full, large, medium, and small
	 */
	static saveImage( fileName, imageData, extension = 'png' ) {

	}

}