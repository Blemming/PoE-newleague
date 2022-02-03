<template>
	<ul class="ml-6 mt-4">
		<template v-for="(step,index) in newSteps">
			<step-item
				:key="`${act}-step-${index}`"
				:act="act"
				:step="step"
				:index="index"
				:steps-length="newSteps.length"
				v-on="$listeners"
			/>
		</template>
	</ul>
</template>
<script>
import { mapState } from 'vuex';
export default {
	props: {
		act: {
			type: String,
			required: true
		},
		content: {
			type: Object,
			required: true
		}
	},
	computed: {
		newSteps () {
			if (!this.content.steps || this.content.steps.length === 0) {
				return [];
			} else {
				return this.content.steps.reduce((newSteps, originalStep, stepIndex) => {
					newSteps.push(originalStep);
					if (!this.currentActQuestPositions || !this.$store.state.chosenClass) {
						return newSteps;
					}
					const stepPositions = this.currentActQuestPositions.map(pos => pos.position);
					if (stepPositions.includes(stepIndex)) {
						const questPositions = this.currentActQuestPositions.filter(pos => pos.position === stepIndex);
						questPositions.forEach((questPosition) => {
							const currentQuest = this.currentActQuests.find(ogQuest => ogQuest.order === questPosition.questOrder);
							const gems = [];
							const vendorGems = {};
							if (this.$store.state.chosenGems[currentQuest.quest]) {
								this.$store.state.chosenGems[currentQuest.quest].forEach((gem) => {
									gems.push(`<span class=" text-gem-poe mr-2"><img class="w-5 h-5" src="${gem.icon.replace('https://www.poewiki.net/wiki/Special:FilePath', '/images')}" alt="${gem.name}">${gem.name}</span>`);
								});
							}
							newSteps.push(`Turn in <span class="quest-title">${currentQuest.quest}</span>${gems.length ? ' and pick ' : ''}${gems.join(' and')}`);
							if (this.$store.state.chosenVendorGems[currentQuest.quest]) {
								this.$store.state.chosenVendorGems[currentQuest.quest].forEach((gem) => {
									if (!vendorGems[gem.npc]) {
										vendorGems[gem.npc] = [];
									}
									vendorGems[gem.npc].push(`<span class=" text-gem-poe mr-2"><img class="w-5 h-5" src="${gem.icon.replace('https://www.poewiki.net/wiki/Special:FilePath', '/images')}" alt="${gem.name}">${gem.name}</span>for <img class="w-5 h-5" src="/images/${gem.price.replace(/\s/g, '_')}.png" alt="${gem.price}"><span class="font-serif text-yellow-poe-light">${gem.price}</span>`);
								});
							}
							if (Object.keys(vendorGems).length) {
								for (const vendor in vendorGems) {
									newSteps.push(`Talk to <span class="text-white text-shadow-black font-serif">${vendor}</span> and buy ${vendorGems[vendor].join(' and ')}`);
								}
							}
						});
					}
					return newSteps;
				}, []);
			}
		},
		currentActQuestPositions () {
			return this.questPositions[this.act];
		},
		currentActQuests () {
			return this.quests.filter(quest => quest.act === parseInt(this.act.replace('act_', '')));
		},
		...mapState({
			quests: state => state.quests,
			questPositions: state => state.questPositions
		})
	}
};
</script>
