<template>
	<section class="relative w-full flex flex-col">
		<h2 class="text-3xl text-white font-serif text-center text-shadow-black">
			Saved builds
		</h2>
		<div class="w-full lg:w-1/4 ">
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
		<div class="w-full border-poe">
			<div class="bg-poe-light-y py-4 px-8 flex flex-row justify-between">
				<h3 class="text-xl font-serif text-white">
					Name
				</h3>
				<div class="flex">
					<button class="btn mx-4 bg-poe-y  text-yellow-poe-light font-serif text-shadow-black">
						Overwrite
					</button>
					<button class="btn">
						Load
					</button>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	data () {
		return {
			copyText: 'copy'
		};
	},
	methods: {
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
