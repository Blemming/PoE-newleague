<template>
	<main :class="{'modal-open':showModal}" :style="`background-image:url('${require('~/assets/images/backgroundimage.jpg')}')`" class="relative flex  bg-cover bg-fixed overflow-hidden min-h-screen">
		<section class="w-full flex flex-col items-center pt-16 bg-cover bg-fixed">
			<section class="relative w-full lg:w-5/6 border-poe mb-4">
				<div class="bg-poe-x text-yellow-poe-dark ">
					<nuxt />
				</div>
			</section>
		</section>
		<div v-if="showBackdrop" :class="{'pointer-events-none opacity-0':!showSidebar}" class="backdrop fixed w-screen h-screen bg-black" @click="toggleSidebar" />
		<div class="fixed h-screen flex">
			<aside :style="{transform:`translateX(${(showSidebar)?'0':'-100'}%)`}" :class="{'w-full':showSidebar,'w-0':!showSidebar}" class="z-10 border-poe">
				<section class="pt-16 bg-poe-y flex" @click="clickedSidebar">
					<Sidebar
						:acts="acts"
						:copy-text="copyText"
						@moveTo="moveTo"
						@hideTips="hideTips"
						@copyExport="copyExport"
						@toggleModal="toggleModal"
						@toggleBuildsModal="toggleBuildsModal"
						@toggleNewLeague="toggleNewLeague"
						@clearAll="clearAll"
					/>
				</section>
			</aside>
		</div>
		<div class="fixed mt-4">
			<button class="bg-poe-y text-yellow-poe-light font-serif text-shadow-black group sidemenu-toggle flex" @click="toggleSidebar">
				<svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white mr-2" viewBox="0 0 24 24" width="24" height="24"><path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" /></svg>
				<span class="text-yellow-poe-light opacity-75 group-hover:opacity-100 ">View Acts</span>
			</button>
		</div>
		<modal
			:show-modal="showModal"
			@toggleModal="toggleModal"
		>
			<gem-helper />
		</modal>
		<modal
			:show-modal="showBuildsModal"
			@toggleModal="toggleBuildsModal"
		>
			<builds-list />
		</modal>
	</main>
</template>
<script>
import { mapGetters } from 'vuex';
import Sidebar from '~/components/Sidebar';

export default {
	components: {
		Sidebar
	},
	data: () => ({
		showSidebar: false,
		showModal: false,
		showBuildsModal: false,
		copyText: 'copy',
		moveToAct: ''
	}),
	computed: {
		showBackdrop () {
			if (process.client) {
				if (window && window.innerWidth > 1366) {
					return false;
				}
			}
			return true;
		},
		...mapGetters({
			acts: 'acts'
		})
	},
	mounted () {
		if (window && window.innerWidth > 1366) {
			this.showSidebar = true;
		}
	},
	methods: {
		clickedSidebar () {
			if (window && window.innerWidth < 1366) {
				this.showSidebar = !this.showSidebar;
			}
		},
		copyExport () {
			const copyText = document.getElementById('export');
			copyText.select();
			navigator.clipboard.writeText(this.$store.getters.encodedGemChoices);
			this.copyText = 'copied';
			setTimeout(() => {
				this.copyText = 'copy';
			}, 3000);
		},
		toggleModal () {
			this.showModal = !this.showModal;
		},
		toggleBuildsModal () {
			this.showBuildsModal = !this.showBuildsModal;
		},
		toggleSidebar () {
			this.showSidebar = !this.showSidebar;
		},
		toggleNewLeague () {
			this.$store.commit('TOGGLE_NEWLEAGUE');
		},
		hideTips () {
			this.$store.commit('TOGGLE_TIPS');
		},
		moveTo (act) {
			this.$store.commit('SET_MOVE_TO', act);
		},
		clearAll () {
			this.$store.dispatch('addProgress', []);
		}
	}
};

</script>
<style>
main.modal-open {
	height: 100vh;
	overflow-y: hidden;
}
button.sidemenu-toggle {
	@apply w-auto;
	@apply p-1;
	@apply mx-4;
	@apply text-gray-300;
	@apply shadow-md;
}
button.sidemenu-toggle:hover {
	@apply text-gray-100;
	@apply shadow-lg;
}
button.sidemenu-toggle svg {
	@apply fill-current;
}
main {
	@apply flex;
	@apply flex-wrap;
	@apply h-auto;
	@apply min-h-screen;
	transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.backdrop {
	background-color: rgba(0, 0, 0, 0.6);
	transition-duration: 0.2s;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	will-change: opacity;
	transition-property: opacity;
}
aside {
	@apply fixed;
	@apply left-0;
	@apply flex-none;
	max-width: 10rem;
	transform: translateZ(0);
	transition-duration: 0.3s;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	will-change: transform;
	transition-property: transform, width;
}
aside section {
	@apply top-0;
	@apply left-0;
	@apply w-full;
	@apply overflow-hidden;
	@apply min-h-screen;
}

.btn {
	@apply my-2;
	@apply px-2;
	@apply block;
	@apply py-1;
	text-shadow: 1px 1px 1px #000;
}
</style>
