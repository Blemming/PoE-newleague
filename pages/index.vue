<template>
	<div>
		<div class="bg-poe-y py-4 px-6 ">
			<h1 class="text-5xl text-white font-serif text-center tracking-tighter text-shadow-black">
				<span class="text-yellow-600 ">
					POE
				</span>
				leveling
			</h1>
			<p class="text-center font-serif">
				Leveling guide based off <a class="text-gray-300" target="_BLANK" href="https://www.twitch.tv/zizaran">Zizaran's</a> league start <a class="text-gray-300" target="_BLANK" href="https://www.youtube.com/watch?v=qRZdW1S38no">video</a> <br><span class="text-xs">by the creator of <a class="text-gray-300" target="_BLANK" href="https://poe.house">POE.house</a></span>
			</p>
		</div>
		<div v-for="(content,act) of data" :key="act" class="bg-poe-y py-4 px-2 lg:px-6">
			<h2 v-if="act !== 'act_0'" :id="act" :ref="act" class="text-4xl text-white font-serif text-center text-shadow-black">
				--== {{ act.replace('_',' ') }} ==--
			</h2>
			<h2 v-else class="text-4xl text-white font-serif text-center text-shadow-black">
				--== General ==--
			</h2>
			<Accordion v-if="content && content.tips && content.tips.length" :act="act" :content="content" />
			<step-list :key="`steps-${act}`" :act="act" :content="content" @next-act="moveTo" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import StepList from '~/components/StepList.vue';
export default {
	components: { StepList },
	computed: {
		...mapState({
			data: state => state.data,
			moveToAct: state => state.moveToAct
		})
	},
	watch: {
		moveToAct (act) {
			this.moveTo(act);
		}
	},
	methods: {
		moveTo (act) {
			this.$refs[act][0].scrollIntoView({ behavior: 'smooth' });
		}
	}
};
</script>
<style lang="postcss">
.run {
	content: url("~/assets/svg/running.svg");
	@apply text-yellow-poe-light;
	@apply h-4;
	@apply w-4;
}
.zone {
	@apply font-serif;
	@apply font-bold;
	@apply not-italic;
	@apply text-yellow-poe-light;
}
.gem {
	@apply font-serif;
	@apply text-gem-poe;
}
.boss {
	@apply font-serif;
	@apply text-orange-600;
}
.quest {
	@apply font-serif;
	color: rgb(74, 230, 58);
}
.quest-title {
	@apply font-serif;
	@apply text-amber-300;
	@apply font-bold;
	text-shadow: 1px 1px 1px #000;
}
.wp,
.tp {
	@apply tracking-tight;
	@apply text-blue-200;
	@apply opacity-75;
	@apply text-sm;
}
.trial {
	@apply font-serif;
	@apply text-white;
	text-shadow: 1px 1px 1px #000;
}
li img {
	@apply inline-block;
	@apply w-5;
	@apply h-5;
	margin-right: 1px;
}
.hide-optional span.optional {
	display: none;
}
</style>
