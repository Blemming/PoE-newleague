<template>
	<section class="relative w-full flex flex-col">
		<h2 class="text-3xl text-white font-serif text-center text-shadow-black">
			Saved builds
		</h2>
		<div class="w-full flex flex-wrap flex-row justify-between">
			<div class="w-full lg:w-1/4">
				<div class="flex justify-around">
					<label class="text-gray-300" for="export">Export</label>
					<button class="ml-auto text-green-500 text-shadow-black hover:text-green-600 font-serif text-sm" @click.prevent="copyExport">
						{{ copyText }}
					</button>
				</div>
				<input
					id="export"
					disabled
					class="max-w-full bg-gray-poe-dark text-yellow-poe-light px-1 opacity-50"
					type="text"
					:value="$store.getters.encodedGemChoices"
					name="export"
				>
			</div>

			<div class="w-full flex justify-end items-center lg:w-1/4">
				<div>
					<input
						id="import"
						v-model="stringToDecode"
						placeholder="Paste code to import gems"
						class="w-full appearance-none font-serif placeholder-gray-600 bg-gray-900 py-1.5 px-1  border border-black-85 focus:border-yellow-poe-dark"
						type="text"
						name=""
					>
				</div>
				<button class="text-green-500 text-shadow-black hover:text-green-600 font-serif ml-2" @click.prevent="decodeStringToGems()">
					Import
				</button>
			</div>
		</div>
		<div class="w-full border-poe mt-4">
			<div class="bg-poe-light-y py-4 px-8 flex flex-row justify-between">
				<div class="flex items-center">
					<input
						id="import"
						v-model="newBuild.name"
						placeholder="Enter a name"
						class="w-full appearance-none font-serif placeholder-gray-600 bg-gray-900 py-1.5 px-1  border border-black-85 focus:border-yellow-poe-dark"
						type="text"
						name=""
					>
				</div>
				<div class="flex">
					<button class="btn ml-4 bg-green-700  text-green-200 font-serif text-shadow-black opacity-75 hover:opacity-100" @click="saveBuild">
						Save
					</button>
				</div>
			</div>
			<div v-for="(build,index) of buildList" :key="`${index}-${build.name}`" :class="{'bg-poe-light-y-green':build.build === $store.getters.encodedGemChoices,'bg-poe-light-y':build.build !== $store.getters.encodedGemChoices}" class="py-4 px-8 flex flex-row justify-between mt-2">
				<div class="flex items-center">
					<h3 class="text-xl font-serif text-white">
						{{ build.name }}
						<span class="text-base text-yellow-poe-light ">
							{{ build.class }}
						</span>
					</h3>
				</div>
				<div class="flex">
					<button class="btn ml-4 bg-poe-y  text-yellow-poe-light font-serif text-shadow-black opacity-75 hover:opacity-100" @click="loadBuild(build.build)">
						Load
					</button>
					<button class="btn ml-4 bg-red-700  text-red-200 font-serif text-shadow-black opacity-75 hover:opacity-100" @click="deleteBuild(index)">
						Delete
					</button>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data () {
		return {
			copyText: 'copy',
			stringToDecode: '',
			newBuild: {
				name: ''
			}
		};
	},
	computed: {
		...mapState({
			buildList: state => [...state.buildList].reverse()
		})
	},
	methods: {
		decodeStringToGems () {
			this.$nextTick(() => {
				this.$store.dispatch('decodeStringToGems', this.stringToDecode);
			});
		},
		saveBuild () {
			this.$store.dispatch('saveBuild', this.newBuild);
			this.newBuild.name = '';
		},
		loadBuild (code) {
			this.$store.dispatch('decodeStringToGems', code);
		},
		deleteBuild (index) {
			this.$store.dispatch('deleteBuild', index);
		},
		copyExport () {
			const copyText = document.getElementById('export');
			copyText.select();
			navigator.clipboard.writeText(this.$store.getters.encodedGemChoices);
			this.copyText = 'copied';
			setTimeout(() => {
				this.copyText = 'copy';
			}, 3000);
		}
	}
};
</script>
