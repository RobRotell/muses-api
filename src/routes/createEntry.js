import googleAIPlatform from '@google-cloud/aiplatform'
import { GoogleAuth } from 'google-auth-library'
import fallback from 'google-gax/build/src/fallback'


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


		// const stuff = {
		// 	project_id: c.env.GOOGLE_PROJECT_ID,
		// 	client_email: c.env.GOOGLE_CLIENT_EMAIL,
		// 	private_key: c.env.GOOGLE_PRIVATE_KEY,
		// }

		// const client = auth.fromJSON( stuff )

		// console.log( client )

		// return c.json({
		// 	client
		// })

		const auth = new GoogleAuth({
			credentials: {
			  client_email: c.env.GOOGLE_CLIENT_EMAIL,
			  private_key: c.env.GOOGLE_PRIVATE_KEY,
			},
			scopes: [
				'https://www.googleapis.com/auth/cloud-platform'
			],
		  })

		  const client = await auth.getClient()
		  const token = await client.getAccessToken()


		const clientOptions = {
			apiEndpoint: 'us-east4-aiplatform.googleapis.com',
			projectId: c.env.GOOGLE_PROJECT_ID,
			auth,
			credentials: {
				client_email: c.env.GOOGLE_CLIENT_EMAIL,
				private_key: c.env.GOOGLE_PRIVATE_KEY
			},
			fallback: true
		}

		const {
			PredictionServiceClient,
		} = googleAIPlatform.v1

		const {
			helpers
		} = googleAIPlatform

		console.log({
			fallback
		})

		const client2 = new PredictionServiceClient( clientOptions, fallback )

		const endpoint = `projects/${c.env.GOOGLE_PROJECT_ID}/locations/us-east4/publishers/google/models/imagen-3.0-generate-002`

		const promptText = {
			prompt: 'Create a 1950s cyberpunk art image of a detective with a baseball bat standing in a dark alleyway. The detective has gritted teeth. In front of the detective are shadows from unseen assailants.', // The text prompt describing what you want to see
		}
		const instanceValue = helpers.toValue( promptText )
		const instances = [
			instanceValue
		]

		const parameter = {
			sampleCount: 1,
			// You can't use a seed value and watermark at the same time.
			seed: 100,
			addWatermark: false,
			aspectRatio: '4:3',
			// safetyFilterLevel: 'block_some',
			personGeneration: 'allow_adult',
			safetySetting: 'block_only_high',
		}
		const parameters = helpers.toValue( parameter )

		const request = {
			endpoint,
			instances,
			parameters,
		}


		const b = await client2.predict( request )

		// const predictions = response.predictions
		// console.log( predictions )

		// return c.json({
		// 	predictions
		// })

		// return c.text( 'posting' )

		// console.log({
		// 	client2
		// })
	})
}