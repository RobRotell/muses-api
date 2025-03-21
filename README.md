<p align="center">
	<img src="./public/logo.png" alt="Muses" width="100" />
</p>

# Muses

Simple API to create and view images generated through Google's Imagen service. I'm also working on a related project that involves connecting a Raspberry Pi Zero to an e-ink display. In that project, I'll fetch random images from this API and render them on that e-ink display as a fun little slideshow picture frame.

Additionally, through this project I learned about using Hono with CloudFlare workers and integrating with CloudFlare's services such as their D1 databases and R2 storage buckets.

## Routes
- `/entry`
	- method: `GET`
		- parameters
			- `id?`
				- type: integer
				- optional: true
				- description: ID of entry
		- description: Return entry from ID, if provided, or return random entry
	- method: `POST`
		- parameters
			- `prompt`
				- type: string
				- optional: false
			- description: Text from which to generate image
			- `style?`
				- type: string
				- optional: true
				- description: Specific style to apply to image
		- authorization
			- type: bearer
		- description: Create an image from prompt and optional image style
- `/m`
	- method: `GET`
		- parameters
			- `id`
				- type: string
				- optional: false
				- description: Hashed ID of image
			- `id/size?`
				- type: string
				- optional: true
				- description: Image size (supports "large", "medium", "small"). If not provided, then full image will be returned
		- description: Return image for entry
		