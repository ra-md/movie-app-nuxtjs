<template>
	<div>
		<MovieORTvList :items="results" @intersec="intersected" />
	</div>
</template>

<script>
import MovieORTvList from './MovieORTvList';
import api from '~/api';

export default {
	name: 'ComponentWithApiCall',
	components: {
		MovieORTvList
	},
	props: {
		mediaType: {
			type: String,
			required: true
		},
		apiCallType: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			results: [],
			page: 1
		};
	},
	watch: {
		page() {
			this.fetchApi();
		}
	},
	created() {
		this.fetchApi();
	},
	methods: {
		async fetchApi() {
			const { data } = await api[this.mediaType][this.apiCallType](this.page);
			this.results.push(...data.results);
		},
		intersected() {
			this.page++;
		}
	}
};
</script>
