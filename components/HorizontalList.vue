<template>
	<client-only>
		<vue-horizontal-list :items="isLoading ? fakeItems : items" :options="options">
			<template v-slot:default="{ item }">
				<LoadingTEST v-if="isLoading" height="h-32 md:h-48" rounded="rounded-md" />
				<nuxt-link v-else :to="`/${item.title ? 'movies':'tv-show'}/${slug(item)}`">
					<div class="item relative rounded-md shadow-md">
						<img class="rounded-md" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`">
						<p class="movie-title">
							{{ item.title || item.name }}
						</p>
					</div>
				</nuxt-link>
			</template>
		</vue-horizontal-list>
	</client-only>
</template>

<script>
import LoadingTEST from './LoadingTEST';
import convertToSlug from '~/utils/convertToSlug';

export default {
	name: 'HorizontalList',
	components: {
		LoadingTEST
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
