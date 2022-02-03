<template>
	<div
		v-if="showModal"
		:class="`fixed w-screen h-screen bg-black-85 ${!showModal?'pointer-events-none':''}`"
	>
		<section v-click-outside="onClickOutside" class="relative w-full lg:w-1/2 flex flex-col items-center pt-8 mx-auto">
			<section style="max-height:95vh;" class="w-full overflow-y-auto relative  border-poe mb-4">
				<div class="bg-poe-x text-yellow-poe-dark ">
					<div class="bg-poe-y py-4 px-6 ">
						<slot />
					</div>
				</div>
				<div class="absolute top-0 right-0 mt-2 mr-2">
					<button class="text-red-500 text-shadow-black hover:text-red-600 font-serif" @click.prevent="onClickOutside()">
						Close
					</button>
				</div>
			</section>
		</section>
	</div>
</template>
<script>
import vClickOutside from 'v-click-outside';
export default {
	directives: {
		clickOutside: vClickOutside.directive
	},
	props: {
		showModal: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		onClickOutside () {
			if (this.showModal) {
				this.$emit('toggleModal');
			}
		}
	}
};
</script>
