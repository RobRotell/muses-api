import { ImageHandler } from '../clients/ImageHandler.js'

/**
 * Handle requests to get images
 *
 * @param {Object} app
 * @return {void}
 */
export const getImage = app => {
	app.get( '/', async c => {
		const image = await ImageHandler.getRandomImage()

		if( !image ) {
			return c.json({
				error: 'No images found.'
			}, 404 )
		}

		return c.text( 'here' )
	})
}