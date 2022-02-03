<template>
	<div class="w-full flex flex-col">
		<h2 class="text-3xl text-white font-serif text-center text-shadow-black">
			Gem Helper
		</h2>
		<div class="w-full my-2 flex flex-wrap flex-row">
			<div class="w-full flex  lg:w-1/2">
				<input-select
					class="w-full lg:w-1/2"
					label="game-class"
					default="Choose a class"
					:value="$store.state.chosenClass"
					:options="$store.state.classes.map(cl=> ({value:cl,description:cl}))"
					@input="setChosenClass"
				/>
				<button v-if="$store.state.chosenClass" class="text-red-500 text-shadow-black hover:text-red-600 font-serif ml-2" @click.prevent="setChosenClass('')">
					Reset
				</button>
			</div>
			<div class="w-full flex justify-end items-center lg:w-1/2">
				<div>
					<input
						id="import"
						v-model="stringToDecode"
						placeholder="Paste code to import gems"
						class="w-full appearance-none font-serif placeholder-gray-700 bg-gray-900 py-1.5 px-1  border border-black-85 focus:border-yellow-poe-dark"
						type="text"
						name=""
					>
				</div>
				<button class="text-green-500 text-shadow-black hover:text-green-600 font-serif ml-2" @click.prevent="decodeStringToGems()">
					Import
				</button>
			</div>
		</div>
		<div v-if="$store.state.chosenClass" class="flex flex-wrap">
			<div v-for="(quest) of $store.getters.getClassGemRewards" :key="quest.quest" class="w-full">
				<h3 class="text-yellow-poe-light text-xl font-semibold">
					Act {{ quest.act }} - {{ quest.quest }} ({{ $store.state.chosenGems[quest.quest].length }}/{{ (quest.quest ==='The Caged Brute'?'2':'1') }})
				</h3>
				<div class="border-poe ">
					<div class="bg-poe-x p-2 flex flex-col">
						<div v-for="gem of quest.gems" :key="gem.id" :class="{'opacity-100':getChosenGems.includes(gem.id),'opacity-30':!getChosenGems.includes(gem.id) && $store.state.chosenGems[quest.quest].length > 0}" class="cursor-pointer inline-flex mr-2" @click="addChosenGem(quest.quest,gem)">
							<img class="w-6 h-6" :src="gem.icon.replace('https://www.poewiki.net/wiki/Special:FilePath', '/images')" :alt="gem.name">
							<h2 class="text-gem-poe">
								{{ gem.name }}
							</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	data () {
		return {
			stringToDecode: ''
		};
	},
	computed: {
		...mapGetters({
			getChosenGems: 'getChosenGems'
		})
	},
	methods: {
		decodeStringToGems () {
			console.log(this.stringToDecode);
			this.$nextTick(() => {
				this.$store.dispatch('decodeStringToGems', this.stringToDecode);
			});
		},
		setChosenClass (chosenClass) {
			this.$store.dispatch('chooseClass', chosenClass);
		},
		addChosenGem (quest, gem) {
			this.$store.dispatch('saveGems', { quest, gem });
		},
		checkChosen (quest, gem) {
			return this.$store.state.chosenGems[quest].id === gem.id;
		}
	}
};
</script>
