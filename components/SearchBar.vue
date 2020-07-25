<template>
	<div>
		<div class="relative z-30 h-full w-full bg-white shadow-md md:shadow-none md:pt-4">
			<div class="flex text-black h-full w-full relative bg-white border-gray-300 md:rounded-md md:border-2">
				<button class="md:hidden px-3" @click="closeSearchBar">
					<font-awesome-icon class="text-md" icon="times" />
				</button>
				<input
					class="w-full px-2 outline-none focus:border-primary md:w-32 md:h-10 md:rounded-md"
					type="input"
					placeholder="Search..."
					:value="searchValue"
					@input="e => searchValue = e.target.value"
				>
				<Dropdown ref="dropdown" :media-type="mediaType">
					<div @click="changeMediaType('movie'); toggleDropdown();">
						<DropdownItem>Movie</DropdownItem>
					</div>
					<div @click="changeMediaType('tv show'); toggleDropdown();">
						<DropdownItem>Tv Show</DropdownItem>
					</div>
				</Dropdown>
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
							<nuxt-link :to="`/${result.title ? 'movies':'tv-show'}/${slug(result)}`">
								<p
									class="cursor-pointer p-2 font-medium text-gray-600 hover:text-gray-900"
									@click="deleteSearchValue(); closeSearchBar();"
								>
									{{ result.title || result.name }}
								</p>
							</nuxt-link>
						</div>
						<div class="m-2">
							<button
								class="w-full btn bg-primary text-white hover:shadow-outline"
								@click="seeMore();"
							>
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
import Dropdown from '~/components/Dropdown';
import DropdownItem from '~/components/DropdownItem';

export default {
	name: 'SearchBar',
	components: {
		Loading,
		Dropdown,
		DropdownItem
	},
	data() {
		return {
			searchValue: '',
			results: [],
			loading: false,
			mediaType: 'movie'
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
			this.$refs.dropdown.toggleDropdown();
		},
		changeMediaType(mediaType) {
			this.mediaType = mediaType;
		}
	}
};
</script>
