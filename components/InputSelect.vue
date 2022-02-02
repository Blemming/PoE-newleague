<template functional>
	<div :class="data.staticClass" class="flex relative">
		<label style="height:43px;" class="whitespace-pre opacity-0 text-shadow-black font-serif text-gray-300 px-6" v-text="props.default" />
		<div class="absolute inset-x-0">
			<select
				:id="`${props.label}-select`"
				:value="props.value"
				:class="{'text-gray-900':props.value === '' || parseInt(props.value) === -1,'text-yellow-poe-dark text-shadow-black':props.value !=='' && parseInt(props.value) !== -1}"
				class="w-full appearance-none font-serif bg-gray-900 pt-3 px-2  border border-black-85 focus:border-yellow-poe-dark"
				name="hideoutType"
				@input="listeners.input($event.target.value)"
			>
				<option v-for="(option,index) in props.options" :key="index" :value="option.value !== undefined?option.value : index" class="text-shadow-black font-serif text-gray-300">
					{{ option.description || option }}
				</option>
			</select>
			<label ref="label" :for="`${props.label}-select`" :class="{'moved':props.value !== '' && parseInt(props.value) !== -1}" class="custom-label pointer-events-none absolute text-shadow-black font-serif text-gray-300">{{ props.default }}</label>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-600">
				<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
			</div>
		</div>
	</div>
</template>
<style lang="postcss">
/* Custom Utilities */
.custom-label {
	transition: all 0.2s ease-out;
	top: 0.7rem;
	left: 0.5rem;
}
.moved {
	font-size: 0.7rem;
	transition: all 0.2s ease-out;
	top: 0.1rem;
}
</style>
