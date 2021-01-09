const vObject = require('./vObject')

module.exports.parse = function (buffer, options = {}) {
	const packet = typeof buffer === 'string' ? Buffer.from(buffer, 'hex') : buffer
	const values = []

	options.debug === true && console.debug('-------Start Parse vObjectSeries-------')
	options.debug === true && process.stdout.write(`Buffer ${buffer.toString('hex')} ${buffer.length}\n`)

	const berLength = 1
	let i = 0
	while (i < packet.length) {
		const contentLength = packet[i]

		if (packet.length < i + berLength + contentLength) {
			throw new Error('Invalid vObjectSeries buffer, not enough content')
		}

		const vObj = vObject.parse(packet.subarray(i+berLength, i + berLength + contentLength))
		values.push(vObj)
		options.debug === true && console.debug('vObject', contentLength, vObj)

		i+= berLength + contentLength
	}
	options.debug === true && console.debug('-------End Parse vObjectSeries---------')
	return values
}
