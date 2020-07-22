<template>
	<div>
		<Loading v-if="loading" />
		<SearchList v-else :items="results" />
	</div>
</template>

<script>
import Loading from '~/components/Loading';
import api from '~/api';

export default {
	components: {
		Loading
	},
	data() {
		return {
			results: [],
			loading: true
		};
	},
	watch: {
		$route() {
			this.fetchSearch();
			this.loading = true;
		}
	},
	created() {
		this.fetchSearch();
	},
	methods: {
		fetchSearch() {
			api.search(1, this.$route.query.q)
			.then((response) => {
				this.loading = false;
				this.results = response.data.results;
			});
		}
	}
};
</script>
