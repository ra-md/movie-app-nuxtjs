<template>
	<div>
		<ItemList :items="results" />
	</div>
</template>

<script>
import api from '~/api';
import ItemList from '~/components/ItemList';

export default {
	name: 'TopRatedTVShow',
	components: {
		ItemList
	},
	data() {
		return {
			results: [],
			page: 1
		};
	},
	async created() {
		const { data } = await api.tv.topRated(this.page);
		this.results = data.results;
	}
};
</script>
