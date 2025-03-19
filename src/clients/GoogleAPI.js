import googleAIPlatform from '@google-cloud/aiplatform'
import { GoogleAuth } from 'google-auth-library'
import { getRandomImageStyle } from './utils/imageStyles'


// it'd be great if we could Singleton-ify this, but we need the CF secrets from Hono's context obj
export class GoogleAPI {


	#clientEmail
	#privateKey
	#projectId

	#predictionServiceClient


	/**
	 * Constructor
	 *
	 * We need to pass Hono's context object in other to access CF secrets
	 *
	 * @param {String} clientEmail
	 * @param {String} privateKey
	 * @param {String} projectId
	 */
	constructor( clientEmail, privateKey, projectId ) {
		this.#clientEmail = clientEmail
		this.#privateKey = privateKey
		this.#projectId = projectId
	}


	/**
	 * Initialize client
	 *
	 * @return {void}
	 */
	initialize() {
		const auth = new GoogleAuth({
			credentials: {
				client_email: this.#clientEmail,
				private_key: this.#privateKey,
			},
			scopes: [
				'https://www.googleapis.com/auth/cloud-platform'
			],
		})

		const opts = {
			auth,
			apiEndpoint: 'us-east4-aiplatform.googleapis.com',
			projectId: this.#projectId,
		}

		const {
			PredictionServiceClient,
		} = googleAIPlatform.v1

		this.#predictionServiceClient = new PredictionServiceClient( opts )
	}


	/**
	 * Generate image
	 *
	 * @throws {Error}
	 * @param {String} prompt
	 * @return {String} Base64 encoding of JPEG
	 */
	async generateImage( prompt = '' ) {

		// eslint-disable-next-line max-len
		const endpoint = `projects/${this.#projectId}/locations/us-east4/publishers/google/models/imagen-3.0-generate-002`

		const parameters = {
			addWatermark: false,
			aspectRatio: '4:3',
			enhancePrompt: true, // Google, take the wheel!
			personGeneration: 'allow_adult',
			safetySetting: 'block_only_high',
			sampleCount: 1,
			sampleImageStyle: getRandomImageStyle()
		}

		const instances = [
			{
				prompt
			}
		]

		const res = await this.#predictionServiceClient.predict({
			endpoint,
			parameters,
			instances
		})

		const predictions = res.predictions

		console.log({
			predictions
		})
	}

}