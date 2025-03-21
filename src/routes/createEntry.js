import { GoogleAPI } from '../clients/GoogleAPI'
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { hashValue } from '../utils/hashValue'
import { bearerAuth } from 'hono/bearer-auth'


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

		const reqBody = await c.req.parseBody()

		prompt = reqBody.prompt ?? ''
		imageStyle = reqBody.style ?? ''

		// prompt is required; image style is not
		if( !prompt.length ) {
			return c.json({
				error: 'Prompt is required.'
			}, 400 )
		}

		actualPrompt = prompt

		if( imageStyle.length ) {
			actualPrompt += ` Use a ${imageStyle} image style.`
		}

		const googleClient = new GoogleAPI( c.env.GOOGLE_API_KEY )

		// Google will return a base64 string rep of image
		let imageBody

		try {
			imageBody = await googleClient.generateImage( actualPrompt )
		} catch( err ) {
			return c.json({
				error: err
			}, 500 )
		}

		// eslint-disable-next-line no-undef
		imageBody = Buffer.from( imageBody, 'base64' )

		// hash to uniquely name image
		const hash = hashValue( actualPrompt, true )

		// add original image to storage
		const baseFileName = `${hash}.jpg`

		await c.env.STORAGE.put( baseFileName, imageBody, {
			httpMetaData: {
				contentType: 'image/jpeg'
			}
		})

		// support variant sizes
		const variants = {
			large: 1280,
			medium: 1024,
			small: 600,
		}

		for( const [
			size,
			width
		] of Object.entries( variants ) ) {
			const sizedFileStream = await c.env.IMAGES.input( imageBody ).transform({
				width
			}).output({
				format: 'image/jpeg'
			})

			const sizedFileRes = sizedFileStream.response()

			await c.env.STORAGE.put( `${hash}-${size}.jpg`, sizedFileRes.body, {
				httpMetaData: {
					contentType: 'image/jpeg'
				}
			})
		}

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