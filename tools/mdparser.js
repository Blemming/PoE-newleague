const { promises: fs } = require('fs');
const { join } = require('path');
const readme = join(__dirname.replace(/[\\|/]tools/gi, ''), '/readme.md');

function getText () {
	return fs.readFile(readme, 'utf8').catch(console.log);
}
(async function () {
	try {
		const mdText = await getText();
		const textmdByActs = mdText.split(/## --=== Act [0-9]{0,2} ===--/gm);
		const actSteps = textmdByActs.reduce((acc, act, index) => {
			acc[`act_${index}`] = {};
			const descriptions = act.match(/[0-9]\. (.*)$/gm);
			const tips = act.match(/^( {4}|\t)- (.*)$/gm);
			if (descriptions !== null) {
				const actDescriptions = descriptions.map(description =>
					description.replace(/^[0-9]{1,2}\. /g, '')
						.replace(/\s->\s/g, ' ⟶ ')
						.replace(/\[([a-zA-Z0-9\s',]{0,50})\]\.boss/gm, '<span class="boss">$1</span>')
						.replace(/\[([a-zA-Z0-9\s',]{0,50})\]\.quest/gm, '<span class="quest">$1</span>')
						.replace(/\[Town Portal\]/gmi, '![Town Portal](https://webcdn.pathofexile.com/image/art/2DArt/UIImages/InGame/4K/WorldPanelTownPortalIcon.png)<span class="tp">Town Portal</span>')
						.replace(/\[Waypoint\]/gmi, '![Waypoint](https://webcdn.pathofexile.com/image/art/2DArt/UIImages/InGame/4K/WorldPanelActivatedWaypointPinIcon.png)<span class="wp">Waypoint</span>')
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
	} catch (e) {
		console.log(e);
	}
})();
