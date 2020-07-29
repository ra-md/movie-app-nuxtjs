<template>
	<div>
		<div v-if="loading">
			<Loading />
		</div>
		<div v-else>
			<section>
				<Carousel />
			</section>
			<div class="mx-2 md:mx-0">
				<div class="bg-gray-900 px-1 py-3 md:px-4 md:py-1 rounded-lg text-white shadow-lg my-8">
					<h1 class="text-center">
						Movie
					</h1>
					<section>
						<h2 class="title">
							Popular
						</h2>
						<HorizontalList :items="popularMovies" />
					</section>
					<section>
						<h2 class="title">
							Trending
						</h2>
						<HorizontalList :items="trendingMovies" />
					</section>
					<section>
						<h2 class="title">
							Top Rated
						</h2>
						<HorizontalList :items="topRatedMovies" />
					</section>
				</div>
				<div class="bg-white px-1 py-3 md:px-4 md:py-1 rounded-lg shadow-lg mb-8">
					<h1 class="text-center">
						Tv Show
					</h1>
					<section>
						<h2 class="title">
							Popular
						</h2>
						<HorizontalList :items="popularTv" />
					</section>
					<section>
						<h2 class="title">
							Trending
						</h2>
						<HorizontalList :items="trendingTv" />
					</section>
					<section>
						<h2 class="title">
							Top Rated
						</h2>
						<HorizontalList :items="topRatedTv" />
					</section>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import api from '~/api';
import HorizontalList from '~/components/HorizontalList';
import Carousel from '~/components/Carousel';
import Loading from '~/components/Loading';

export default {
	components: {
		HorizontalList,
		Carousel,
		Loading
	},
	data() {
		return {
			popularMovies: [],
			popularTv: [],
			trendingMovies: [],
			trendingTv: [],
			topRatedMovies: [],
			topRatedTv: [],
			loading: true
		};
	},
	created() {
		Promise.all([
				this.fetchApi('movie', 'popular'),
				this.fetchApi('tv', 'popular'),
				this.fetchApi('movie', 'trending', true),
				this.fetchApi('tv', 'trending', true),
				this.fetchApi('movie', 'topRated'),
				this.fetchApi('tv', 'topRated')
			])
			.then(([popularMovies, popularTv, trendingMovies, trendingTv, topRatedMovies, topRatedTv]) => {
				this.popularMovies = popularMovies.data.results;
				this.popularTv = popularTv.data.results;
				this.trendingMovies = trendingMovies.data.results;
				this.trendingTv = trendingTv.data.results;
				this.topRatedMovies = topRatedMovies.data.results;
				this.topRatedTv = topRatedTv.data.results;
			});
	},
	mounted() {
		this.loading = false;
	},
	methods: {
		fetchApi(mediaType, apiCallType, isTrending = false) {
			return api[apiCallType](mediaType, isTrending ? 'week' : 1);
		}
	}
};
</script>

<style scoped>
	.title {
		@apply pt-4 pl-4;
	}

	@screen md {
		.title {
			@apply p-1;
		}
	}
</style>
