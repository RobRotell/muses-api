import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createEntry } from './routes/createEntry'
import { getEntry } from './routes/getEntry'
import { getRandomImageStyle } from './utils/imageStyles'
import { getRandomPrompt } from './utils/prompts'
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

	// every four hours, automatically make request to generate image
	scheduled: async( batch, env ) => {
		const params = new URLSearchParams
		params.set( 'prompt', getRandomPrompt() )
		params.set( 'style', getRandomImageStyle() )

		const headers = new Headers
		headers.set( 'authorization', `Bearer ${env.ENTRY_BEARER_TOKEN}` )
		headers.set( 'content-type', 'application/x-www-form-urlencoded' )

		await fetch( 'http://localhost:44305/entry', {
			headers,
			method: 'POST',
			body: params.toString(),
		})
	}
}