<template>
  <div>
		<div class="my-4 mx-2">
			<h2>Popular movies</h2>
			<HorizontalList :items="movies" />
		</div>
  </div>
</template>

<script>
import api from '~/api';
import HorizontalList from '~/components/HorizontalList.vue';

export default {
	components: {
		HorizontalList
	},
	data() {
		return {
			movies: []
		};
	},
	mounted() {
		api.movies.popular(1)
		.then((res) => {
			this.movies = res.data.results;
			console.log(res);
		});
	}
};
</script>

<style>
</style>
