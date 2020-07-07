<template>
  <div>
		<h1 class="p-1">
			Popular movies
		</h1>
		<HorizontalList :items="movies" />
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
		});
	}
};
</script>

<style>
</style>
