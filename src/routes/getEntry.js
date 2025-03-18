/**
 * Handle requests to get entries
 *
 * @todo support fetching entries by ID
 *
 * @param {object} app
 * @return {void}
 */
export const getEntry = app => {
	app.get( '/entry', async c => {
		return c.text( 'bob' )
	})
}