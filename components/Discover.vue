<template>
	<div>
		<div class="flex overflow-auto py-4 px-2 md:my-4">
			<div v-for="genre in genres" :key="genre.id" class="mr-4" @click="selectGenre(genre.id)">
				<Btn :special="true" :active="selectedGenres.includes(genre.id)" class="whitespace-no-wrap">
					{{ genre.name }}
				</Btn>
			</div>
		</div>
		<div>
			<MovieORTvList
				:items="results"
				:page="page"
				:total-pages="totalPages"
				:no-results="noResults"
				@intersec="intersected"
			/>
		</div>
	</div>
</template>

<script>
import MovieORTvList from '~/components/MovieORTvList';
import Btn from '~/components/Btn';
import api from '~/api';

export default {
	name: 'Discover',
	components: {
		Btn,
		MovieORTvList
	},
	props: {
		mediaType: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			results: [],
			genres: [],
			selectedGenres: [],
			page: 1,
			totalPages: 0,
			noResults: false
		};
	},
	watch: {
		selectedGenres() {
			this.results = [];
			this.page = 1;
			this.fetchApi('replace');
		},
		page() {
			if (this.results.length !== 0) {
				this.fetchApi();
			}
		}
	},
	created() {
		this.getGenres();
		this.fetchApi();
	},
	methods: {
		async fetchApi(type = 'push') {
			const query = {
				with_genres: this.selectedGenres.join(', ')
			};

			const { data } = await api.discover(this.mediaType, query.with_genres ? query : {}, this.page);
			this.totalPages = data.total_pages;

			if (data.total_results === 0) {
				this.noResults = true;
			} else {
				this.noResults = false;
			}

			if (type === 'replace') {
				this.results = data.results;
			} else {
				this.results.push(...data.results);
			}
		},
		async getGenres() {
			const { data } = await api.getGenres(this.mediaType);
			this.genres = data.genres;
		},
		selectGenre(selectedGenreId) {
			if (this.selectedGenres.includes(selectedGenreId)) {
				this.selectedGenres = this.selectedGenres.filter(id => id !== selectedGenreId);
			} else {
				this.selectedGenres.push(selectedGenreId);
			}
		},
		intersected() {
			this.page++;
		}
	}
};
</script>
