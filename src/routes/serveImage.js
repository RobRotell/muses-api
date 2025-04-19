import { cache } from 'hono/cache'

/**
 * Serve image bashed on hash and size
 *
 * @param {object} app
 * @return {void}
 */
export const serveImage = app => {
	app.all( '/m/:hash/:size?', cache({
		cacheControl: 'public, max-age=31536000, immutable',
	}),
	async c => {
		let {
			hash, size = 'full'
		} = c.req.param()

		// is user requesting a valid image size? If not, use large image size
		if( ![
			'full',
			'large',
			'medium',
			'small',
			'tiny'
		].includes( size ) ) {
			size = 'large'
		}

		const baseFileName = ( 'full' === size ) ? `${hash}.jpg` : `${hash}-${size}.jpg`

		// does image exist in bucket?
		let assetObj = await c.env.STORAGE.get( baseFileName )

		// if no match, return 404
		if( !assetObj ) {
			return c.json({
				error: `No image matched ID: "${hash}`
			}, 404 )
		}

		c.header( 'Content-Type', 'image/jpeg' )

		return c.body( assetObj.body )
	})
}
