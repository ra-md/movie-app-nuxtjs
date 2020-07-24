<template>
	<nuxt-link :to="`/${item.title ? 'movies':'tv-show'}/${slug(item)}`">
		<div class="relative rounded-md flex hover:shadow-outline justify-center items-center p-2 cursor-pointer">
			<div class="absolute h-full w-full bg-black bg-opacity-75 z-10 rounded-md" />
			<img
				v-if="item.backdrop_path"
				class="rounded-md h-full w-full object-cover shadow-md absolute"
				loading="lazy"
				:src="`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`"
			>
			<div class="relative z-20 flex max-height overflow-hidden">
				<img class="rounded-md h-40" loading="lazy" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`">
				<div class="ml-4">
					<h1 class="text-white">
						{{ item.title || item.name }}
					</h1>
					<p class="text-gray-200">
						{{ sliceOverview }}
					</p>
				</div>
			</div>
		</div>
	</nuxt-link>
</template>

<script>
import convertToSlug from '~/utils/convertToSlug';

export default {
	name: 'SearchItem',
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	computed: {
		sliceOverview() {
			const slicedText = this.item.overview.split(' ').slice(0, 25).join(' ');
			return `${slicedText}${slicedText.split(' ').length === 25 ? '...' : ''}`;
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

<style>
.max-height {
	max-height: 10em;
}
</style>
