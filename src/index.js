import { Hono } from 'hono'
import { getEntry } from './routes/getEntry'
import { createEntry } from './routes/createEntry'
import { serveImage } from './routes/serveImage'


const app = new Hono();


// add all routes
[
	getEntry,
	createEntry,
	serveImage
].forEach( route => route( app ) )


app.get( '/', c => {
	return c.json({
		routes: {
			'/entry': [
				{
					method: 'GET',
					params: [
						{
							'/:id': {
								type: 'integer',
								optional: true,
								description: 'ID of entry.'
							}
						}
					],
					description: 'Return entry from ID, if provided, or return entry.'
				},
				{
					method: 'POST',
					params: [
						{
							'prompt': {
								type: 'string',
								optional: true,
								description: 'Text from which to generate image.'
							}
						}
					],
					description: 'Create an image from prompt, if provided, or from random prompt.'
				}
			]
		}
	})
})


export default app