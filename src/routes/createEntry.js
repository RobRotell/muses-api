import { ImageHandler } from '../clients/ImageHandler'
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { bearerAuth } from 'hono/bearer-auth'
import { getRandomImageStyle } from '../utils/imageStyles'
import { getRandomPrompt } from '../utils/prompts'
import { hashValue } from '../utils/hashValue'


/**
 * Handle requests to create images
 *
 * @param {object} app
 * @return {void}
 */
export const createEntry = app => {
	const auth = {
		verifyToken( token, c ) {
			return token === c.env.ENTRY_BEARER_TOKEN // not the tightest security, but good enough here
		},
		noAuthenticationHeaderMessage: {
			error: 'Please add a bearer token.'
		},
		invalidTokenMessage: {
			error: 'Invalid bearer token. Do I know you?'
		},
	}

	app.post( '/entry', bearerAuth( auth ), async c => {
		let prompt
		let imageStyle
		let actualPrompt

		const imageHandler = new ImageHandler( c.env.GOOGLE_API_KEY, c.env.IMAGES, c.env.STORAGE )

		const reqBody = await c.req.parseBody()

		prompt = reqBody.prompt ?? ''
		imageStyle = reqBody.style ?? ''

		if( !prompt.length ) {
			prompt = getRandomPrompt()
			imageStyle = getRandomImageStyle()
		}

		actualPrompt = prompt

		if( imageStyle.length ) {
			actualPrompt += ` Use a ${imageStyle} image style.`
		}

		// Google will return a base64 string rep of image
		let imageBody

		try {
			imageBody = await imageHandler.createImage( actualPrompt )
		} catch( err ) {
			return c.json({
				error: err
			}, 500 )
		}

		// hash to uniquely name image
		const hash = hashValue( actualPrompt, true )

		await imageHandler.saveImage( hash, imageBody )

		// add entry to DB
		const prisma = new PrismaClient({
			adapter: new PrismaD1( c.env.DB )
		})

		const row = await prisma.entry.create({
			data: {
				hash,
				prompt,
				imageStyle,
				date: new Date(),
				views: 0,
			}
		})

		return c.json({
			id: row.id,
			prompt: row.prompt,
			imageStyle: row.imageStyle ?? '',
			images: {
				full: `${c.env.ENDPOINT_URL}/m/${row.hash}`,
				large: `${c.env.ENDPOINT_URL}/m/${row.hash}/large`,
				medium: `${c.env.ENDPOINT_URL}/m/${row.hash}/medium`,
				small: `${c.env.ENDPOINT_URL}/m/${row.hash}/small`,
			}
		})
	})
}
