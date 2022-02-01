const { promises: fs } = require('fs');
const fetch = require('node-fetch');

(async function () {
	try {
		const gems = await fetch('https://poe-gems.blemming.workers.dev/api/gems').then(res => res.json());

		await fs.writeFile('./data/gems.json', JSON.stringify(gems, null, 2));
	} catch (e) {
		console.log(e);
	}
})();
