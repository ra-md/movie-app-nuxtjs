<template>
	<div>
		<div class="flex text-black h-full w-full bg-white relative z-30 shadow-md md:shadow-none md:pt-4">
			<button class="md:hidden px-3" @click="closeSearchBar">
				<font-awesome-icon class="text-md" icon="times" />
			</button>
			<input
				class="border-gray-200 w-full px-2 outline-none focus:border-primary md:w-32 md:border-2 md:h-10 md:rounded-md"
				type="input"
				placeholder="Search..."
				:value="searchValue"
				@input="e => searchValue = e.target.value"
			>
			<div class="relative">
				<button
					type="button"
					class="inline-flex focus:outline-none hover:text-primary items-center justify-center h-full font-medium rounded-md text-sm capitalize md:pl-3"
					aria-haspopup="true"
					aria-expanded="true"
					@click="toggleDropdown"
				>
					{{ mediaType }}
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
				<div v-show="dropdown" class="origin-top-right absolute right-0 mt-2 mr-2 rounded-md shadow-lg w-24 md:mr-0">
					<div class="rounded-md bg-white shadow-xs">
						<div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							<button
								class="w-full block border-b border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
								@click="changeMediaType('movie'); toggleDropdown()"
							>
								Movie
							</button>
							<button
								class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
								@click="changeMediaType('tv show'); toggleDropdown()"
							>
								Tv Show
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
			<div v-if="searchValue.length !== 0" class="max-h-screen w-full overflow-auto z-20 absolute bg-white top-0">
				<div v-if="loading">
					<Loading />
				</div>
				<div v-else :class="{'mt-12': results.length !== 0}">
					<div v-if="results.length === 0" class="pt-16 text-center h-screen">
						<h2>No results.</h2>
					</div>
					<div v-else>
						<div v-for="result in results" :key="result.id" class="first:pt-2 border-b">
							<nuxt-link :to="`/${result.title ? 'movies':'tv-series'}/${slug(result)}`">
								<p
									class="cursor-pointer p-2 font-medium text-gray-600 hover:text-gray-900"
									@click="deleteSearchValue(); closeSearchBar();"
								>
									{{ result.title || result.name }}
								</p>
							</nuxt-link>
						</div>
						<div class="m-2">
							<button class="w-full btn bg-primary text-white hover:shadow-outline" @click="seeMore">
								More Results
							</button>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
import Loading from './Loading';
import api from '~/api';
import debounce from '~/utils/debounce';
import convertToSlug from '~/utils/convertToSlug';

export default {
	name: 'SearchBar',
	components: {
		Loading
	},
	data() {
		return {
			searchValue: '',
			results: [],
			loading: false,
			mediaType: 'movie',
			dropdown: false
		};
	},
	watch: {
		searchValue() {
			this.search();
		},
		mediaType() {
			this.search();
		}
	},
	methods: {
		search() {
			this.loading = true;
			this.searchDebounce();
		},
		searchDebounce: debounce(function() {
			this.fetchSearch();
		}, 2000, true),
		async fetchSearch() {
			if (this.searchValue.length !== 0) {
				const { data } = await api.search(this.mediaType, 1, this.searchValue);
				this.results = data.results;
				this.loading = false;
			} else {
				this.results = [];
			}
		},
		slug(result) {
			if (result.id) {
				const slug = convertToSlug(result.title || result.name, result.id);
				return slug;
			}
		},
		deleteSearchValue() {
			this.searchValue = '';
		},
		closeSearchBar() {
			this.$emit('close-search-bar');
		},
		seeMore() {
			this.$router.push({ path: '/search', query: { q: this.searchValue } });
			this.changeMediaType('movie');
			this.closeSearchBar();
			this.deleteSearchValue();
		},
		toggleDropdown() {
			this.dropdown = !this.dropdown;
		},
		changeMediaType(mediaType) {
			this.mediaType = mediaType;
		}
	}
};
</script>
