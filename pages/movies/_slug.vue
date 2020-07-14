<template>
	<div>
		<div v-if="!movie.title">
			<h1>Loading...</h1>
		</div>
		<div v-else class="">
			<div class="max-h-screen py-4 flex">
				<div class="w-2/5">
					<img class="h-full rounded-md" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
				</div>
				<div class="bg-white w-3/5 shadow-md p-4 rounded-md">
					<iframe v-if="trailer !== undefined" class="rounded-md h-3/5 w-full mb-4 shadow-md" :src="`https://www.youtube.com/embed/${trailer.key}`" />
					<div class="mb-1">
						<h1>
							{{ movie.title }} ({{ year }})
						</h1>
					</div>
					<div class="mb-1">
						<font-awesome-icon icon="film" />
						<span v-for="(genre, index) in movie.genres" :key="genre.id" class="pr-2 text-lg">
							{{ genre.name }}{{ index !== movie.genres.length - 1 ? ',' : '' }}
						</span>
					</div>
					<div class="mb-1">
						<font-awesome-icon icon="hourglass" />
						<span class="ml-1 text-lg">
							{{ movie.runtime }} minutes
						</span>
					</div>
					<div class="mb-1">
						<font-awesome-icon class="text-yellow-400" icon="star" />
						<span class="text-lg">{{ movie.vote_average }}<span class="font-thin">/10</span></span>
					</div>
					<div class="h-20 shadow-inner overflow-auto">
						<p class="p-2">
							{{ movie.overview }}
						</p>
					</div>
				</div>
			</div>
			<client-only v-if="credits.length !== 0">
				<h1>Cast</h1>
				<vue-horizontal-list :items="filteredCast" :options="options">
					<template v-slot:default="{ item }">
						<div class="rounded-md bg-white shadow-md overflow-hidden">
							<img class="rounded-t-md" :src="`https://image.tmdb.org/t/p/w500/${item.profile_path}`">
							<div class="item relative px-2 whitespace-no-wrap">
								<p class="font-medium">
									{{ item.name }}
								</p>
								<p>
									{{ item.character }}
								</p>
							</div>
						</div>
					</template>
				</vue-horizontal-list>
				<h1>Similar Movies</h1>
				<HorizontalList :items="similarMovies" />
			</client-only>
		</div>
	</div>
</template>

<script>
import api from '~/api';
import HorizontalList from '~/components/HorizontalList';

export default {
	name: 'MovieDetails',
	components: {
		HorizontalList
	},
	data() {
		return {
			movie: {},
			credits: [],
			trailer: {},
			similarMovies: [],
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
			console.log(res.data.results[0]);
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

<style scoped>
	.item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(90deg, transparent 70%, white);
	}
</style>
