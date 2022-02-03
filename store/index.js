import clone from 'just-clone';
import data from '~/data/data.json';
import gems from '~/data/gems.json';
import quests from '~/data/quests.json';
export const state = () => ({
	data,
	gems,
	quests,
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
			{ questOrder: 1, position: 10 }
		],
		act_3: [
			{ questOrder: 0, position: 3 },
			{ questOrder: 1, position: 14 },
			{ questOrder: 2, position: 17 }
		],
		act_4: [
			{ questOrder: 0, position: 1 },
			{ questOrder: 1, position: 14 }
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
		state.chosenGems = payload;
	},
	ADD_CHOSEN_GEM (state, payload) {
		if (payload.quest !== 'The Caged Brute') {
			state.chosenGems[payload.quest] = [payload.gem];
		} else {
			if (state.chosenGems[payload.quest].length === 2) {
				state.chosenGems[payload.quest].shift();
			}
			state.chosenGems[payload.quest].push(payload.gem);
		}
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
		const referenceQuests = clone(state.quests);
		classGems.forEach((gem) => {
			const quest = referenceQuests.find(obj => obj.quest === gem.quest_rewards[0].quest);
			// eslint-disable-next-line camelcase
			const { icon, id, name, primary_attr, required_level } = gem;
			if (quest) {
				quest.gems.push({ icon, id, name, primary_attr, required_level });
			}
		});
		return referenceQuests;
	},
	getClassGemVendor: (state) => {
		if (!state.chosenClass) { return []; }
		const classGems = state.gems.filter(gem => gem.quest_rewards[0] && gem.quest_rewards[0].classes.includes(state.chosenClass));
		const referenceQuests = clone(state.quests);
		classGems.forEach((gem) => {
			const quest = referenceQuests.find(obj => obj.quest === gem.quest_rewards[0].quest);
			// eslint-disable-next-line camelcase
			const { icon, id, name, primary_attr, required_level } = gem;
			if (quest) {
				quest.gems.push({ icon, id, name, primary_attr, required_level });
			}
		});
		return referenceQuests;
	},
	getChosenGems: (state) => {
		return Object.keys(state.chosenGems).reduce((acc, quest) => {
			acc.push(state.chosenGems[quest].map(gem => gem.id));
			return acc;
		}, []).flat(2);
	},
	encodedGemChoices: (state, getters) => {
		if (!state.chosenClass) { return ''; }
		return btoa(JSON.stringify([state.chosenClass, ...getters.getChosenGems]));
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
	},
	decodeStringToGems ({ commit, state }, payload) {
		try {
			const decodedGems = JSON.parse(atob(payload));
			const [chosenClass, ...chosenGems] = decodedGems;
			const foundGems = chosenGems.map(gem => state.gems.find(g => g.id === gem)).filter(Boolean);
			const result = foundGems.reduce((acc, gem) => {
				if (!acc[gem.quest_rewards[0].quest]) {
					acc[gem.quest_rewards[0].quest] = [];
				}
				acc[gem.quest_rewards[0].quest].push({
					icon: gem.icon,
					id: gem.id,
					name: gem.name,
					primary_attr: gem.primary_attr,
					required_level: gem.required_level
				});
				return acc;
			}, {});
			commit('SET_CHOSEN_CLASS', chosenClass);
			localStorage.setItem('chosenClass', chosenClass);
			commit('SET_CHOSEN_GEMS', result);
			localStorage.setItem('chosenGems', JSON.stringify(result));
		} catch (e) {
			console.log(e);
		}
	},
	saveGems ({ commit, state }, payload) {
		commit('ADD_CHOSEN_GEM', payload);
		if (localStorage) {
			localStorage.setItem('chosenGems', JSON.stringify(state.chosenGems));
			localStorage.setItem('chosenClass', state.chosenClass);
		}
	},
	nuxtClientInit ({ commit, dispatch }) {
		if (localStorage) {
			const savedProgress = localStorage.getItem('progress');
			const savedChosenGems = localStorage.getItem('chosenGems');
			const savedChosenClass = localStorage.getItem('chosenClass');
			if (savedChosenGems) {
				commit('SET_CHOSEN_GEMS', JSON.parse(savedChosenGems));
			}
			commit('SET_CHOSEN_CLASS', savedChosenClass);
			const payload = (savedProgress !== null) ? savedProgress.split(',').filter(Boolean).filter(prog => prog !== 'undefined') : [];
			commit('SET_PROGRESS', payload);
		}
	}
};
