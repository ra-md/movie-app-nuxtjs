<template>
	<nuxt-link :to="`/${item.title ? 'movies' : 'tv-show'}/${slug(item)}`">
		<SkeletonLoading v-if="loading" height="h-56 md:h-64" />
		<div v-else class="h-56 md:h-auto">
			<img class="rounded-t-md h-full md:h-auto lg:min-h-72" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`">
		</div>
		<div class="py-1 px-2">
			<SkeletonLoading v-if="loading" height="h-6" rounded="rounded-b-md" />
			<p v-else class="whitespace-no-wrap">
				{{ index }}. {{ item.title || item.name }}
			</p>
		</div>
	</nuxt-link>
</template>

<script>
import SkeletonLoading from './SkeletonLoading';
import convertToSlug from '~/utils/convertToSlug';

export default {
	name: 'Item',
	components: {
		SkeletonLoading
	},
	props: {
		index: {
			type: Number,
			required: true
		},
		item: {
			type: Object,
			required: true
		}
	},
	computed: {
		loading() {
			if (this.item.id) {
				return false;
			} else {
				return true;
			}
		}
	},
	methods: {
		slug(item) {
			if (item.id) {
				const slug = convertToSlug(item.title || item.name, item.id);
				return slug;
			}
		}
	}
};
</script>
