<template>
	<div v-if="searchValue.length !== 0" class="max-h-screen w-full overflow-auto z-20 absolute bg-white top-0">
		<div v-if="loading" class="mt-16 px-2">
			<div v-for="i in 15" :key="i" class="mb-4">
				<SkeletonLoading height="h-8" />
			</div>
		</div>
		<div v-else :class="{'mt-12': results.length !== 0}">
			<div v-if="results.length === 0" class="pt-16 text-center h-screen">
				<h2>No results</h2>
			</div>
			<div v-else>
				<div v-for="result in results" :key="result.id" class="first:pt-2 border-b">
					<QuickSearchItem
						:result="result"
						@close-search-bar="closeSearchBar"
						@delete-search-value="deleteSearchValue"
					/>
				</div>
				<div class="m-2">
					<div @click="moreResult">
						<Btn width="w-full">
							More Results
						</Btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { debounce } from 'lodash';
import SkeletonLoading from './SkeletonLoading';
import QuickSearchItem from './QuickSearchItem';
import Btn from '~/components/Btn';
import api from '~/api';

export default {
	name: 'QuickSearchList',
	components: {
		SkeletonLoading,
		QuickSearchItem,
		Btn
	},
	props: {
		searchValue: {
			type: String,
			required: true
		},
		mediaType: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			results: []
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
		}, 2000),
		async fetchSearch() {
			if (this.searchValue.length !== 0) {
				const { data } = await api.search(this.mediaType, 1, this.searchValue);
				this.results = data.results;
				this.loading = false;
			} else {
				this.results = [];
			}
		},
		moreResult() {
			this.$router.push({ path: '/search', query: { q: this.searchValue } });
			this.closeSearchBar();
			this.deleteSearchValue();
		},
		closeSearchBar() {
			this.$emit('close-search-bar');
		},
		deleteSearchValue() {
			this.$emit('delete-search-value');
		}
	}
};
</script>
