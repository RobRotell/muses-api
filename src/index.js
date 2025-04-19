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
}
