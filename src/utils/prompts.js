/* eslint-disable max-len */

import { getRandomValueFromArray } from './getRandomValueFromArray'


const prompts = [
	'A Mongol horse archer galloping across the open plains, bow drawn and ready to strike.',
	'A Renaissance artist painting in his candle-lit studio, surrounded by unfinished masterpieces.',
	'A Viking warrior leading a charge on a burning village, axe raised in fury.',
	'A World War II fighter pilot in a cockpit, diving through flak-filled skies.',
	'A battle-worn elven warrior standing on a battlefield littered with broken weapons and glowing magical remnants.',
	'A colossal ring world stretching into the distance, its surface covered in futuristic cities and forests.',
	'A colossal sea serpent attacking a wooden Viking ship in a raging storm.',
	'A colossal spaceship drifts through a nebula, its metallic hull glowing with the reflection of cosmic gases.',
	'A cosmic deity emerging from a swirling vortex, its form shifting between energy and matter.',
	'A cosmic storm engulfing a space station, plasma tendrils ripping through metal and glass.',
	'A crew of space pirates battling a federation fleet in the asteroid belt, debris and laser fire filling the void.',
	'A cybernetic bounty hunter in a trench coat stands atop a neon-lit skyscraper, surveying a futuristic cityscape.',
	'A cyberpunk samurai wielding an energy katana, engaged in battle with a towering AI-controlled mech in a dystopian Tokyo.',
	'A deep-space mining station orbits a rogue planet, with asteroid fragments colliding around it.',
	'A futuristic gladiator battle in an intergalactic arena, with alien spectators cheering.',
	'A futuristic soldier in a sleek exosuit, leaping between crumbling skyscrapers in a post-apocalyptic cyber-city.',
	'A group of explorers in the 1800s uncovering a lost temple in the dense Amazon jungle.',
	'A group of rebels hacking into a government surveillance hub in a cyber-dystopia, screens glowing ominously.',
	'A hidden village deep within an enchanted forest, where glowing mushrooms light the pathways.',
	'A humanoid robot playing chess against a shadowy figure in a dimly lit cyber-noir café.',
	'A hyper-advanced alien civilization with crystalline structures and floating platforms above an ocean planet.',
	'A kingdom built upon the back of a titanic moving creature, its walls blending with the beast\'s body.',
	'A lone astronaut staring at a massive black hole from the edge of a crumbling space station.',
	'A lone scavenger in a bulky space suit, salvaging wreckage from an abandoned space station orbiting Saturn.',
	'A magical library with floating books and staircases that shift in midair.',
	'A massive space ark carrying the last remnants of humanity, traveling through an endless cosmic expanse.',
	'A medieval alchemist in a cluttered workshop, experimenting with glowing potions.',
	'A medieval knight stepping through a glowing portal into a futuristic city.',
	'A mighty dragon perched atop a ruined castle, breathing fire into the stormy night sky.',
	'A mysterious deep-space probe encountering a massive, ancient alien structure floating in the void.',
	'A necromancer summoning an army of spectral warriors in a graveyard under a blood-red moon.',
	'A neon-lit highway in a cyberpunk city, with hoverbikes racing between towering buildings.',
	'A phoenix rising from golden flames, its wings spreading embers across the sky.',
	'A powerful AI controlling an entire city, its holographic face projected over a sprawling metropolis.',
	'A powerful wizard casting a spell, his hands crackling with raw arcane energy.',
	'A quantum rift tearing open the sky above a city, revealing glimpses of parallel dimensions.',
	'A retro-futuristic rocket ship launching from a sleek, utopian city in the 1950s vision of the future.',
	'A robotic explorer discovering an ancient alien temple on a desolate moon, glowing runes etched into the stone.',
	'A rogue AI constructing a massive Dyson sphere around a dying star.',
	'A samurai standing on a misty mountain peak, his armor gleaming under the moonlight.',
	'A sleek, silver spacecraft breaking through the atmosphere of a gas giant, lightning crackling in the storm clouds below.',
	'A space explorer discovering an ancient Earth artifact on a distant, desolate planet.',
	'A spaceship graveyard, where derelict vessels from different civilizations lie in eternal silence.',
	'A starship crew in cryosleep, their pods bathed in cold blue light as the ship drifts toward an unknown destination.',
	'A steampunk-inspired Victorian city, with airships floating above cobblestone streets.',
	'A team of astronauts exploring an alien jungle filled with bioluminescent plants and hovering jellyfish-like creatures.',
	'An Egyptian pharaoh standing atop a pyramid, overlooking his vast kingdom.',
	'An alien diplomat in an ornate ceremonial robe, addressing a council of interstellar leaders.',
	'An ancient Roman city at sunset, with markets bustling and chariots racing down cobbled streets.',
	'An intergalactic marketplace bustling with extraterrestrial merchants selling glowing artifacts and exotic foods.',
]


/**
 * Get all prompts
 *
 * @return {Array}
 */
export const getAllPrompts = () => {
	return prompts
}


/**
 * Get random prompt
 *
 * @return {String}
 */
export const getRandomPrompt = () => {
	return getRandomValueFromArray( prompts )
}