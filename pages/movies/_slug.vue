<template>
	<div>
		<Detail
			type="Movie"
			:detail="movie"
			:cast="cast"
			:trailer="trailer"
			:similar="similarMovies"
		/>
	</div>
</template>

<script>
import api from '~/api';
import Detail from '~/components/Detail';

export default {
	name: 'MovieDetail',
	components: {
		Detail
	},
	data() {
		return {
			movie: {},
			cast: [],
			trailer: {},
			similarMovies: []
		};
	},
	created() {
		const slug = this.$route.params.slug.split('-');
		const movieId = slug[slug.length - 1];

		api.movie.details(movieId)
		.then((res) => {
			this.movie = res.data;
		});

		api.movie.credits(movieId)
		.then((res) => {
			this.cast = res.data.cast;
		});

		api.movie.trailer(movieId)
		.then((res) => {
			this.trailer = res.data.results[0];
		});

		api.movie.similar(movieId)
		.then((res) => {
			this.similarMovies = res.data.results;
		});
	},
	head() {
		return {
			titleTemplate: this.movie.title
		};
	}
};
</script>
