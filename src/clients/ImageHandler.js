import { GoogleAPI } from './GoogleAPI'


export class ImageHandler {


	#bindingGoogleApiKey
	#bindingImages
	#bindingStorage


	/**
	 * Constructor
	 *
	 * @param {String} googleApiKey
	 * @param {Object} images Binding for CF image transformation util lib
	 * @param {Object} storage Binding for R2 storage
	 */
	constructor( googleApiKey, images, storage ) {
		this.#bindingGoogleApiKey = googleApiKey
		this.#bindingImages = images
		this.#bindingStorage = storage
	}


	/**
	 * Create image through Google Imagen from prompt
	 *
	 * @throws {Error} failed to create image
	 *
	 * @param {String} prompt
	 * @return {Promise<String>} Base64 encoding of JPEG
	 */
	async createImage( prompt ) {
		const googleClient = new GoogleAPI( this.#bindingGoogleApiKey )

		const imageBody = await googleClient.generateImage( prompt )

		if( !imageBody ) {
			throw new Error( 'Failed to request image from Google.' )
		}

		return imageBody
	}


	/**
	 * Save base image and sized image variants to storage
	 *
	 * @param {String} hash Image hash for file name
	 * @param {String} imageBody Image base64-encoded body data
	 *
	 * @return {Promise<void>}
	 */
	async saveImage( hash, imageBody ) {

		// eslint-disable-next-line no-undef
		imageBody = Buffer.from( imageBody, 'base64' )

		// Google returns PNG; convert to JPG
		const baseImageStream = await this.#bindingImages.input( imageBody ).transform().output({
			format: 'image/jpeg'
		})

		const baseImageRes = baseImageStream.response()

		// add original image to storage
		const baseFileName = `${hash}.jpg`

		await this.#bindingStorage.put( baseFileName, baseImageRes.body, {
			httpMetaData: {
				contentType: 'image/jpeg'
			}
		})

		// support variant sizes
		const variants = {
			large: 1280,
			medium: 1024,
			small: 600,
			tiny: 320,
		}

		for( const [
			size,
			width
		] of Object.entries( variants ) ) {
			const sizedFileStream = await this.#bindingImages.input( imageBody ).transform({
				width
			}).output({
				format: 'image/jpeg'
			})

			const sizedFileRes = sizedFileStream.response()

			await this.#bindingStorage.put( `${hash}-${size}.jpg`, sizedFileRes.body, {
				httpMetaData: {
					contentType: 'image/jpeg'
				}
			})
		}
	}


}
