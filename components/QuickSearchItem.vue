<template>
	<nuxt-link :to="`/${result.title ? 'movies':'tv-show'}/${slug(result)}`">
		<p
			class="cursor-pointer p-2 font-medium text-gray-600 hover:text-gray-900"
			@click="$emit('delete-search-value'); $emit('close-search-bar');"
		>
			{{ result.title || result.name }}
		</p>
	</nuxt-link>
</template>

<script>
import convertToSlug from '~/utils/convertToSlug';

export default {
	name: 'QuickSearchItem',
	props: {
		result: {
			type: Object,
			required: true
		}
	},
	methods: {
		slug(result) {
			if (result.id) {
				const slug = convertToSlug(result.title || result.name, result.id);
				return slug;
			}
		}
	}
};
</script>
