<template>
	<div>
		<div class="flex flex-wrap justify-between mb-2">
			<div class="inline-flex">
				<h3 class="text-yellow-poe-light text-xl font-semibold">
					Act {{ quest.act }} - {{ quest.quest }}
				</h3>
				<button v-if="$store.state.chosenVendorGems[quest.quest].length" class="text-red-500 text-shadow-black hover:text-red-600 font-serif ml-2" @click.prevent="resetChosenGems(quest.quest)">
					Reset
				</button>
			</div>
			<div class="relative w-full lg:w-1/4 ">
				<input
					:id="`${quest.name}-search`"
					v-model="vendorSearch"
					:placeholder="`Search ${quest.quest} gems`"
					class="w-full text-sm appearance-none font-serif placeholder-gray-700 bg-gray-900 py-1 px-1  border border-black-85 focus:border-yellow-poe-dark"
					type="text"
					name=""
				>
				<a v-if="vendorSearch.length > 0" class="absolute cursor-pointer font-serif top-0 right-0 mt-1 mr-2 text-red-600 hover:text-red-400" @click.prevent="vendorSearch=''">
					X
				</a>
			</div>
		</div>

		<div class="border-poe bg-poe-x">
			<div
				v-if="chosenVendorGems[quest.quest]"
				class=" bg-black-50 p-2 flex flex-wrap max-h-20 overflow-y-auto"
			>
				<!-- <div v-if="vendorSearch.length < 3 && quest.gems.length > 30">
					<p class="text-yellow-poe-dark font-serif">
						Too many gems, search for gems
					</p>
				</div> -->
				<div
					v-for="gem of filteredGems"
					:key="`${gem.id}_vendor_${quest.quest}`"
					:class="{'opacity-100':chosenVendorGems[quest.quest] && chosenVendorGems[quest.quest].find(c => c.id ===gem.id),'opacity-30':chosenVendorGems[quest.quest] && !chosenVendorGems[quest.quest].find(c => c.id ===gem.id) && chosenVendorGems[quest.quest].length > 0 }"
					class="cursor-pointer w-full lg:w-1/4 inline-flex pr-2 "
					@click="addChosenGem(quest.quest,gem)"
				>
					<img class="w-6 h-6" :src="gem.icon.replace('https://www.poewiki.net/wiki/Special:FilePath', '/images')" :alt="gem.name">
					<h2 class="text-gem-poe">
						{{ gem.name }}
					</h2>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
	props: {
		quest: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			vendorSearch: ''
		};
	},
	computed: {
		filteredGems () {
			return this.quest.gems.filter(gem => gem.name.toLowerCase().includes(this.vendorSearch.toLowerCase())).sort((a, b) => a.required_level - b.required_level);
		},
		...mapState({
			chosenVendorGems: state => state.chosenVendorGems
		}),
		...mapGetters({
			getChosenGems: 'getChosenGems',
			getChosenVendorGems: 'getChosenVendorGems'
		})
	},
	methods: {
		addChosenGem (quest, gem) {
			this.vendorSearch = '';
			this.$store.dispatch('saveVendorGems', { quest, gem });
		},
		resetChosenGems (quest) {
			this.$store.dispatch('resetVendorGems', { quest });
		}
	}
};
</script>
<style>
</style>
