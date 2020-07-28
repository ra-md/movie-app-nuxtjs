<template>
	<div>
		<nuxt-link :to="`/${item.title ? 'movies':'tv-show'}/${slug(item)}`">
			<div :class="{'bg-white lg:w-124': loading}" class="relative shadow-md rounded-md flex hover:shadow-outline justify-center items-center p-2 cursor-pointer">
				<div v-if="!loading" class="absolute h-full w-full bg-black bg-opacity-75 z-10 rounded-md" />
				<img
					v-if="item.backdrop_path && !loading"
					class="rounded-md h-full w-full object-cover shadow-md absolute"
					loading="lazy"
					:src="`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`"
				>
				<div class="relative z-20 flex max-h-40 w-full overflow-hidden">
					<SkeletonLoading v-if="loading" height="h-32" width="w-40" rounded="rounded-md" />
					<img v-else class="rounded-md h-40" loading="lazy" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`">
					<div class="ml-4 w-3/5 md:w-full">
						<SkeletonLoading v-if="loading" height="h-6" width="w-64" class="mb-4" />
						<h1 v-else class="text-white">
							{{ item.title || item.name }}
						</h1>
						<SkeletonLoading v-if="loading" height="h-3" width="w-48" class="mb-2" />
						<p v-else class="text-gray-200">
							{{ sliceOverview }}
						</p>
					</div>
				</div>
			</div>
		</nuxt-link>
	</div>
</template>

<script>
import convertToSlug from '~/utils/convertToSlug';
import SkeletonLoading from '~/components/SkeletonLoading';

export default {
	name: 'SearchItem',
	components: {
		SkeletonLoading
	},
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	computed: {
		sliceOverview() {
			if (this.item.id) {
				const slicedText = this.item.overview.split(' ').slice(0, 25).join(' ');
				return `${slicedText}${slicedText.split(' ').length === 25 ? '...' : ''}`;
			} else {
				return '';
			}
		},
		loading() {
			if (this.item.id) {
				return false;
			} else {
				return true;
			}
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
