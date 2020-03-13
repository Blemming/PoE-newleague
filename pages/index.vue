<style>
em{
	@apply font-serif;
	@apply font-bold;
	@apply not-italic;
	@apply text-yellow-poe-light;
}
.boss{
	@apply font-serif;
	@apply text-orange-600;
	@apply font-bold;
}
.quest{
	@apply font-serif;
	color:rgb(74, 230, 58);
	@apply font-bold;
}
.wp,.tp{
	@apply tracking-tight;
	@apply text-blue-200;
	@apply opacity-75;
	@apply text-sm;
}
strong{
	@apply font-serif;
	@apply text-white;
	text-shadow: 1px 1px 1px #000;
}
li img{
	@apply inline-block;
	@apply w-5;
	@apply h-5;
	margin-right: 1px;
}
</style>
<template>
	<div>
		<div class="bg-poe-y py-4 px-6 ">
			<h1 class="text-5xl text-white font-serif text-center text-shadow-black">
				<span class="text-yellow-600">
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
			<!-- <div  class="bg-black-85 border-black px-4 py-2 text-gray-300 opacity-75">
				<h3 class="text-xl font-semibold">
					Tips
				</h3>
				<ul class="tips text-sm ml-4">
					<li v-for="(tip,index) in content.tips" :key="`${act}-tip-${index}`" class="list-disc">
						{{ tip }}
					</li>
				</ul>
			</div> -->
			<ul class="ml-4 lg:ml-6 mt-4">
				<li v-for="(step,index) in content.steps" :key="`${act}-step-${index}`" class="my-4 lg:mt-0 list-decimal">
					<label class="custom-checkbox flex items-center" :for="`${act}-step-${index}`">
						<div class=" bg-gray-900 hidden lg:flex border border-black-85 shadow w-4 h-4 justify-center items-center mr-0 lg:mr-2">
							<input
								:id="`${act}-step-${index}`"
								v-model="progress"
								class="hidden"
								type="checkbox"
								:value="`${act}-step-${index}`"
								@change="nextAct(content.steps.length,index,act)"
							>
							<svg class="hidden w-4 h-4 text-gray-300 pointer-events-none" viewBox="0 0 172 172">
								<g
									fill="none"
									stroke-width="none"
									stroke-miterlimit="10"
									font-family="none"
									font-weight="none"
									font-size="none"
									text-anchor="none"
									style="mix-blend-mode:normal"
								>
									<path d="M0 172V0h172v172z" /><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1" /></g>
							</svg>
						</div>
						<div :class="{'opacity-25 line-through':progress.includes(`${act}-step-${index}`)}" v-html="$md.render(step)" />
					</label>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Accordion from '~/components/Accordion';
export default {
	components: {
		Accordion
	},
	computed: {
		progress: {
			get () {
				return this.$store.state.progress;
			},
			set (value) {
				this.$store.dispatch('addProgress', value);
			}
		},
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
		},
		nextAct (arrayLength, index, act) {
			if ((arrayLength - 1) === index && this.progress.includes(`${act}-step-${index}`)) {
				const nextAct = `act_${(parseInt(act.split('_').reverse()[0])) + 1}`;
				if (nextAct !== 'act_11') {
					this.moveTo(nextAct);
				}
			}
		}
	}
};
</script>
