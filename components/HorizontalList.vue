<template>
	<client-only>
		<vue-horizontal-list :items="isLoading ? fakeItems : items" :options="options">
			<template v-slot:default="{ item }">
				<Skeleton :loading="isLoading" height="13em">
					<div class="bg-white rounded-md shadow-md cursor-pointer transform transition-scale duration-200 hover:scale-105 ease-in-out">
						<img class="rounded-t-md aspect" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`">
						<div class="movie-title">
							<p class="whitespace-no-wrap overflow-hidden px-1">
								{{ item.title || item.name }}
							</p>
						</div>
					</div>
				</Skeleton>
			</template>
		</vue-horizontal-list>
	</client-only>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton';

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
					{ start: 576, end: 992, size: 5 },
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
	}
};
</script>

<style>
	.movie-title::before {
		content: '';
		position: absolute;
		z-index: 100;
		height: 1.5em;
		width: 100%;
		background: linear-gradient(90deg, transparent 50%, white);
		border-radius: 0.375rem 0;
	}

	@media (max-width: 768px) {
		.vue-horizontal-list .vhl-container {
			margin-right: 0!important;
			margin-left: 0!important;
		}
	}
</style>
