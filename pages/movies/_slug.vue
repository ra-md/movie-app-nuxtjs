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
	async asyncData(context) {
		try {
			const slug = context.params.slug.split('-');
			const movieId = slug[slug.length - 1];

			const [credits, details, trailer, similar] = await Promise.all([
				api.credits('movie', movieId),
				api.details('movie', movieId),
				api.trailer('movie', movieId),
				api.similar('movie', movieId)
			]);

			return {
				cast: credits.data.cast,
				movie: details.data,
				trailer: trailer.data.results[0],
				similarMovies: similar.data.results
			};
		} catch (error) {
			context.error({ statusCode: 404, message: 'Page Not Found' });
		}
	},
	head() {
		return {
			titleTemplate: this.movie.title
		};
	}
};
</script>
