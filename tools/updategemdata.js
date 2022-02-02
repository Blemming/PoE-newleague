const { promises: fs } = require('fs');
const fetch = require('node-fetch');

(async function () {
	const questOrder = {
		'Enemy at the Gate': 0,
		'Breaking Some Eggs': 1,
		'Mercy Mission': 2,
		'The Caged Brute': 3,
		'The Siren\'s Cadence': 4,
		'Intruders in Black': 0,
		'Sharp and Cruel': 1,
		'Lost in Love': 0,
		'Sever the Right Hand': 1,
		'A Fixture of Fate': 2,
		'Breaking the Seal': 0,
		'The Eternal Nightmare': 1
	};
	try {
		const gems = await fetch('https://poe-gems.blemming.workers.dev/api/gems').then(res => res.json());
		const quests = gems.gems.reduce((acc, gem) => {
			if (!gem.quest_rewards[0]) { return acc; }
			if (!acc.find(obj => obj.quest === gem.quest_rewards[0].quest)) {
				acc.push({
					act: gem.quest_rewards[0].act,
					quest: gem.quest_rewards[0].quest,
					order: questOrder[gem.quest_rewards[0].quest] || 0,
					gems: []
				});
			}
			return acc;
		}, []).sort((a, b) => a.act - b.act || a.order - b.order);
		await fs.writeFile('./data/quests.json', JSON.stringify(quests, null, 2));
		await fs.writeFile('./data/gems.json', JSON.stringify(gems.gems, null, 2));
	} catch (e) {
		console.log(e);
	}
})();
