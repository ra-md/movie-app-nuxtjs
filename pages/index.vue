<template>
	<div>
		<div v-if="loading">
			<Loading />
		</div>
		<div v-else>
			<section>
				<Carousel />
			</section>
			<section>
				<h2 class="title">
					Popular movies
				</h2>
				<HorizontalList :items="popularMovies" />
			</section>
			<section>
				<h2 class="title">
					Popular TV Show
				</h2>
				<HorizontalList :items="popularTv" />
			</section>
			<section>
				<h2 class="title">
					Trending Movies
				</h2>
				<HorizontalList :items="trendingMovies" />
			</section>
			<section>
				<h2 class="title">
					Trending Tv Show
				</h2>
				<HorizontalList :items="trendingTv" />
			</section>
			<section>
				<h2 class="title">
					Top Rated Movies
				</h2>
				<HorizontalList :items="topRatedMovies" />
			</section>
			<section>
				<h2 class="title">
					Top Rated Tv Show
				</h2>
				<HorizontalList :items="topRatedTv" />
			</section>
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
