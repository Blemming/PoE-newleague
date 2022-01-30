<style>
section {
}
nav ul {
	@apply list-none;
	@apply pl-0;
}
nav ul li a {
	@apply block;
	@apply text-xl;
	@apply text-yellow-poe-dark;
	@apply px-6;
	@apply py-2;
}
nav ul li:hover a {
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
				<label class="custom-checkbox flex justify-center text-gray-300 text-center font-serif text-sm">
					<div class="bg-gray-900 border border-black-85 shadow w-4 h-4 flex justify-center items-center mr-1">
						<input :value="parent.$store.state.newLeague" class="hidden" checked="true" type="checkbox" @input="listeners.toggleNewLeague">
						<svg class="hidden w-4 h-4 text-yellow-poe-dark pointer-events-none" viewBox="0 0 172 172">
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
					<span>
						New league
					</span>
				</label>
			</li>
			<li>
				<a style="opacity:0.9;" class="m-2 text-sm text-shadow-black hover:text-white text-red-200 bg-red-900 hover:bg-red-800" href="#" @click.prevent="listeners.clearAll">Clear All</a>
			</li>
		</ul>
	</nav>
</template>
