<template>
	<div>
		<div class="flex overflow-auto">
			<div v-for="genre in genres" :key="genre.id" class="mr-4" @click="selectGenre(genre.id)">
				<Btn :special="true" :active="selectedGenres.includes(genre.id)" class="whitespace-no-wrap">
					{{ genre.name }}
				</Btn>
			</div>
		</div>
		<Loading v-if="loading" />
		<div v-else>
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
	name: 'Movie',
	components: {
		Btn,
		MovieORTvList
	},
	data() {
		return {
			results: [],
			genres: [],
			selectedGenres: [],
			page: 1,
			totalPages: 0,
			loading: true,
			noResults: false
		};
	},
	watch: {
		selectedGenres() {
			this.loading = true;
			this.page = 1;
			this.fetchApi('replace');
		},
		page() {
			this.fetchApi();
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

			const { data } = await api.discover('movie', query.with_genres ? query : {}, this.page);
			this.totalPages = data.total_pages;
			this.loading = false;

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
			const { data } = await api.getGenres('movie');
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
