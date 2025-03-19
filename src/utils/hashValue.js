import crypto from 'crypto'


/**
 * Super duper simple hashing strategy
 *
 * @param {String} value
 * @return {String}
 */
export const hashValue = value => {
	const token = crypto.randomBytes( 60 ).toString( 'hex' )
	const hash = crypto.createHash( 'sha256' )

	hash.update( value + token )

	return hash.digest( 'hex' )
}