<template>
	<nuxt-link :to="`/${item.title ? 'movies' : 'tv-show'}/${slug(item)}`">
		<SkeletonLoading v-if="loading" height="h-56 md:h-64" />
		<div v-else class="h-56 md:h-auto">
			<img
				loading="lazy"
				class="rounded-t-md w-full object-cover h-full md:h-auto lg:min-h-76"
				:src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
			>
		</div>
		<div class="py-1 px-2 relative">
			<SkeletonLoading v-if="loading" height="h-6" rounded="rounded-b-md" />
			<div v-else class="white-space-shadow">
				<p class="whitespace-no-wrap">
					{{ index }}. {{ item.title || item.name }}
				</p>
			</div>
		</div>
	</nuxt-link>
</template>

<script>
import SkeletonLoading from './SkeletonLoading';
import convertToSlug from '~/utils/convertToSlug';

export default {
	name: 'MovieORTvItem',
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
