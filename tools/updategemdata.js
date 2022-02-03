const { promises: fs } = require('fs');
const fetch = require('node-fetch');
const oldGems = require('../data/gems.json');

(async function () {
	const questOrder = {
		'Enemy at the Gate': 0,
		'Breaking Some Eggs': 1,
		'Mercy Mission': 2,
		'The Caged Brute': 3,
		'The Siren\'s Cadence': 4,
		'Intruders in Black': 0,
		'Sharp and Cruel': 1,
		'The Root of the Problem': 2,
		'Lost in Love': 0,
		'Sever the Right Hand': 1,
		'A Fixture of Fate': 2,
		'Breaking the Seal': 0,
		'The Eternal Nightmare': 1,
		'Fallen from Grace': 0
	};
	const getGemCost = (level) => {
		switch (true) {
			case level < 8:
				return 'Scroll of Wisdom';
			case level < 16:
				return 'Orb of Transmutation';
			case level < 28:
				return 'Orb of Alteration';
			case level < 38:
				return 'Orb of Chance';
			default:
				return 'Orb of Alchemy';
		}
	};
	try {
		const gemsResult = await fetch('https://poe-gems.blemming.workers.dev/api/gems').then(res => res.json());
		const gems = gemsResult.gems.map(gem => ({
			...gem,
			support: gem.name.includes('Support'),
			price: getGemCost(gem.required_level)
		})).filter(gem => gem.vendor_rewards[0].act !== null);
		const quests = gems.filter(gem => gem.vendor_rewards[0].act !== null).reduce((acc, gem) => {
			if (gem.quest_rewards.length) {
				if (!acc.find(obj => obj.quest === gem.quest_rewards[0].quest)) {
					acc.push({
						act: gem.quest_rewards[0].act,
						quest: gem.quest_rewards[0].quest,
						order: questOrder[gem.quest_rewards[0].quest] || 0,
						gems: [],
						vendorGems: []
					});
				}
			}
			gem.vendor_rewards.forEach((reward) => {
				if (!acc.find(obj => obj.quest === reward.quest)) {
					acc.push({
						act: reward.act,
						quest: reward.quest,
						order: questOrder[reward.quest] || 0,
						gems: [],
						vendorGems: []
					});
				}
			});
			return acc;
		}, []).sort((a, b) => a.act - b.act || a.order - b.order);
		await fs.writeFile('./data/quests.json', JSON.stringify(quests, null, 2));
		if (oldGems.length !== gems.length) {
			await fs.writeFile('./data/gems.json', JSON.stringify(gems, null, 2));
		} else {
			console.log('No new gems');
		}
		// await fs.writeFile('./data/gems.json', JSON.stringify(gems, null, 2));
	} catch (e) {
		console.log(e);
	}
})();
