import clone from 'just-clone';
import data from '~/data/data.json';
import gems from '~/data/gems.json';
import { version } from '~/package.json';
import quests from '~/data/quests.json';
export const state = () => ({
	data,
	gems,
	quests,
	version,
	progress: [],
	questPositions: {
		act_1: [
			{ questOrder: 0, position: 0 },
			{ questOrder: 1, position: 4 },
			{ questOrder: 2, position: 4 },
			{ questOrder: 3, position: 13 },
			{ questOrder: 4, position: 15 }
		],
		act_2: [
			{ questOrder: 0, position: 6 },
			{ questOrder: 1, position: 10 },
			{ questOrder: 2, position: 16 }
		],
		act_3: [
			{ questOrder: 0, position: 3 },
			{ questOrder: 1, position: 14 },
			{ questOrder: 2, position: 17 }
		],
		act_4: [
			{ questOrder: 0, position: 1 },
			{ questOrder: 1, position: 14 }
		],
		act_6: [
			{ questOrder: 0, position: 0 }
		]
	},
	chosenGems: {
		'Enemy at the Gate': [],
		'Breaking Some Eggs': [],
		'Mercy Mission': [],
		'The Caged Brute': [],
		"The Siren's Cadence": [],
		'Intruders in Black': [],
		'Sharp and Cruel': [],
		'Lost in Love': [],
		'Sever the Right Hand': [],
		'A Fixture of Fate': [],
		'Breaking the Seal': [],
		'The Eternal Nightmare': []
	},
	chosenVendorGems: {
		'Enemy at the Gate': [],
		'Breaking Some Eggs': [],
		'Mercy Mission': [],
		'The Caged Brute': [],
		"The Siren's Cadence": [],
		'Intruders in Black': [],
		'Sharp and Cruel': [],
		'Lost in Love': [],
		'The Root of the Problem': [],
		'Sever the Right Hand': [],
		'A Fixture of Fate': [],
		'Breaking the Seal': [],
		'The Eternal Nightmare': [],
		'Fallen from Grace': []
	},
	hideTips: true,
	showModal: false,
	newLeague: true,
	moveToAct: '',
	chosenClass: '',
	classes: [
		'Duelist',
		'Marauder',
		'Ranger',
		'Scion',
		'Shadow',
		'Templar',
		'Witch'
	]
});
export const mutations = {
	SET_CHOSEN_GEMS (state, payload) {
		state.chosenGems = { ...state.chosenGems, ...payload };
	},
	SET_CHOSEN_VENDOR_GEMS (state, payload) {
		state.chosenVendorGems = { ...state.chosenVendorGems, ...payload };
	},
	ADD_CHOSEN_GEM (state, payload) {
		if (payload.quest !== 'The Caged Brute') {
			state.chosenGems[payload.quest] = [payload.gem];
		} else if (payload.gem.support) {
			state.chosenGems[payload.quest] = state.chosenGems[payload.quest].filter(gem => !gem.support);
			state.chosenGems[payload.quest].push(payload.gem);
		} else {
			state.chosenGems[payload.quest] = state.chosenGems[payload.quest].filter(gem => gem.support);
			state.chosenGems[payload.quest].push(payload.gem);
		}
	},
	RESET_CHOSEN_GEMS_QUEST (state, payload) {
		state.chosenGems[payload.quest] = [];
	},
	ADD_CHOSEN_VENDOR_GEM (state, payload) {
		if (state.chosenVendorGems[payload.quest].includes(payload.gem)) {
			state.chosenVendorGems[payload.quest] = state.chosenVendorGems[payload.quest].filter(gem => gem !== payload.gem);
		} else {
			state.chosenVendorGems[payload.quest].push(payload.gem);
		}
	},
	RESET_CHOSEN_VENDOR_GEMS_QUEST (state, payload) {
		state.chosenVendorGems[payload.quest] = [];
	},
	SET_PROGRESS (state, payload) {
		state.progress = [...payload];
	},
	SET_CHOSEN_CLASS (state, payload) {
		state.chosenClass = payload;
	},
	RESET_CHOSEN_GEMS (state) {
		state.chosenGems = {
			'Enemy at the Gate': [],
			'Breaking Some Eggs': [],
			'Mercy Mission': [],
			'The Caged Brute': [],
			"The Siren's Cadence": [],
			'Intruders in Black': [],
			'Sharp and Cruel': [],
			'Lost in Love': [],
			'Sever the Right Hand': [],
			'A Fixture of Fate': [],
			'Breaking the Seal': [],
			'The Eternal Nightmare': []
		};
	},
	RESET_CHOSEN_VENDOR_GEMS (state) {
		state.chosenVendorGems = {
			'Enemy at the Gate': [],
			'Breaking Some Eggs': [],
			'Mercy Mission': [],
			'The Caged Brute': [],
			"The Siren's Cadence": [],
			'Intruders in Black': [],
			'Sharp and Cruel': [],
			'Lost in Love': [],
			'The Root of the Problem': [],
			'Sever the Right Hand': [],
			'A Fixture of Fate': [],
			'Breaking the Seal': [],
			'The Eternal Nightmare': [],
			'Fallen from Grace': []
		};
	},
	TOGGLE_TIPS (state) {
		state.hideTips = !state.hideTips;
	},
	TOGGLE_MODAL (state) {
		state.showModal = !state.showModal;
	},
	TOGGLE_NEWLEAGUE (state) {
		state.newLeague = !state.newLeague;
	},
	SET_MOVE_TO (state, payload) {
		state.moveToAct = payload;
	},
	REMOVE_QUEST_POSITION (state, payload) {
		state.questPositions.splice(payload, 1);
	}
};
export const getters = {
	acts: (state) => {
		return Object.keys(state.data).map(key => ({ id: key, description: key.replace('a', 'A').replace('_', ' ') })).filter(obj => obj.id !== 'act_0');
	},
	getClassGemRewards: (state) => {
		if (!state.chosenClass) { return []; }
		const classGems = state.gems.filter(gem => gem.quest_rewards[0] && gem.quest_rewards[0].classes.includes(state.chosenClass));
		const questBlacklist = [
			'The Root of the Problem',
			'Fallen from Grace'
		];
		const referenceQuests = clone(state.quests).filter(quest => !questBlacklist.includes(quest.quest));
		classGems.forEach((gem) => {
			const quest = referenceQuests.find(obj => obj.quest === gem.quest_rewards[0].quest);
			// eslint-disable-next-line camelcase
			const { icon, id, name, primary_attr, required_level, support, price } = gem;
			if (quest) {
				quest.gems.push({ icon, id, name, primary_attr, required_level, support, price });
			}
		});
		return referenceQuests;
	},
	getClassGemVendor: (state) => {
		if (!state.chosenClass) { return []; }
		const classGems = state.gems.filter((gem) => {
			return gem.vendor_rewards.find(obj => obj.classes.includes(state.chosenClass) || obj.classes.length === 0);
		});
		const referenceQuests = clone(state.quests);
		classGems.forEach((gem) => {
			gem.vendor_rewards.forEach((reward) => {
				const quest = referenceQuests.find(obj => obj.quest === reward.quest && (reward.classes.includes(state.chosenClass) || reward.classes.length === 0));
				// eslint-disable-next-line camelcase
				const { icon, id, name, primary_attr, required_level, support, price } = gem;
				if (quest) {
					if (!quest.gems.find(obj => obj.id === id)) {
						quest.gems.push({ npc: reward.npc, icon, id, name, primary_attr, required_level, support, price });
					}
				}
			});
		});
		return referenceQuests;
	},
	getChosenGems: (state) => {
		return Object.keys(state.chosenGems).reduce((acc, quest) => {
			acc.push(state.chosenGems[quest].map(gem => gem.id));
			return acc;
		}, []).flat(2);
	},
	getChosenVendorGems: (state) => {
		return Object.keys(state.chosenVendorGems).reduce((acc, quest) => {
			if (state.chosenVendorGems[quest].length > 0) {
				acc.push(`${quest}--${state.chosenVendorGems[quest].map(gem => gem.id)}`);
			}
			return acc;
		}, []).flat(2);
	},
	encodedGemChoices: (state, getters) => {
		if (!state.chosenClass) { return ''; }
		return btoa(JSON.stringify([state.chosenClass, getters.getChosenGems, getters.getChosenVendorGems]));
	}
};
export const actions = {
	addProgress ({ commit }, payload) {
		commit('SET_PROGRESS', payload);
		if (localStorage) {
			localStorage.setItem('progress', payload);
		}
	},
	chooseClass ({ commit, state }, payload) {
		commit('SET_CHOSEN_CLASS', payload);
		localStorage.setItem('chosenClass', payload);
		commit('RESET_CHOSEN_GEMS');
		localStorage.setItem('chosenGems', JSON.stringify(state.chosenGems));
		commit('RESET_CHOSEN_VENDOR_GEMS');
		localStorage.setItem('chosenGems', JSON.stringify(state.chosenVendorGems));
	},
	decodeStringToGems ({ commit, state }, payload) {
		try {
			const decodedGems = JSON.parse(atob(payload));
			const [chosenClass, chosenGems, chosenVendorGems] = decodedGems;
			const foundQuestGems = chosenGems.map(gem => state.gems.find(g => g.id === gem)).filter(Boolean);
			const questResult = foundQuestGems.reduce((acc, gem) => {
				if (!acc[gem.quest_rewards[0].quest]) {
					acc[gem.quest_rewards[0].quest] = [];
				}
				acc[gem.quest_rewards[0].quest].push({
					icon: gem.icon,
					id: gem.id,
					name: gem.name,
					primary_attr: gem.primary_attr,
					required_level: gem.required_level,
					price: gem.price,
					support: gem.support
				});
				return acc;
			}, {});
			const vendorResult = chosenVendorGems.reduce((acc, gem) => {
				const [quest, gemid] = gem.split('--');
				if (!acc[quest]) {
					acc[quest] = [];
				}
				const foundGem = state.gems.find(g => g.id === gemid);
				if (foundGem) {
					acc[quest].push({
						icon: foundGem.icon,
						id: foundGem.id,
						name: foundGem.name,
						npc: foundGem.vendor_rewards.find(obj => obj.quest === quest).npc,
						primary_attr: foundGem.primary_attr,
						required_level: foundGem.required_level,
						price: foundGem.price,
						support: foundGem.support
					});
				}
				return acc;
			}, {});
			commit('SET_CHOSEN_CLASS', chosenClass);
			localStorage.setItem('chosenClass', chosenClass);
			commit('SET_CHOSEN_GEMS', questResult);
			localStorage.setItem('chosenGems', JSON.stringify(questResult));
			commit('SET_CHOSEN_VENDOR_GEMS', vendorResult);
			localStorage.setItem('chosenVendorGems', JSON.stringify(vendorResult));
			localStorage.setItem('version', state.version);
		} catch (e) {
			console.log(e);
		}
	},
	saveGems ({ commit, state }, payload) {
		commit('ADD_CHOSEN_GEM', payload);
		if (localStorage) {
			localStorage.setItem('chosenGems', JSON.stringify(state.chosenGems));
			localStorage.setItem('chosenClass', state.chosenClass);
			localStorage.setItem('version', state.version);
		}
	},
	resetGems ({ commit, state }, payload) {
		commit('RESET_CHOSEN_GEMS_QUEST', payload);
		if (localStorage) {
			localStorage.setItem('chosenGems', JSON.stringify(state.chosenGems));
			localStorage.setItem('chosenClass', state.chosenClass);
			localStorage.setItem('version', state.version);
		}
	},
	saveVendorGems ({ commit, state }, payload) {
		commit('ADD_CHOSEN_VENDOR_GEM', payload);
		if (localStorage) {
			localStorage.setItem('chosenVendorGems', JSON.stringify(state.chosenVendorGems));
			localStorage.setItem('chosenClass', state.chosenClass);
			localStorage.setItem('version', state.version);
		}
	},
	resetVendorGems ({ commit, state }, payload) {
		commit('RESET_CHOSEN_VENDOR_GEMS_QUEST', payload);
		if (localStorage) {
			localStorage.setItem('chosenVendorGems', JSON.stringify(state.chosenVendorGems));
			localStorage.setItem('chosenClass', state.chosenClass);
			localStorage.setItem('version', state.version);
		}
	},
	nuxtClientInit ({ state, commit, dispatch }) {
		if (localStorage) {
			const savedProgress = localStorage.getItem('progress');
			const savedChosenGems = localStorage.getItem('chosenGems');
			const savedChosenVendorGems = localStorage.getItem('chosenVendorGems');
			const savedChosenClass = localStorage.getItem('chosenClass');
			const version = localStorage.getItem('version');
			if (!version) {
				localStorage.clear();
			}
			if (savedChosenGems) {
				commit('SET_CHOSEN_GEMS', JSON.parse(savedChosenGems));
			}
			if (savedChosenVendorGems) {
				commit('SET_CHOSEN_VENDOR_GEMS', JSON.parse(savedChosenVendorGems));
			}
			commit('SET_CHOSEN_CLASS', savedChosenClass);
			const payload = (savedProgress !== null) ? savedProgress.split(',').filter(Boolean).filter(prog => prog !== 'undefined') : [];
			commit('SET_PROGRESS', payload);
		}
	}
};
