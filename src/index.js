import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { getImage } from './routes/getImage.js'
import { createImage } from './routes/createImage.js'


// base app
const app = new Hono();


// add routes
[
	getImage,
	createImage
].forEach( route => route( app ) )


serve({
	fetch: app.fetch,
	port: 3000
})


// 1792x1344