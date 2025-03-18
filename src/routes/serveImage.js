/**
 * Serve image bashed on hash and size
 *
 * @param {object} app
 * @return {void}
 */
export const serveImage = app => {
	app.all( '/m', async c => {
		return c.text( 'image' )
	})
}