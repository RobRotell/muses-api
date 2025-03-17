import { Database } from '../clients/Database'

export class Image {


	#id
	#date
	#hash
	#url
	#urlLarge
	#urlMedium
	#urlSmall
	#prompt
	#tokens
	#views


	/**
	 * Constructor
	 *
	 * @param {Number} id Row ID
	 */
	constructor( id ) {
		this.#id = id
	}


	/**
	 * Populate properties
	 *
	 * @throws {Error} If invalid image ID (no row found)
	 * @return {void}
	 */
	async populate() {
		const entry = await Database.entry.findFirst({
			where: {
				id: this.#id,
			}
		})

		console.log( entry )
	}


	/**
	 * Package data for response
	 *
	 * @return {Object}
	 */
	package() {
		return {
			id: this.#id,
			url: {
				large: this.#urlLarge,
				medium: this.#urlMedium,
				small: this.#urlSmall,
			}
		}
	}


	/**
	 * Increment views for image
	 *
	 * @return {void}
	 */
	async incrementViews() {

	}

}