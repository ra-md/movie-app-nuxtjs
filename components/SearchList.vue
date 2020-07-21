<template>
	<div>
		<div v-for="item in items" :key="item.id">
			<SearchItem :item="item" />
		</div>
	</div>
</template>

<script>
import SearchItem from './SearchItem';

export default {
	name: 'SearchList',
	components: {
		SearchItem
	},
	props: {
		items: {
			type: Array,
			required: true
		}
	}
};
</script>
