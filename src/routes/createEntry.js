import { GoogleAPI } from '../clients/GoogleAPI'

/**
 * Handle requests to create images
 *
 * @todo add validation
 *
 * @param {object} app
 * @return {void}
 */
export const createEntry = app => {
	app.post( '/entry', async c => {

		// todo -- add validation

		const client = new GoogleAPI( c.env.GOOGLE_PROJECT_ID, c.env.GOOGLE_CLIENT_EMAIL, c.env.GOOGLE_PRIVATE_KEY )

		// this might be async later
		client.initialize()

		const res = await client.generateImage( 'Create a 1950s cyberpunk art image of a detective with a baseball bat standing in a dark alleyway. The detective has gritted teeth. In front of the detective are shadows from unseen assailants.' )

		console.log({
			res 
		})

		return c.text( 'bob' )
	})
}