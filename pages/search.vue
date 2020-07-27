<template>
	<div>
		<div class="flex flex-col items-center">
			<div class="flex w-full mt-4 px-4 text-white">
				<button
					:disabled="mediaType === 'movie'"
					class="bg-primary font-medium shadow rounded-md p-1 w-full transform hover:scale-105"
					@click="changeMediaType('movie')"
				>
						Movies
				</button>
				<button
					:disabled="mediaType === 'tv show'"
					class="bg-blue-500 ml-3 font-medium shadow rounded-md p-1 w-full transform hover:scale-105"
					@click="changeMediaType('tv show')"
				>
					Tv Show
				</button>
			</div>
			<SearchList :items="results" />
			<b-pagination
				v-if="!loading"
				v-model="currentPage"
				class="my-4 md:mb-8"
				:total-rows="rows"
				:per-page="perPage"
				limit="7"
			/>
		</div>
	</div>
</template>

<script>
import { BPagination } from 'bootstrap-vue';
import api from '~/api';

export default {
	components: {
		'b-pagination': BPagination
	},
	data() {
		return {
			results: [],
			loading: true,
			rows: 1,
      currentPage: 1,
      perPage: 1,
      mediaType: 'movie'
		};
	},
	watch: {
		$route(newRouter, oldRouter) {
			if (newRouter.query.q !== oldRouter.query.q) {
				this.currentPage = 1;
			}
			this.fetchSearch();
			this.loading = true;
			window.scrollTo(0, 0);
		},
		currentPage() {
			this.$router.push({
				path: 'search',
				query: {
					q: this.$route.query.q,
					page: this.currentPage
				}
			});
		}
	},
	created() {
		this.currentPage = this.$route.query.page || 1;
		this.fetchSearch();
	},
	methods: {
		fetchSearch() {
			api.search(this.mediaType, this.currentPage, this.$route.query.q)
			.then((response) => {
				this.loading = false;
				this.rows = response.data.total_pages;
				this.results = response.data.results;
			});
		},
		changeMediaType(mediaType) {
			this.mediaType = mediaType;
			this.loading = true;
			this.currentPage = 1;
			this.results = [];
			this.fetchSearch();
		}
	}
};
</script>

<style>
button:disabled {
	@apply bg-opacity-25 cursor-not-allowed;
}

button:disabled:hover {
	@apply scale-100;
}

.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: .25rem;
}

.pagination button {
  outline: none;
}

.page-link {
	@apply rounded-md font-medium text-primary;
  position: relative;
  display: block;
  padding: .5rem .75rem;
  margin-right: .2rem;
  line-height: 1.25;
}

.page-link:hover {
	@apply bg-primary;
  color: #fff;
}

.page-item.active .page-link {
	@apply bg-primary;
  z-index: 3;
  color: #fff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
}

@media (max-width: 575.98px) {
  .bv-d-xs-down-none {
    display: none !important;
  }
}
</style>
