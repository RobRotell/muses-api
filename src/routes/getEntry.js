import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

/**
 * Handle requests to get entries
 *
 * @todo support fetching entries by ID
 *
 * @param {object} app
 * @return {void}
 */
export const getEntry = app => {
	app.get( '/entry/:id?', async c => {
		let entry

		// prep DB
		const prisma = new PrismaClient({
			adapter: new PrismaD1( c.env.DB )
		})

		let id = c.req.param( 'id' )

		// trying to get specific entry?
		if( id ) {
			id = Number.parseInt( id )

			if( Number.isNaN( id ) ) {
				return c.json({
					error: 'Entry ID must be an integer.'
				}, 404 )
			}

			// try to fetch from DB
			const row = await prisma.entry.findFirst({
				where: {
					id
				}
			})

			if( null === row ) {
				return c.json({
					error: `ID: ${id} does not match any entry.`
				}, 404 )
			}

			entry = row

		// otherwise, fetch random row
		} else {
			const rowCount = await prisma.entry.count()

			entry = await prisma.entry.findFirst({
				skip: Math.floor( rowCount * Math.random() ),
				take: 1,
			})
		}

		// update views count for row
		await prisma.entry.update({
			where: {
				id: entry.id,
			},
			data: {
				// eslint-disable-next-line no-plusplus
				views: ++entry.views,
			}
		})

		return c.json({
			id: entry.id,
			prompt: entry.prompt,
			images: {
				full: `${c.env.ENDPOINT_URL}/m/${entry.hash}`,
				large: `${c.env.ENDPOINT_URL}/m/${entry.hash}/large`,
				medium: `${c.env.ENDPOINT_URL}/m/${entry.hash}/medium`,
				small: `${c.env.ENDPOINT_URL}/m/${entry.hash}/small`,
			}
		})
	})
}