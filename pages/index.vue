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
				<MovieOrTvSection
					name="Movie"
					:popular="popularMovies"
					:trending="trendingMovies"
					:top-rated="topRatedMovies"
					class="bg-gray-900 text-white my-8"
				/>
				<MovieOrTvSection
					name="Tv"
					:popular="popularTv"
					:trending="trendingTv"
					:top-rated="topRatedTv"
					class="bg-white mb-8"
				/>
			</div>
		</div>
  </div>
</template>

<script>
import api from '~/api';
import HorizontalList from '~/components/HorizontalList';
import Carousel from '~/components/Carousel';
import Loading from '~/components/Loading';
import MovieOrTvSection from '~/components/MovieOrTvSection';

export default {
	components: {
		HorizontalList,
		Carousel,
		Loading,
		MovieOrTvSection
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
