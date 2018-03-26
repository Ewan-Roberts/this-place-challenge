"use strict";

//Hi, I search  for text for urls like: /foo/letsgotothe/foobar
module.exports = (str,find) => {

	const strLower = str.toLowerCase()
	const findLower = find.toLowerCase()

	return strLower.includes(findLower)

}