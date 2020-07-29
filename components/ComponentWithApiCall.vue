<template>
	<div>
		<MovieORTvList
			:items="results"
			:page="page"
			:total-pages="totalPages"
			:is-trending="isTrending"
			@intersec="intersected"
		/>
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
			page: 1,
			totalPages: 0
		};
	},
	computed: {
		isTrending() {
			if (this.apiCallType === 'trending') {
				return true;
			} else {
				return false;
			}
		}
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
			const { data } = await api[this.apiCallType](this.mediaType, this.isTrending ? 'week' : this.page);
			this.totalPages = data.total_pages;
			this.results.push(...data.results);
		},
		intersected() {
			if (!this.isTrending) {
				this.page++;
			}
		}
	}
};
</script>
