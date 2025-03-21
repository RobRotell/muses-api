export const routeBreakdown = {
	routes: {
		'/entry': [
			{
				method: 'GET',
				parameters: [
					{
						':id?': {
							type: 'integer',
							optional: true,
							description: 'ID of entry.'
						}
					}
				],
				description: 'Return entry from ID, if provided, or return random entry.'
			},
			{
				method: 'POST',
				parameters: [
					{
						'prompt': {
							type: 'string',
							optional: false,
							description: 'Text from which to generate image.'
						}
					},
					{
						'style': {
							type: 'string',
							optional: true,
							description: 'Specific style to apply to image.'
						}
					}
				],
				authorization: {
					type: 'bearer',
				},
				description: 'Create an image from prompt and image style.'
			}
		]
	}
}