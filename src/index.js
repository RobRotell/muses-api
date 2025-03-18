import { Hono } from 'hono'
import { getEntry } from './routes/getEntry'
import { createEntry } from './routes/createEntry'
import { serveImage } from './routes/serveImage'


const app = new Hono();


[
	getEntry,
	createEntry,
	serveImage
].forEach( route => route( app ) )


app.get( '/', c => {
	return c.text( 'Hello!' )
})


export default app