import { Hono } from 'hono'
import { ImageHandler } from './clients/ImageHandler'
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { cors } from 'hono/cors'
import { createEntry } from './routes/createEntry'
import { getEntry } from './routes/getEntry'
import { getRandomImageStyle } from './utils/imageStyles'
import { getRandomPrompt } from './utils/prompts'
import { hashValue } from './utils/hashValue'
import { routeBreakdown } from './data/routeBreakdown'
import { serveImage } from './routes/serveImage'
import { serveStatic } from 'hono/cloudflare-workers'


const app = new Hono()


// allow everyone to access (for now)
app.use( '*', cors() )


// add all routes
;[
	getEntry,
	createEntry,
	serveImage
].forEach( route => route( app ) )


app.get( '/', c => c.json( routeBreakdown ) )
app.notFound( c => c.json( routeBreakdown, 404 ) )
app.use( '/favicon.ico', serveStatic({
	path: './assets/images/favicon.ico'
}) )


export default {
	fetch: app.fetch,

	// once daily, automatically generate new image
	// scheduled: async( batch, env ) => {
	// 	const imageHandler = new ImageHandler( env.GOOGLE_API_KEY, env.IMAGES, env.STORAGE )
	// 	const prompt = getRandomPrompt()
	// 	const imageStyle = getRandomImageStyle()
	// 	const actualPrompt = `${prompt} Use a ${imageStyle} image style.`

	// 	// Google will return a base64 string rep of image
	// 	let imageBody

	// 	try {
	// 		imageBody = await imageHandler.createImage( actualPrompt )
	// 	} catch( err ) {
	// 		console.log({
	// 			err
	// 		})

	// 		return new Response()
	// 	}

	// 	// hash to uniquely name image
	// 	const hash = hashValue( actualPrompt, true )

	// 	await imageHandler.saveImage( hash, imageBody )

	// 	// add entry to DB
	// 	const prisma = new PrismaClient({
	// 		adapter: new PrismaD1( env.DB )
	// 	})

	// 	await prisma.entry.create({
	// 		data: {
	// 			hash,
	// 			prompt,
	// 			imageStyle,
	// 			date: new Date(),
	// 			views: 0,
	// 		}
	// 	})

	// 	return new Response()
	// }
}
