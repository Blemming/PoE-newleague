<style>
section {

}
nav ul{
	@apply list-none;
	@apply pl-0;
}
nav ul li a{
	@apply block;
	@apply text-xl;
	@apply text-yellow-poe-dark;
	@apply px-6;
	@apply py-2;
}
nav ul li:hover a{
	@apply text-yellow-poe-light;
}
nav ul li a[aria-disabled="true"] {
	@apply text-gray-600;
	@apply cursor-default;
}
</style>
<template functional>
	<nav class="font-serif flex flex-col justify-between w-full">
		<ul class="w-full">
			<li v-for="act in props.acts" :key="act.id" class="text-shadow-black-2">
				<a href="#" @click.prevent="listeners.moveTo(act.id)">
					{{ act.description }}
				</a>
			</li>
		</ul>
		<ul class="w-full">
			<li>
				<a
					style="opacity:0.9;"
					:class="{
						'bg-yellow-900 hover:bg-yellow-800':parent.$store.state.hideTips,
						'bg-yellow-700 hover:bg-yellow-600':!parent.$store.state.hideTips
					}"
					class="m-2 px-2 text-center text-sm text-shadow-black hover:text-white text-yellow-200"
					href="#"
					@click.prevent="listeners.hideTips"
				>
					<span v-if="parent.$store.state.hideTips">Hide</span>
					<span v-else>Show</span>
					Tips</a>
			</li>
			<li>
				<a style="opacity:0.9;" class="m-2 text-sm text-shadow-black hover:text-white text-red-200 bg-red-900 hover:bg-red-800" href="#" @click.prevent="listeners.clearAll">Clear All</a>
			</li>
		</ul>
	</nav>
</template>
