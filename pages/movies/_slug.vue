<template>
	<div>
		<div v-if="!movie.title">
			<h1>Loading...</h1>
		</div>
		<div v-else class="flex justify-between">
			<div class="my-4 flex items-center flex-col">
				<img class="rounded-md w-56 mb-8 shadow-md" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
				<div class="p-4 bg-white rounded-md shadow-md">
					<div class="mb-1">
						<h1>{{ movie.title }} ({{ getYear }})</h1>
					</div>
					<div class="mb-1">
						<font-awesome-icon icon="film" />
						<span v-for="(genre, index) in movie.genres" :key="genre.id" class="pr-2">
							{{ genre.name }}{{ index !== movie.genres.length - 1 ? ',' : '' }}
						</span>
					</div>
					<div class="mb-1">
						<font-awesome-icon icon="hourglass" />
						<span class="ml-1">
							{{ movie.runtime }} minutes
						</span>
					</div>
					<div class="mb-4">
						<font-awesome-icon class="text-yellow-400" icon="star" />
						<span>{{ movie.vote_average }}<span class="font-thin">/10</span></span>
					</div>
					<p>
						{{ movie.overview }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from '~/api';

export default {
	name: 'MovieDetails',
	data() {
		return {
			movie: {}
		};
	},
	computed: {
		getYear() {
			const year = this.movie.release_date.split('-');
			return year[0];
		}
	},
	created() {
		const slug = this.$route.params.slug.split('-');
		const movieId = slug[slug.length - 1];

		api.movie.details(movieId)
		.then((res) => {
			this.movie = res.data;
		});
	},
	head() {
		return {
			titleTemplate: this.movie.title
		};
	}
};
</script>
