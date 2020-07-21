<template>
	<div>
		<div v-if="loading">
			<Loading />
		</div>
		<div v-else>
			<SearchList :items="results" />
		</div>
	</div>
</template>

<script>
import api from '~/api';
import Loading from '~/components/Loading';
import SearchList from '~/components/SearchList';

export default {
	components: {
		Loading,
		SearchList
	},
	data() {
		return {
			results: [],
			loading: true
		};
	},
	created() {
		this.fetchSearch();
	},
	updated() {
		this.fetchSearch();
	},
	methods: {
		fetchSearch() {
			api.search(this.$route.query.q)
			.then((response) => {
				this.results = response.data.results;
				this.loading = false;
			});
		}
	}
};
</script>
