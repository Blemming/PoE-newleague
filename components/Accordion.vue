<template>
	<div class="bg-black-85 border-black px-4 py-2 text-gray-300 opacity-75">
		<h3 class="w-full cursor-pointer text-yellow-poe-light text-xl font-semibold inline-flex justify-between" @click="isOpen = !isOpen">
			Tips
			<span v-if="isOpen" class="font-serif leading-none text-3xl">-</span>
			<span v-else class="font-serif leading-none text-3xl">+</span>
		</h3>
		<transition name="open">
			<ul v-show="isOpen" class="tips text-sm mt-2">
				<li v-for="(tip,index) in content.tips" :key="`${act}-tip-${index}`">
					{{ tip }}
				</li>
			</ul>
		</transition>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		act: {
			type: String,
			default: ''
		},
		content: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			isOpen: true
		};
	},
	computed: {
		...mapState({
			hideTips: state => state.hideTips
		})
	},
	watch: {
		hideTips (change) {
			this.isOpen = change;
		}
	}
};
</script>

<style>
ul.tips{
	list-style-position: inside;
	list-style-image: url('https://web.poecdn.com/image/list/t1.png')!important;
}
.tips{
	overflow: hidden;
	max-height: 260px;
}
.open-enter-active, .open-leave-active {
  transition: max-height .5s;
}
.open-enter, .open-leave-to {
  max-height: 0;
}
</style>
