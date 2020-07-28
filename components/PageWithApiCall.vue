<template>
	<div>
		<ItemList :items="results" @intersec="intersected" />
	</div>
</template>

<script>
import ItemList from './ItemList';
import api from '~/api';

export default {
	name: 'PageWithApiCall',
	components: {
		ItemList
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
