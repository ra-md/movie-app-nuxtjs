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
				<div class="bg-gray-300 px-1 py-3 md:px-4 md:py-1 rounded-lg shadow-lg my-8">
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
				<div class="bg-gray-300 px-1 py-3 md:px-4 md:py-1 rounded-lg shadow-lg mb-8">
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
	async asyncData() {
		function fetchApi(mediaType, apiCallType, isTrending = false) {
			return api[apiCallType](mediaType, isTrending ? 'week' : 1);
		}

		const [popularMovies, popularTv, trendingMovies, trendingTv, topRatedMovies, topRatedTv] = await Promise.all([
			fetchApi('movie', 'popular'),
			fetchApi('tv', 'popular'),
			fetchApi('movie', 'trending', true),
			fetchApi('tv', 'trending', true),
			fetchApi('movie', 'topRated'),
			fetchApi('tv', 'topRated')
		]);

		return {
			popularMovies: popularMovies.data.results,
			trendingMovies: trendingMovies.data.results,
			topRatedMovies: topRatedMovies.data.results,
			popularTv: popularTv.data.results,
			trendingTv: trendingTv.data.results,
			topRatedTv: topRatedTv.data.results
		};
	},
	data() {
		return {
			loading: true
		};
	},
	mounted() {
		this.loading = false;
	}
};
</script>
