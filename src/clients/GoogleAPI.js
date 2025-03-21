export class GoogleAPI {


	#apiKey


	/**
	 * Constructor
	 *
	 * @param {String} apiKey
	 */
	constructor( apiKey ) {
		this.#apiKey = apiKey
	}


	/**
	 * Generate image
	 *
	 * @todo add better error handling
	 *
	 * @throws {Error} failed to get image from Google (e.g. rate limiting)
	 *
	 * @param {String} prompt
	 * @return {Promise<String>} Base64 encoding of JPEG
	 */
	async generateImage( prompt = '' ) {

		// eslint-disable-next-line max-len
		const endpoint = new URL( 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict' )
		endpoint.searchParams.set( 'key', this.#apiKey )

		const headers = new Headers
		headers.set( 'content-type', 'application/json' )

		const body = {
			instances: [
				{
					prompt
				}
			],
			parameters: {
				sampleCount: 1,
				aspectRatio: '4:3',
			}
		}

		const res = await fetch( endpoint.toString(), {
			headers,
			method: 'POST',
			body: JSON.stringify( body )
		})

		const {
			predictions
		} = await res.json()

		if( !predictions ) {
			throw new Error( 'Failed to request image from Imagen.' )
		}

		// Google will return a base64 encoding of image
		let imageBody

		// should only be one element in array
		for( const prediction of predictions ) {
			imageBody = prediction.bytesBase64Encoded
		}

		return imageBody
	}

}
