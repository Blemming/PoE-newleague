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
				<a class="m-2 text-sm text-shadow-black text-white hover:text-red-200 bg-red-900 opacity-75" href="#" @click.prevent="listeners.clearAll">Clear All</a>
			</li>
		</ul>
	</nav>
</template>
