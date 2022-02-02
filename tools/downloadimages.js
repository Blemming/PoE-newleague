const { promises: fs } = require('fs');
const fetch = require('node-fetch');
const gems = require('../data/gems.json');

(function () {
	const images = gems.map(gem => gem.icon);
	for (let i = 0; i < images.length; i++) {
		fetch(images[i]).then(res => res.buffer()).then(buffer => fs.writeFile(`./static/images/${images[i].replace('https://www.poewiki.net/wiki/Special:FilePath/', '')}`, buffer));
	}
})();
