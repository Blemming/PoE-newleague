<template>
	<section class=" text-yellow-poe-dark text-center flex flex-col pb-8">
		<h1 v-if="error.statusCode === 404" class="mt-10 text-4xl font-serif text-shadow-black-2">
			Page not found
		</h1>
		<h1 v-else class="mt-10 text-4xl font-serif text-shadow-black-2">
			An error occurred
		</h1>
		<div class="w-full flex flex-col flex-grow justify-center items-center">
			<nuxt-link class="btn hover:text-white text-red-200 bg-red-900 hover:bg-red-800" to="/">
				Go back to home page
			</nuxt-link>
			<button class="btn hover:text-white text-red-200 bg-red-900 hover:bg-red-800" @click.prevent="$router.go(-1)">
				Go back to previous page
			</button>
		</div>
	</section>
</template>

<script>
export default {
	layout: 'default',
	props: {
		error: {
			type: Object,
			required: true,
			default: () => ({
				statusCode: 500,
				message: 'Yikes'
			})
		}
	},
	head () {
		return {
			title: 'RIP'
		};
	}
};
</script>
