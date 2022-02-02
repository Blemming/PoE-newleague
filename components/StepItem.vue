<template>
	<li :class="{ 'hide-optional':!isNewLeague}" class="mb-2 list-decimal">
		<label class="custom-checkbox inline-flex items-center" :for="`${act}-step-${index}${isAddedStep?'.1':''}`">
			<div class=" bg-gray-900 hidden lg:flex border border-black-85 shadow w-4 h-4 justify-center items-center mr-0 lg:mr-2">
				<input
					:id="`${act}-step-${index}${isAddedStep?'.1':''}`"
					v-model="progress"
					class="hidden"
					type="checkbox"
					:value="`${act}-step-${index}${isAddedStep?'.1':''}`"
					@change="nextAct(stepsLength,index,act)"
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
			<div :class="{'opacity-25 line-through':progress.includes(`${act}-step-${index}${isAddedStep?'.1':''}`)}" v-html="$md.render(step)" />
		</label>
	</li>
</template>
<script>
import { mapState } from 'vuex';
export default {
	props: {
		step: {
			type: String,
			required: true
		},
		act: {
			type: String,
			required: true
		},
		index: {
			type: Number,
			required: true
		},
		stepsLength: {
			type: Number,
			required: true
		},
		isAddedStep: {
			type: Boolean,
			required: false,
			default: false
		}
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
			isNewLeague: state => state.newLeague,
			moveToAct: state => state.moveToAct
		})
	},
	methods: {
		nextAct (arrayLength, index, act) {
			if ((arrayLength - 1) === index && this.progress.includes(`${act}-step-${index}`)) {
				const nextAct = `act_${(parseInt(act.split('_').reverse()[0])) + 1}`;
				if (nextAct !== 'act_11') {
					this.$emit('next-act', nextAct);
				}
			}
		}
	}
};
</script>
