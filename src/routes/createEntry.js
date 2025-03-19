import { GoogleAPI } from '../clients/GoogleAPI'
import { GoogleAPITemp } from '../clients/GoogleAPITemp'
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRandomPrompt } from '../utils/prompts'
import { hashValue } from '../utils/hashValue'

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

		const googleClient = new GoogleAPITemp(
			c.env.GOOGLE_CLIENT_EMAIL,
			c.env.GOOGLE_PRIVATE_KEY,
			c.env.GOOGLE_PROJECT_ID
		)

		const prompt = getRandomPrompt()

		// Google will return a base64 string rep of image
		let imageBody = await googleClient.generateImage( prompt )

		// convert to something R2 can use
		imageBody = Uint8Array.from( atob( imageBody ), char => char.charCodeAt( 0 ) )

		// hash to uniquely name image
		const hash = hashValue( prompt )

		// add full/large image to storage
		const baseFileName = `${hash}.jpg`

		await c.env.STORAGE.put( baseFileName, imageBody, {
			httpMetaData: {
				contentType: 'image/jpeg'
			}
		})

		// create and add medium-sized image variant to storage
		const mediumFileName = `${hash}-medium.jpg`

		const mediumFileStream = await c.env.IMAGES.input( imageBody ).transform({
			width: 1024
		}).output({
			format: 'image/jpeg'
		})

		const mediumFileRes = mediumFileStream.response()

		await c.env.STORAGE.put( mediumFileName, mediumFileRes.body, {
			httpMetaData: {
				contentType: 'image/jpeg'
			}
		})

		// now a small image variant (ideal for RaspPi e-ink displays, perhaps?)
		const smallFileName = `${hash}-small.jpg`

		const smallFileStream = await c.env.IMAGES.input( imageBody ).transform({
			width: 600
		}).output({
			format: 'image/jpeg'
		})

		const smallFileRes = smallFileStream.response()

		await c.env.STORAGE.put( smallFileName, smallFileRes.body, {
			httpMetaData: {
				contentType: 'image/jpeg'
			}
		})

		// add entry to DB
		const prisma = new PrismaClient({
			adapter: new PrismaD1( c.env.DB )
		})

		const row = await prisma.entry.create({
			data: {
				hash,
				prompt,
				date: new Date(),
				views: 0,
			}
		})

		return c.json({
			id: row.id,
			prompt: row.prompt,
			images: {
				large: `${c.env.ENDPOINT_URL}/m/${row.hash}`,
				medium: `${c.env.ENDPOINT_URL}/m/${row.hash}/medium`,
				small: `${c.env.ENDPOINT_URL}/m/${row.hash}/small`,
			}
		})
	})
}