<template>
	<client-only>
		<vue-horizontal-list :items="isLoading ? fakeItems : items" :options="options">
			<template v-slot:default="{ item }">
				<Skeleton :loading="isLoading" height="13em">
					<nuxt-link :to="`/${item.title ? 'movies':'tv-series'}/${slug(item)}`">
						<div class="item relative rounded-md shadow-md">
							<img class="rounded-md" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`">
							<p class="movie-title">
								{{ item.title || item.name }}
							</p>
						</div>
					</nuxt-link>
				</Skeleton>
			</template>
		</vue-horizontal-list>
	</client-only>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton';
import convertToSlug from '~/utils/convertToSlug';

export default {
	name: 'HorizontalList',
	components: {
		Skeleton
	},
	props: {
		items: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			options: {
				responsive: [
					{ end: 576, size: 3 },
					{ start: 576, end: 1024, size: 5 },
					{ size: 7 }
				]
			},
			fakeItems: [{}, {}, {}, {}, {}, {}, {}, {}]
		};
	},
	computed: {
		isLoading() {
			if (this.items.length === 0) {
				return true;
			} else {
				return false;
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

<style scoped>
	.item {
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.item::before {
		@apply rounded-md;
		content: '';
		position: absolute;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.7);
		opacity: 0;
		box-shadow: inset 0 0 2em 1em rgba(0,0,0,0.7);
		transition: opacity 0.5s;
	}

	.item:hover::before {
		opacity: 1;
		backdrop-filter: blur(5px);
	}

	.movie-title {
		text-align: center;
		top: 50%;
		transform: translateY(-50%);
		position: absolute;
		width: 100%;
		color: white;
		font-weight: bold;
		opacity: 0;
		transition: opacity 0.5s;
		padding: 5px;
	}

	.item:hover .movie-title {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.movie-title {
			font-size: 12px;
		}
	}
</style>
