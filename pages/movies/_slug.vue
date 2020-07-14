<template>
	<div>
		<div v-if="!movie.title">
			<h1>Loading...</h1>
		</div>
		<div v-else class="max-h-screen py-4 flex">
			<div class="w-2/5">
				<img class="h-full rounded-md" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
			</div>
			<div class="bg-white w-3/5 shadow-md p-4 rounded-md">
				<iframe class="rounded-md h-3/5 w-full mb-4 shadow-md" :src="`https://www.youtube.com/embed/${trailer.key}`" />
				<div class="mb-2">
					<h1>
						{{ movie.title }} ({{ year }})
					</h1>
				</div>
				<div class="mb-2">
					<font-awesome-icon icon="film" />
					<span v-for="(genre, index) in movie.genres" :key="genre.id" class="pr-2">
						{{ genre.name }}{{ index !== movie.genres.length - 1 ? ',' : '' }}
					</span>
				</div>
				<div class="mb-2">
					<font-awesome-icon icon="hourglass" />
					<span class="ml-1">
						{{ movie.runtime }} minutes
					</span>
				</div>
				<div class="mb-2">
					<font-awesome-icon class="text-yellow-400" icon="star" />
					<span>{{ movie.vote_average }}<span class="font-thin">/10</span></span>
				</div>
				<div class="h-20 shadow-inner overflow-auto">
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
			movie: {},
			credits: [],
			trailer: {},
			options: {
				responsive: [
					{ end: 576, size: 3 },
					{ start: 576, end: 1024, size: 5 },
					{ size: 7 }
				]
			}
		};
	},
	computed: {
		year() {
			const year = this.movie.release_date.split('-');
			return year[0];
		},
		filteredCast() {
			return this.credits.filter((cast) => {
				return cast.profile_path !== null;
			});
		}
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
			this.credits = res.data.cast;
		});

		api.movie.trailer(movieId)
		.then((res) => {
			this.trailer = res.data.results[0];
		});
	},
	head() {
		return {
			titleTemplate: this.movie.title
		};
	}
};
</script>
