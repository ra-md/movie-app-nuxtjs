<template>
  <div>
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
</template>

<script>
import api from '~/api';
import HorizontalList from '~/components/HorizontalList.vue';
import Carousel from '~/components/Carousel.vue';

export default {
	components: {
		HorizontalList,
		Carousel
	},
	data() {
		return {
			movies: [],
			tv: []
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
	}
};
</script>

<style>
</style>
