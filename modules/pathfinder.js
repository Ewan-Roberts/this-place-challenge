"use strict";

//I searh text for urls like: /foo/letsgotothe/foobar
module.exports = info => {return info.match(/(?:\/)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gi)[0]}
