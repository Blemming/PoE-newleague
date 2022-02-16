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
			<!-- <li class="px-6">
				<div class="flex justify-around">
					<label class="text-gray-300" for="export">Export</label>
					<button class="ml-auto text-green-500 text-shadow-black hover:text-green-600 font-serif text-sm" @click.prevent="listeners.copyExport">
						{{ props.copyText }}
					</button>
				</div>
				<input
					id="export"
					disabled
					class="max-w-full bg-gray-poe-dark text-yellow-poe-light px-1 opacity-50"
					type="text"
					:value="parent.$store.getters.encodedGemChoices"
					name="export"
				>
			</li> -->
			<li>
				<button class="opacity-75 text-white bg-gem-poe hover:opacity-100" href="#" @click.prevent="listeners.toggleModal">
					Pick gems
				</button>
			</li>
			<li>
				<button class="bg-poe-y text-yellow-poe-light font-serif text-shadow-black opacity-75 hover:opacity-100" href="#" @click.prevent="listeners.toggleBuildsModal">
					Builds
				</button>
			</li>
			<li class="px-6">
				<label class="mx-auto custom-checkbox flex text-gray-300 text-center font-serif text-sm">
					<div class="bg-gray-900 border border-black-85 shadow w-4 h-4 flex justify-center items-center mr-1">
						<input :value="!parent.$store.state.hideTips" class="hidden" checked="true" type="checkbox" @input="listeners.hideTips">
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
						Show Tips
					</span>
				</label>
			</li>
			<li class="px-6">
				<label class="mx-auto custom-checkbox flex text-gray-300 text-center font-serif text-sm">
					<div class="bg-gray-900 border border-black-85 shadow w-4 h-4 flex justify-center items-center mr-1">
						<input :value="parent.$store.state.newLeague" class="hidden" checked="true" type="checkbox" @input="listeners.toggleNewLeague">
						<svg class="hidden w-4 h-4 text-yellow-poe-dark pointer-events-none my-auto" viewBox="0 0 172 172">
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
				<button style="opacity:0.9;" class=" hover:text-white text-red-200 bg-red-900 hover:bg-red-800" href="#" @click.prevent="listeners.clearAll">
					Clear All
				</button>
			</li>
		</ul>
	</nav>
</template>
<style lang="postcss">
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
nav ul li > button {
	@apply my-2;
	@apply mx-auto;
	@apply block;
	@apply py-1;
	@apply font-bold;
	min-width: 120px;
	text-shadow: 1px 1px 1px #000;
}
nav ul li:hover a {
	@apply text-yellow-poe-light;
}
nav ul li a[aria-disabled="true"] {
	@apply text-gray-600;
	@apply cursor-default;
}
</style>
