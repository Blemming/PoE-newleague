<template>
	<div class="flex flex-col">
		<div>
			<input id="" v-model="data" type="text" name="code">
		</div>
		<div>
			<button @click.prevent="decode()">
				Decode
			</button>
		</div>
		<pre><code>{{ decoded }}</code></pre>
	</div>
</template>
<script>
export default {
	data () {
		return {
			decoded: 'not decoded',
			data: ''
		};
	},
	computed: {
		encodeProgess () {
			return btoa(JSON.stringify(this.$store.getters.getChosenGems));
		}
	},
	methods: {
		decode () {
			const gemList = JSON.parse(atob(this.data));
			const foundGems = gemList.map(gem => this.$store.state.gems.find(g => g.id === gem)).filter(Boolean);
			const result = foundGems.reduce((acc, gem) => {
				if (!acc[gem.quest_rewards[0].quest]) {
					acc[gem.quest_rewards[0].quest] = [];
				}
				acc[gem.quest_rewards[0].quest].push({
					icon: gem.icon,
					id: gem.id,
					name: gem.name,
					primary_attr: gem.primary_attr,
					required_level: gem.required_level
				});
				return acc;
			}, {});
			this.decoded = result;
		}
	}
};
</script>
