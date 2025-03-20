import { getRandomValueFromArray } from './getRandomValueFromArray'


const imageStyles = [
	'American Indie Graphic Novel',
	'Art Nouveau',
	'Baroque Painting',
	'Biopunk',
	'Cyberpunk',
	'Dark Fantasy',
	'European Bande Dessinée',
	'Expressionism',
	'Golden Age Comic',
	'Gothic Oil Painting',
	'High Fantasy Illustration',
	'Impressionist Painting',
	'Japanese Ukiyo-e',
	'Manga (Seinen Style)',
	'Manga (Shojo Style)',
	'Manga (Shonen Style)',
	'Medieval Illuminated Manuscript',
	'Minimalist Ink Sketch',
	'Noir Graphic Novel',
	'Oil Painting',
	'Pixel Art',
	'Pop Art Comic Style',
	'Poster Art (Propaganda Style)',
	'Retrofuturism',
	'Silver Age Comic',
	'Space Opera Art',
	'Steampunk Illustration',
	'Surrealism',
	'Synthwave',
	'Ukiyo-e',
	'Underground Comix',
	'Watercolor',
	'Webtoon Style',
]


/**
 * Get all image styles
 *
 * @return {Array}
 */
export const getAllImageStyles = () => {
	return imageStyles
}


/**
 * Get random image style
 *
 * @return {String}
 */
export const getRandomImageStyle = () => {
	return getRandomValueFromArray( imageStyles )
}