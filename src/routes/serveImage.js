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
			hash, size = 'large'
		} = c.req.param()

		// is user requesting a valid image size? If not, use large/original image size
		if( ![
			'large',
			'medium',
			'small'
		].includes( size ) ) {
			size = 'large'
		}

		const baseFileName = `${hash}.jpg`

		// does image exist in bucket?
		let assetObj = await c.env.STORAGE.get( baseFileName )

		// if no match, return 404
		if( !assetObj ) {
			return c.json({
				error: `No image matched ID: "${hash}`
			}, 404 )
		}

		// if user requested sized variant ...
		if( 'large' !== size ) {
			const sizedFileName = `${hash}-${size}.jpg`
			const sizedAssetObj = await c.env.STORAGE.get( sizedFileName )

			// match? Use that
			if( sizedAssetObj ) {
				assetObj = sizedAssetObj

			// otherwise, transform and add to bucket
			} else {
				const transformedImage = await c.env.IMAGES.input( assetObj.body ).transform({
					width: ( 'medium' === size ) ? 1024 : 600
				}).output({
					format: 'image/jpeg'
				})

				const sizedImgRes = transformedImage.response()
				const sizedImgResClone = sizedImgRes.clone()

				// cache for future usage
				await c.env.STORAGE.put( sizedFileName, sizedImgRes.body )

				assetObj = sizedImgResClone
			}
		}

		c.header( 'Content-Type', 'image/jpeg' )

		return c.body( assetObj.body )
	})
}