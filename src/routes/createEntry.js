/**
 * Handle requests to create images
 *
 * @param {object} app
 * @return {void}
 */
export const createEntry = app => {
	app.post( '/entry', c => {
		return c.text( 'posting' )
	})
}