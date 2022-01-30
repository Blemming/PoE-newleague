<template>
	<div class="bg-black-85 border-black px-4 py-2 text-gray-300 opacity-75">
		<h3 class="w-full cursor-pointer text-yellow-poe-light text-xl font-semibold inline-flex justify-between" @click="isOpen = !isOpen">
			Tips
			<span v-if="isOpen" class="font-serif leading-none text-3xl">-</span>
			<span v-else class="font-serif leading-none text-3xl">+</span>
		</h3>
		<transition name="open">
			<ul ref="tips" class="tips text-sm mt-2">
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
			height: 0,
			isOpen: true
		};
	},
	mounted () {
		this.height = this.$refs.tips.clientHeight;
		this.$refs.tips.style.maxHeight = `${this.height}px`;
		this.$refs.tips.style.overflow = 'hidden';
	},
	computed: {
		...mapState({
			hideTips: state => state.hideTips
		})
	},
	watch: {
		isOpen (change) {
			if (change) {
				this.$refs.tips.style.maxHeight = `${this.height}px`;
			} else {
				this.$refs.tips.style.maxHeight = '0px';
			}
		},
		hideTips (change) {
			this.isOpen = change;
		}
	}
};
</script>

<style>
ul.tips {
	list-style-position: inside;
	list-style-image: url("https://web.poecdn.com/image/list/t1.png") !important;
}

/* @media only screen and (max-width: 600px) {
	.tips {
		overflow: auto!important;
	}
}
.tips {
	overflow: hidden;
	max-height: 500px;
} */
.tips {
	transform: translateZ(0);
	transition: max-height 0.5s;
}
.open-enter-active,
.open-leave-active {
	transition: max-height 0.5s;
}
/* .open-enter,
.open-leave-to {
	max-height: 0;
} */
</style>
