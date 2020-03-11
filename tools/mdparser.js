const { promises: fs } = require('fs');
const readme = './readme.md';

function getText () {
	return fs.readFile(readme, 'utf8');
}
(async function () {
	const mdText = await getText();
	const textmdByActs = mdText.split(/## --=== Act [0-9]{0,2} ===--/gm);
	const actSteps = textmdByActs.reduce((acc, act, index) => {
		acc[`act_${index}`] = {};
		const descriptions = act.match(/[0-9]\. (.*)$/gm);
		const tips = act.match(/^( {4}|\t)- (.*)$/gm);
		if (descriptions !== null) {
			const actDescriptions = descriptions.map(description =>
				description.replace(/^1\. /g, '')
					.replace('->', '⮞')
					.replace(/\[(.*)\].boss/gm, '<span class="boss">$1</span>')
					.replace(/\[(.*)\].quest/gm, '<span class="quest">$1</span>')
			);
			acc[`act_${index}`].steps = actDescriptions;
		}
		if (tips !== null) {
			const actTipsList = tips.map(description =>
				description.replace(/^ {4}- |^\t- /g, '')
			);
			acc[`act_${index}`].tips = actTipsList;
		}
		return acc;
	}, {});
	await fs.writeFile('./data/data.json', JSON.stringify(actSteps));
})();
