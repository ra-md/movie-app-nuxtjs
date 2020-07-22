<template>
	<div>
		<div class="flex h-full w-full bg-white relative z-30 shadow-md md:shadow-none md:pt-4 md:h-10">
			<button class="md:hidden px-3" @click="closeSearchBar">
				<font-awesome-icon class="text-md" icon="times" />
			</button>
			<input
				v-model="searchValue"
				class="border-gray-200 w-full outline-none md:pl-2 md:pr-8 md:border-2 md:rounded-md md:absolute md:h-full"
				type="input"
				placeholder="Search..."
			>
			<button class="px-3 hover:text-blue-500 md:absolute md:h-full md:right-0" @click="seeMore">
				<font-awesome-icon class="text-md" icon="search" />
			</button>
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
							<button class="w-full btn bg-blue-500 text-white hover:bg-blue-400 focus:shadow-outline" @click="seeMore">
								More Results.
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
			loading: false
		};
	},
	watch: {
		searchValue() {
			this.loading = true;
			this.handleSearch();
		}
	},
	methods: {
		handleSearch: debounce(function() {
			this.search();
		}, 2000, true),
		async search() {
			if (this.searchValue.length !== 0) {
				const { data } = await api.search(1, this.searchValue);
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
			this.closeSearchBar();
			this.deleteSearchValue();
		}
	}
};
</script>
