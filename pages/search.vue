<template>
	<div>
		<div v-if="loading">
			<Loading />
		</div>
		<div v-else class="flex flex-col items-center">
			<SearchList :items="results" />
			<b-pagination
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
import Loading from '~/components/Loading';
import api from '~/api';

export default {
	components: {
		Loading,
		'b-pagination': BPagination
	},
	data() {
		return {
			results: [],
			loading: true,
			rows: 1,
      currentPage: 1,
      perPage: 1
		};
	},
	watch: {
		$route() {
			this.fetchSearch();
			this.loading = true;
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
			api.search(this.currentPage, this.$route.query.q)
			.then((response) => {
				this.loading = false;
				this.rows = response.data.total_pages;
				this.results = response.data.results;
			});
		}
	}
};
</script>

<style>
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
	@apply rounded-md font-medium;
  position: relative;
  display: block;
  padding: .5rem .75rem;
  margin-right: 0.2rem;
  line-height: 1.25;
  color: #007bff;
}

.page-link:hover {
  color: #fff;
  background-color: #007bff;
}

.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #007bff;
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
