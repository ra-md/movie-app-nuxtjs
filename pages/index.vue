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
				<h2 class="md:p-1 pt-4 pl-4">
					Popular movies
				</h2>
				<HorizontalList :items="movies" />
			</section>
			<section>
				<h2 class="md:p-1 pt-4 pl-4">
					Popular TV series
				</h2>
				<HorizontalList :items="tv" />
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
			movies: [],
			tv: [],
			loading: true
		};
	},
	created() {
		api.movie.popular(1)
		.then((res) => {
			this.movies = res.data.results;
		});

		api.tv.popular(1)
		.then((res) => {
			this.tv = res.data.results;
		});
	},
	mounted() {
		this.loading = false;
	}
};
</script>

<style>
</style>
